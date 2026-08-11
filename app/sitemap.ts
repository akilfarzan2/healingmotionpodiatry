import type { MetadataRoute } from 'next'
import { getAllSlugs, getBlogPosts, getSiteSettings } from '@/lib/sanity/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, slugs, posts] = await Promise.all([
    getSiteSettings(),
    getAllSlugs(),
    getBlogPosts(),
  ])
  const now = new Date()
  const postDateBySlug = new Map(posts.map((p) => [p.slug, new Date(p.updatedDate ?? p.publishedDate ?? now)]))

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: settings.siteUrl, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${settings.siteUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${settings.siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${settings.siteUrl}/areas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${settings.siteUrl}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = slugs.services.map((slug) => ({
    url: `${settings.siteUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const postRoutes: MetadataRoute.Sitemap = slugs.posts.map((slug) => ({
    url: `${settings.siteUrl}/blog/${slug}`,
    lastModified: postDateBySlug.get(slug) ?? now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const areaRoutes: MetadataRoute.Sitemap = slugs.areas.map((slug) => ({
    url: `${settings.siteUrl}/areas/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const pageRoutes: MetadataRoute.Sitemap = slugs.pages.map((slug) => ({
    url: `${settings.siteUrl}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...serviceRoutes, ...postRoutes, ...areaRoutes, ...pageRoutes]
}
