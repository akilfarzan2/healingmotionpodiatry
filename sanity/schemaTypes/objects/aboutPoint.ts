import { defineField, defineType } from 'sanity'

export const aboutPoint = defineType({
  name: 'aboutPoint',
  title: 'Point',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
})
