import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'more', title: 'Page Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', group: 'content' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      group: 'content',
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', group: 'content' }),
    defineField({
      name: 'icon',
      title: 'Icon Name (lucide-react)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
      group: 'content',
    }),
    defineField({
      name: 'parentService',
      title: 'Parent Service',
      description:
        'Set this to nest this service under another (e.g. "Ingrown Toenail Surgery" under "Ingrown Toenails")',
      type: 'reference',
      to: [{ type: 'service' }],
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
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
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
      initialValue: 'Edit "Page Content" for this service in the original Studio for now.',
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
    select: { title: 'name', subtitle: 'summary', media: 'heroImage' },
  },
})
