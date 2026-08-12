import { defineField, defineType } from 'sanity'

export const practitioner = defineType({
  name: 'practitioner',
  title: 'Practitioner',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'credentials', title: 'Credentials', type: 'string' }),
    defineField({ name: 'title', title: 'Job Title', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text' }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  orderings: [
    { name: 'title', title: 'Title', by: [{ field: 'title', direction: 'asc' }] },
    { name: 'name', title: 'Name', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
})
