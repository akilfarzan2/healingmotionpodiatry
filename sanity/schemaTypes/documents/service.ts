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

    defineField({
      name: 'body',
      title: 'Page Content',
      description:
        'Full creative freedom — rich text with headings, lists, internal/external links, images, tables, plus 17 other content blocks (galleries, video, FAQs, CTAs, testimonials, and more).',
      type: 'pageBuilder',
      group: 'more',
    }),
    defineField({
      name: 'answerCapsule',
      title: 'Answer Capsule',
      description:
        'A short, self-contained direct answer (40–80 words) to "What is [this service]?" — placed at the top of the page. This is the single highest-value block for AI answer engines (ChatGPT, Perplexity, AI Overviews) to quote directly, so keep it factual and complete on its own.',
      type: 'text',
      rows: 3,
      group: 'more',
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
