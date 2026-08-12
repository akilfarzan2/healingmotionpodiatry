import { defineField, defineType } from 'sanity'

export const mainNavigation = defineType({
  name: 'mainNavigation',
  title: 'Main Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [{ type: 'navItem' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Main Navigation' }
    },
  },
})
