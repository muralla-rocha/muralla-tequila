import { notFound } from 'next/navigation'
import { lang } from 'next/root-params'

import { hasLocale, type Locale } from './config'
import type es from './dictionaries/es.json'

export type Dictionary = typeof es

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  es: () => import('./dictionaries/es.json').then((m) => m.default),
}

/** Idioma de la ruta actual (`/es`, `/en`). Solo en Server Components. */
export const getLocale = async (): Promise<Locale> => {
  const locale = await lang()
  if (!locale || !hasLocale(locale)) notFound()
  return locale
}

export const getDictionary = async (): Promise<Dictionary> => dictionaries[await getLocale()]()
