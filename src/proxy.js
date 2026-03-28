import { NextResponse } from 'next/server'

const locales = ['en', 'fr']
const defaultLocale = 'en'

export function proxy(request) {
  const { pathname } = request.nextUrl
  
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request) || defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(request.nextUrl)
}

function getLocale(request) {
  // Simple Accept-Language detection prioritize EN
  const acceptLang = request.headers.get('accept-language')
  if (acceptLang && acceptLang.toLowerCase().startsWith('fr')) {
    return 'fr'
  }
  return 'en'
}

export const config = {
  matcher: [
    // Skip all internal paths and static files
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2)).*)',
  ],
}
