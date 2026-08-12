import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      description: 'Shown in search engine results and browser tabs. Keep under 60 characters.',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      description: 'Shown under the title in search results. Keep under 160 characters.',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      description: 'Shown when this page is shared on social media (1200x630px recommended)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'h1',
      title: 'H1 Override',
      description: 'Override the visible page heading if it should differ from the main title',
      type: 'string',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      description: 'Only set this if this page duplicates content found at another URL',
      type: 'url',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      description: 'Enable to prevent this page from being indexed by search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
