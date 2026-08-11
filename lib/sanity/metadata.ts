import type { Metadata } from 'next'
import type { Seo, SiteSettings } from './data'
import { urlForImage } from './image'

// Shared across every content-driven route (service/blog/area/generic page)
// so each page's generateMetadata is a one-liner. Falls back to a page's
// own title/description when no `seo` object is set in the Studio.
export function buildMetadata({
  seo,
  settings,
  fallbackTitle,
  fallbackDescription,
  path,
}: {
  seo?: Seo
  settings: SiteSettings
  fallbackTitle: string
  fallbackDescription?: string
  path: string
}): Metadata {
  const title = seo?.metaTitle || fallbackTitle
  const description = seo?.metaDescription || fallbackDescription
  const ogImageUrl = urlForImage(seo?.ogImage)?.width(1200).height(630).fit('crop').url()
  const canonical = seo?.canonicalUrl || path

  return {
    title,
    description,
    alternates: { canonical },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: `${settings.siteUrl}${canonical}`,
      siteName: settings.name,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
