import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'about', title: 'About' },
    { name: 'services', title: 'Services Preview' },
    { name: 'practitioner', title: 'Practitioner' },
    { name: 'faq', title: 'FAQ Preview' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'more', title: 'Additional Sections' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Hero
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'badge', title: 'Badge Text', type: 'string' }),
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text' }),
        defineField({
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string' }),
        defineField({ name: 'primaryButtonLabel', title: 'Primary Button Label', type: 'string' }),
        defineField({ name: 'primaryButtonUrl', title: 'Primary Button URL', type: 'string' }),
        defineField({
          name: 'secondaryButtonLabel',
          title: 'Secondary Button Label',
          type: 'string',
        }),
        defineField({ name: 'secondaryButtonUrl', title: 'Secondary Button URL', type: 'string' }),
      ],
    }),

    // About
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      group: 'about',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string' }),
        defineField({
          name: 'points',
          title: 'Highlight Points',
          type: 'array',
          of: [{ type: 'aboutPoint' }],
        }),
      ],
    }),

    // Services Preview
    defineField({
      name: 'servicesPreview',
      title: 'Services Preview Section',
      type: 'object',
      group: 'services',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text' }),
        defineField({
          name: 'services',
          title: 'Services to Feature',
          description: 'Leave empty to automatically show all services',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'service' }] }],
        }),
      ],
    }),

    // Practitioner
    defineField({
      name: 'practitionerSection',
      title: 'Practitioner Section',
      type: 'object',
      group: 'practitioner',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'member',
          title: 'Team Member',
          type: 'reference',
          to: [{ type: 'teamMember' }],
        }),
      ],
    }),

    // FAQ Preview
    defineField({
      name: 'faqPreview',
      title: 'FAQ Preview Section',
      type: 'object',
      group: 'faq',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'faqs',
          title: 'FAQs to Feature',
          description: 'Leave empty to automatically show all FAQs',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'faq' }] }],
        }),
      ],
    }),

    // Testimonials
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      group: 'testimonials',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'testimonials',
          title: 'Testimonials to Feature',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
        }),
      ],
    }),

    // Additional Sections — the real field is a flexible Page Builder with
    // 18 block types that hasn't been migrated yet. It's intentionally left
    // out of this schema entirely (rather than redeclared with a mismatched
    // type) so its existing stored content is untouched and safe — it just
    // isn't editable here yet. This is a standalone notice only, not bound
    // to any real data.
    defineField({
      name: 'additionalSectionsNotice',
      title: 'Additional Sections',
      description:
        'Not yet migrated to this Studio — still edited in the original Studio for now. Existing content is preserved and unaffected. A dedicated Page Builder migration pass will bring the full block editor here next.',
      type: 'string',
      group: 'more',
      readOnly: true,
      initialValue: 'Edit "Additional Sections" content in the original Studio for now.',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'hero.headline' },
    prepare({ title }) {
      return { title: title || 'Home Page' }
    },
  },
})
