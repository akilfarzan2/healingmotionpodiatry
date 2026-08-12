import { defineField, defineType } from 'sanity'

export const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ],
  orderings: [{ name: 'title', title: 'Title', by: [{ field: 'title', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
})
