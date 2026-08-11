import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getRedirectBySource } from '@/lib/sanity/data'

// CMS-driven redirects: content editors manage old-path -> new-path mappings
// as `redirect` documents in Sanity (see Redirects in the Studio) instead of
// requiring a code deploy. Looked up per-request; next-sanity's client is
// CDN-backed so this stays fast.
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  const redirect = await getRedirectBySource(pathname)
  if (!redirect) return NextResponse.next()

  const destination = redirect.destination.startsWith('http')
    ? redirect.destination
    : new URL(`${redirect.destination}${search}`, request.url)

  return NextResponse.redirect(destination, redirect.permanent === false ? 307 : 308)
}

export const config = {
  matcher: [
    /*
     * Skip static assets, images, and Next internals so redirects only run
     * against actual page requests.
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:png|jpg|jpeg|svg|webp|avif|ico|txt|xml)$).*)',
  ],
}
