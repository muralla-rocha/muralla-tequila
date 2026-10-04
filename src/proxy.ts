import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'

/** Elige el idioma según `Accept-Language`; si no coincide, el predeterminado. */
function getLocale(request: NextRequest): Locale {
  const accepted = (request.headers.get('accept-language') ?? '')
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { quality: q ? Number(q) : 1, tag: tag.toLowerCase().split('-')[0] }
    })
    .sort((a, b) => b.quality - a.quality)

  return (accepted.find((a) => hasLocale(a.tag))?.tag as Locale | undefined) ?? defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocalePrefix) return

  request.nextUrl.pathname = `/${getLocale(request)}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Excluye Payload (/admin, /api), la ruta de ejemplo, _next, /images y cualquier archivo con extensión.
  matcher: ['/((?!api|admin|my-route|_next|images|.*\\..*).*)'],
}
