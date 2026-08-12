import { defineArrayMember, defineField, defineType } from 'sanity'
import { portableTextOf } from './portableText'

// The flexible Page Builder — 18 block types giving editors complete
// creative freedom on Service, Service Area, Blog Post, Page, Home Page
// ("Additional Sections"), and the Areas hub. Every block type here is
// rendered by components/page-builder.tsx, which switches on `_type` — the
// names below MUST match that file exactly.

const imageWithAlt = () =>
  defineField({
    name: 'image',
    title: 'Image',
    type: 'image',
    options: { hotspot: true },
  })

export const richTextBlock = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: portableTextOf,
    }),
  ],
  preview: {
    select: { content: 'content' },
    prepare({ content }) {
      const first = content?.find((b: { _type?: string }) => b._type === 'block')
      const text = first?.children?.map((c: { text?: string }) => c.text).join('') ?? ''
      return { title: text || 'Rich Text', subtitle: 'Rich Text' }
    },
  },
})

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image',
  type: 'object',
  icon: () => '🖼️',
  fields: [
    imageWithAlt(),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({
      name: 'size',
      title: 'Display Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Full width', value: 'full' },
        ],
      },
      initialValue: 'large',
    }),
  ],
  preview: {
    select: { media: 'image', subtitle: 'caption' },
    prepare({ media, subtitle }) {
      return { title: 'Image', subtitle, media }
    },
  },
})

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  icon: () => '🖼️',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', images: 'images' },
    prepare({ title, images }) {
      return { title: title || 'Gallery', subtitle: `${images?.length ?? 0} images`, media: images?.[0] }
    },
  },
})

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  icon: () => '▶️',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      description: 'YouTube or Vimeo URL',
      type: 'url',
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
  preview: {
    select: { subtitle: 'url' },
    prepare({ subtitle }) {
      return { title: 'Video Embed', subtitle }
    },
  },
})

export const columns = defineType({
  name: 'columns',
  title: 'Columns',
  type: 'object',
  icon: () => '▦',
  fields: [
    defineField({
      name: 'items',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'column',
          title: 'Column',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
            }),
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'array', of: portableTextOf }),
          ],
          preview: {
            select: { title: 'heading', media: 'image' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { items: 'items' },
    prepare({ items }) {
      return { title: 'Columns', subtitle: `${items?.length ?? 0} columns` }
    },
  },
})

export const stats = defineType({
  name: 'stats',
  title: 'Stats',
  type: 'object',
  icon: () => '📊',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'statItem',
          title: 'Stat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. 15+' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      return { title: title || 'Stats', subtitle: `${items?.length ?? 0} stats` }
    },
  },
})

export const testimonialsBlock = defineType({
  name: 'testimonialsBlock',
  title: 'Testimonials',
  type: 'object',
  icon: () => '💬',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials to Feature',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })],
    }),
  ],
  preview: {
    select: { title: 'heading', testimonials: 'testimonials' },
    prepare({ title, testimonials }) {
      return { title: title || 'Testimonials', subtitle: `${testimonials?.length ?? 0} testimonials` }
    },
  },
})

export const faqAccordionBlock = defineType({
  name: 'faqAccordionBlock',
  title: 'FAQ Accordion',
  type: 'object',
  icon: () => '❓',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'faqs',
      title: 'FAQs to Feature',
      description: 'Also renders FAQPage structured data for this block',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'faq' }] })],
    }),
  ],
  preview: {
    select: { title: 'heading', faqs: 'faqs' },
    prepare({ title, faqs }) {
      return { title: title || 'FAQ Accordion', subtitle: `${faqs?.length ?? 0} FAQs` }
    },
  },
})

export const ctaBanner = defineType({
  name: 'ctaBanner',
  title: 'CTA Banner',
  type: 'object',
  icon: () => '📣',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'primaryButtonLabel', title: 'Button Label', type: 'string' }),
    defineField({ name: 'primaryButtonUrl', title: 'Button URL', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading', media: 'backgroundImage' },
    prepare({ title, media }) {
      return { title: title || 'CTA Banner', media }
    },
  },
})

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  icon: () => '❝',
  fields: [
    defineField({ name: 'quoteText', title: 'Quote', type: 'text' }),
    defineField({ name: 'authorName', title: 'Author Name', type: 'string' }),
    defineField({ name: 'authorRole', title: 'Author Role', type: 'string' }),
    defineField({
      name: 'authorPhoto',
      title: 'Author Photo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'quoteText', subtitle: 'authorName', media: 'authorPhoto' },
  },
})

export const beforeAfter = defineType({
  name: 'beforeAfter',
  title: 'Before / After',
  type: 'object',
  icon: () => '⇄',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'beforeImage', title: 'Before Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'beforeLabel', title: 'Before Label', type: 'string', initialValue: 'Before' }),
    defineField({ name: 'afterImage', title: 'After Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'afterLabel', title: 'After Label', type: 'string', initialValue: 'After' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading', media: 'beforeImage' },
    prepare({ title, media }) {
      return { title: title || 'Before / After', media }
    },
  },
})

