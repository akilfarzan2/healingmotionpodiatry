import { defineField, defineType } from 'sanity'

export const notFoundPage = defineType({
  name: 'notFoundPage',
  title: '404 Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Page Not Found',
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      initialValue: "Sorry, we couldn't find the page you were looking for.",
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Back to Home',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'string',
      initialValue: '/',
    }),
    defineField({
      name: 'suggestedLinks',
      title: 'Suggested Links',
      description: 'Helpful links to show the visitor (e.g. Services, Contact, Blog)',
      type: 'array',
      of: [{ type: 'navItem' }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || '404 Page' }
    },
  },
})
