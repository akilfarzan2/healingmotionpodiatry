import { defineField, defineType } from 'sanity'

export const serviceArea = defineType({
  name: 'serviceArea',
  title: 'Service Area',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'more', title: 'Page Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'suburb',
      title: 'Suburb / Area Name',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'suburb' },
      group: 'content',
    }),
    defineField({
      name: 'region',
      title: 'Region / State',
      description: 'e.g. Melbourne, VIC',
      type: 'string',
      group: 'content',
    }),
    defineField({ name: 'postcode', title: 'Postcode', type: 'string', group: 'content' }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Short description shown on the Areas We Serve hub and in cards',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'distanceFromClinic',
      title: 'Distance from Clinic',
      description: 'e.g. 5 minutes from Roxburgh Park',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'featuredServices',
      title: 'Featured Services',
      description: 'Services to highlight for this area. Leave empty to show all services.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      group: 'content',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      group: 'content',
    }),

    // Page Content — the real field ("body") is a flexible Page Builder
    // with 18 block types that hasn't been migrated yet. It's intentionally
    // left out of this schema entirely (rather than redeclared with a
    // mismatched type) so its existing stored content is untouched and
    // safe — it just isn't editable here yet.
    defineField({
      name: 'bodyNotice',
      title: 'Page Content',
      description:
        'Not yet migrated to this Studio — still edited in the original Studio for now. Existing content is preserved and unaffected. A dedicated Page Builder migration pass will bring the full block editor here next.',
      type: 'string',
      group: 'more',
      readOnly: true,
      initialValue: 'Edit "Page Content" for this area in the original Studio for now.',
    }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [
    {
      name: 'orderAsc',
      title: 'Display Order',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'suburb', subtitle: 'region', media: 'heroImage' },
  },
})