export const teamGrid = defineType({
  name: 'teamGrid',
  title: 'Team Grid',
  type: 'object',
  icon: () => '👥',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'teamMember' }] })],
    }),
  ],
  preview: {
    select: { title: 'heading', members: 'members' },
    prepare({ title, members }) {
      return { title: title || 'Team Grid', subtitle: `${members?.length ?? 0} members` }
    },
  },
})

export const pricingTable = defineType({
  name: 'pricingTable',
  title: 'Pricing Table',
  type: 'object',
  icon: () => '💲',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'tiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pricingTier',
          title: 'Tier',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'string' }),
            defineField({ name: 'billingPeriod', title: 'Billing Period', type: 'string', description: 'e.g. /session' }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({ name: 'highlighted', title: 'Highlighted', type: 'boolean', initialValue: false }),
            defineField({ name: 'ctaLabel', title: 'Button Label', type: 'string' }),
            defineField({ name: 'ctaUrl', title: 'Button URL', type: 'string' }),
          ],
          preview: { select: { title: 'name', subtitle: 'price' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', tiers: 'tiers' },
    prepare({ title, tiers }) {
      return { title: title || 'Pricing Table', subtitle: `${tiers?.length ?? 0} tiers` }
    },
  },
})

export const mapEmbed = defineType({
  name: 'mapEmbed',
  title: 'Map Embed',
  type: 'object',
  icon: () => '📍',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'address', title: 'Address to Map', type: 'string' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'address' },
    prepare({ title, subtitle }) {
      return { title: title || 'Map Embed', subtitle }
    },
  },
})

export const tabs = defineType({
  name: 'tabs',
  title: 'Tabs',
  type: 'object',
  icon: () => '📑',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Tabs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tabItem',
          title: 'Tab',
          fields: [
            defineField({ name: 'label', title: 'Tab Label', type: 'string' }),
            defineField({ name: 'content', title: 'Content', type: 'array', of: portableTextOf }),
          ],
          preview: { select: { title: 'label' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      return { title: title || 'Tabs', subtitle: `${items?.length ?? 0} tabs` }
    },
  },
})

export const divider = defineType({
  name: 'divider',
  title: 'Divider / Spacer',
  type: 'object',
  icon: () => '―',
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Line', value: 'line' },
          { title: 'Blank space', value: 'space' },
        ],
      },
      initialValue: 'line',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: { style: 'style', size: 'size' },
    prepare({ style, size }) {
      return { title: `Divider (${style ?? 'line'}, ${size ?? 'medium'})` }
    },
  },
})

export const logoCloud = defineType({
  name: 'logoCloud',
  title: 'Logo Cloud',
  type: 'object',
  icon: () => '🏷️',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'logoItem',
          title: 'Logo',
          fields: [
            defineField({ name: 'image', title: 'Logo Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
          preview: { select: { media: 'image', title: 'alt' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', logos: 'logos' },
    prepare({ title, logos }) {
      return { title: title || 'Logo Cloud', subtitle: `${logos?.length ?? 0} logos` }
    },
  },
})

export const customEmbed = defineType({
  name: 'customEmbed',
  title: 'Custom Embed',
  type: 'object',
  icon: () => '</>',
  fields: [
    defineField({
      name: 'embedCode',
      title: 'Embed Code (HTML)',
      description:
        'Raw HTML, rendered as-is on the page. Only paste code from sources you trust (e.g. a booking widget or review widget snippet) — this is not sanitized.',
      type: 'text',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Custom Embed' }
    },
  },
})

// The Page Builder array itself. Used as the `body` field on Service,
// Service Area, Blog Post, and Page, and as `additionalSections` on Home
// Page and the Areas hub. Referencing it by name (`type: 'pageBuilder'`)
// keeps every one of those fields in sync automatically.
export const pageBuilder = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineArrayMember({ type: 'richText' }),
    defineArrayMember({ type: 'imageBlock' }),
    defineArrayMember({ type: 'gallery' }),
    defineArrayMember({ type: 'videoEmbed' }),
    defineArrayMember({ type: 'columns' }),
    defineArrayMember({ type: 'stats' }),
    defineArrayMember({ type: 'testimonialsBlock' }),
    defineArrayMember({ type: 'faqAccordionBlock' }),
    defineArrayMember({ type: 'ctaBanner' }),
    defineArrayMember({ type: 'quote' }),
    defineArrayMember({ type: 'beforeAfter' }),
    defineArrayMember({ type: 'teamGrid' }),
    defineArrayMember({ type: 'pricingTable' }),
    defineArrayMember({ type: 'mapEmbed' }),
    defineArrayMember({ type: 'tabs' }),
    defineArrayMember({ type: 'divider' }),
    defineArrayMember({ type: 'logoCloud' }),
    defineArrayMember({ type: 'customEmbed' }),
  ],
})
