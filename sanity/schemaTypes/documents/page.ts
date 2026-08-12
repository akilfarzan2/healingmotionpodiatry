import { defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
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

    // Page Content — the real field ("body") is a flexible Page Builder
    // with 18 block types that hasn't been migrated yet. Intentionally
    // left out of this schema entirely (rather than redeclared with a
    // mismatched type) so its existing stored content is untouched and
    // safe — it just isn't editable here yet.
    defineField({
      name: 'bodyNotice',
      title: 'Page Content',
      description:
        'Not yet migrated to this Studio — still edited in the original Studio for now. Existing content is preserved and unaffected. A dedicated Page Builder migration pass will bring the full block editor here next.',
      type: 'string',
      group: 'content',
      readOnly: true,
      initialValue: 'Edit "Page Content" for this page in the original Studio for now.',
    }),

    defineField({
      name: 'showInNavByDefault',
      title: 'Suggest for Navigation',
      type: 'boolean',
      group: 'content',
      initialValue: false,
      description:
        'Informational only — does not automatically add this page to the nav. Add it manually in Main Navigation or Footer Navigation.',
    }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [{ name: 'title', title: 'Title', by: [{ field: 'title', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', media: 'heroImage' },
  },
})
