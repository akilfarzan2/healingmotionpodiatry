import { defineField, defineType } from 'sanity'

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'From Path',
      type: 'string',
      description: 'The old path, e.g. /old-services-page',
    }),
    defineField({
      name: 'destination',
      title: 'To Path or URL',
      type: 'string',
      description: 'The new path or full URL to redirect to',
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent (301)',
      type: 'boolean',
      initialValue: true,
      description: 'Enable for a permanent redirect (301). Disable for a temporary redirect (302).',
    }),
  ],
  orderings: [
    { name: 'source', title: 'Source', by: [{ field: 'source', direction: 'asc' }] },
    { name: 'destination', title: 'Destination', by: [{ field: 'destination', direction: 'asc' }] },
    { name: 'permanent', title: 'Permanent', by: [{ field: 'permanent', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'source', subtitle: 'destination' },
  },
})
