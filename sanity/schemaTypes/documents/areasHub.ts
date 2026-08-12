import { defineField, defineType } from 'sanity'

export const areasHub = defineType({
  name: 'areasHub',
  title: 'Areas We Serve (Hub Page)',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'more', title: 'Additional Sections' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Areas We Serve',
      group: 'content',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'featuredAreas',
      title: 'Areas to Feature',
      description: 'Leave empty to automatically list all Service Areas',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'serviceArea' }] }],
      group: 'content',
    }),

    defineField({
      name: 'additionalSections',
      title: 'Additional Sections',
      description:
        'Extra flexible content rendered below the areas list — any mix of the 18 Page Builder blocks (rich text, galleries, stats, CTAs, testimonials, and more).',
      type: 'pageBuilder',
      group: 'more',
    }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Areas We Serve (Hub Page)' }
    },
  },
})
