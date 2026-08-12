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

    // Additional Sections — the real field is a flexible Page Builder with
    // 18 block types that hasn't been migrated yet. It's intentionally left
    // out of this schema entirely (rather than redeclared with a mismatched
    // type) so its existing stored content is untouched and safe — it just
    // isn't editable here yet.
    defineField({
      name: 'additionalSectionsNotice',
      title: 'Additional Sections',
      description:
        'Not yet migrated to this Studio — still edited in the original Studio for now. Existing content is preserved and unaffected. A dedicated Page Builder migration pass will bring the full block editor here next.',
      type: 'string',
      group: 'more',
      readOnly: true,
      initialValue: 'Edit "Additional Sections" content in the original Studio for now.',
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
