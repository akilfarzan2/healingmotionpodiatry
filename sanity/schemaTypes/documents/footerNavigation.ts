import { defineField, defineType } from 'sanity'

export const footerNavigation = defineType({
  name: 'footerNavigation',
  title: 'Footer Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'columns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          title: 'Column',
          fields: [
            defineField({ name: 'heading', title: 'Column Heading', type: 'string' }),
            defineField({
              name: 'items',
              title: 'Links',
              type: 'array',
              of: [{ type: 'navItem' }],
            }),
          ],
          preview: {
            select: { title: 'heading' },
          },
        },
      ],
    }),
    defineField({
      name: 'bottomText',
      title: 'Bottom Bar Text',
      description: 'e.g. copyright notice',
      type: 'string',
    }),
    defineField({
      name: 'bottomLinks',
      title: 'Bottom Bar Links',
      description: 'e.g. Privacy Policy, Terms of Service',
      type: 'array',
      of: [{ type: 'navItem' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Footer Navigation' }
    },
  },
})
