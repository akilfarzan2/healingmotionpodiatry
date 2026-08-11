import type { MetadataRoute } from 'next'
import { getSiteSettings } from '@/lib/sanity/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings()

  return [
    {
      url: settings.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
