import type { MetadataRoute } from 'next'
import { getSiteSettings } from '@/lib/sanity/data'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${settings.siteUrl}/sitemap.xml`,
  }
}
