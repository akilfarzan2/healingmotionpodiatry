import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'authorship', title: 'Authorship & Trust' },
    { name: 'discovery', title: 'Discovery & Linking' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      description:
        'Short summary shown on blog listing cards and used as a fallback meta description',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'tldr',
      title: 'TL;DR / Key Takeaways',
      type: 'array',
      of: [{ type: 'block', marks: { decorators: [{ title: 'Bold', value: 'strong' }] } }],
      group: 'content',
      description:
        'A short bullet list summarizing the post. This is what AI answer engines and featured snippets often pull from — keep it clear and factual.',
    }),

    // Body Content — the real field is a flexible Page Builder with 18
    // block types that hasn't been migrated yet. Intentionally left out of
    // this schema entirely (rather than redeclared with a mismatched type)
    // so its existing stored content is untouched and safe — it just
    // isn't editable here yet.
    defineField({
      name: 'bodyNotice',
      title: 'Body Content',
      description:
        'Not yet migrated to this Studio — still edited in the original Studio for now. Existing content is preserved and unaffected. A dedicated Page Builder migration pass will bring the full block editor here next.',
      type: 'string',
      group: 'content',
      readOnly: true,
      initialValue: 'Edit the article body for this post in the original Studio for now.',
    }),

    defineField({
      name: 'sources',
      title: 'Sources & Citations',
      type: 'array',
      group: 'content',
      description:
        'Reference reputable sources for medical claims made in this post — strengthens trust signals for readers and search engines',
      of: [
        {
          type: 'object',
          name: 'sourceItem',
          title: 'Source',
          fields: [
            defineField({ name: 'label', title: 'Source Name', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'showTableOfContents',
      title: 'Show Table of Contents',
      type: 'boolean',
      group: 'content',
      initialValue: true,
      description: 'Auto-generates a table of contents from the headings in this post',
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      group: 'authorship',
    }),
    defineField({
      name: 'medicalReviewer',
      title: 'Medical Reviewer',
      type: 'object',
      group: 'authorship',
      description:
        'Optional — fill in for clinical/treatment topics to strengthen E-E-A-T. Leave blank for general/news posts.',
      fields: [
        defineField({
          name: 'reviewer',
          title: 'Reviewed By',
          type: 'reference',
          to: [{ type: 'teamMember' }],
        }),
        defineField({ name: 'reviewedDate', title: 'Review Date', type: 'date' }),
      ],
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      group: 'authorship',
    }),
    defineField({
      name: 'updatedDate',
      title: 'Last Updated Date',
      type: 'date',
      group: 'authorship',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      group: 'authorship',
      description: 'Leave blank to estimate automatically from word count on the frontend',
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogCategory' }] }],
      group: 'discovery',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'discovery',
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      group: 'discovery',
      description: 'Link this post to relevant services for internal linking',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      group: 'discovery',
      description: 'Leave empty to automatically suggest posts from the same categories',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
      group: 'discovery',
    }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [
    {
      name: 'publishedDesc',
      title: 'Published Date, New to Old',
      by: [{ field: 'publishedDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'excerpt', media: 'featuredImage' },
  },
})
