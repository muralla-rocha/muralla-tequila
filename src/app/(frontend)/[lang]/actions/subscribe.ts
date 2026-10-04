'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'

import { ageFrom, MINIMUM_AGE } from '@/collections/Subscribers'
import config from '@/payload.config'
import { hasLocale } from '@/i18n/config'

export type SubscribeState =
  | { status: 'idle' }
  | { status: 'success' }
  | { error: 'invalid' | 'underage' | 'rateLimited' | 'server'; status: 'error' }

// Límite simple por IP (en memoria: por instancia del servidor; suficiente contra abuso básico).
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const text = (data: FormData, key: string) => String(data.get(key) ?? '').trim()

export async function subscribe(_prev: SubscribeState, data: FormData): Promise<SubscribeState> {
  // Honeypot: los bots llenan este campo oculto; respondemos "éxito" sin guardar nada.
  if (text(data, 'website')) return { status: 'success' }

  const requestHeaders = await headers()
  const ip = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) return { error: 'rateLimited', status: 'error' }

  const name = text(data, 'name')
  const email = text(data, 'email').toLowerCase()
  const birthdate = text(data, 'birthdate')
  const region = text(data, 'region')
  const locale = text(data, 'locale')

  const validBirthdate =
    /^\d{4}-\d{2}-\d{2}$/.test(birthdate) && !Number.isNaN(Date.parse(birthdate))
  if (
    !name ||
    name.length > 120 ||
    !EMAIL.test(email) ||
    email.length > 254 ||
    !validBirthdate ||
    region.length > 120 ||
    data.get('adult') !== 'on'
  ) {
    return { error: 'invalid', status: 'error' }
  }
  if (ageFrom(birthdate) < MINIMUM_AGE) return { error: 'underage', status: 'error' }

  try {
    const payload = await getPayload({ config })

    // Si el correo ya existe respondemos igual que en un alta nueva (no revelamos quién está inscrito).
    const existing = await payload.find({
      collection: 'subscribers',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { email: { equals: email } },
    })
    if (existing.totalDocs > 0) return { status: 'success' }

    await payload.create({
      collection: 'subscribers',
      data: {
        birthdate: new Date(`${birthdate}T00:00:00.000Z`).toISOString(),
        email,
        locale: hasLocale(locale) ? locale : undefined,
        marketingOptIn: data.get('marketing') === 'on',
        name,
        privacyAcceptedAt: new Date().toISOString(),
        region: region || undefined,
      },
      overrideAccess: true,
    })
    return { status: 'success' }
  } catch (error) {
    console.error('subscribe failed', error)
    return { error: 'server', status: 'error' }
  }
}
