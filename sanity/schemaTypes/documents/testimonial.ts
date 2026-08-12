import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'authorName', title: 'Name', type: 'string' }),
    defineField({
      name: 'authorRole',
      title: 'Role / Location',
      type: 'string',
      description: 'e.g. Roxburgh Park Patient',
    }),
    defineField({ name: 'quote', title: 'Testimonial', type: 'text' }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: { list: [1, 2, 3, 4, 5] },
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'e.g. Google Reviews, Facebook',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    { name: 'authorName', title: 'Author name', by: [{ field: 'authorName', direction: 'asc' }] },
    { name: 'authorRole', title: 'Author role', by: [{ field: 'authorRole', direction: 'asc' }] },
    { name: 'rating', title: 'Rating', by: [{ field: 'rating', direction: 'asc' }] },
    { name: 'source', title: 'Source', by: [{ field: 'source', direction: 'asc' }] },
    { name: 'featured', title: 'Featured', by: [{ field: 'featured', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'authorName', subtitle: 'authorRole', media: 'photo' },
  },
})
