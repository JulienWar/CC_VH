import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero image alt text',
      type: 'string',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description: 'Drag to reorder sections on the page',
      of: [
        defineArrayMember({
          name: 'textSection',
          title: 'Text section',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
          ],
          preview: {
            select: { title: 'heading' },
            prepare: ({ title }) => ({ title: title || 'Text section', subtitle: 'Text' }),
          },
        }),
        defineArrayMember({
          name: 'textImageSection',
          title: 'Text + Image',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'imageAlt', title: 'Image alt text', type: 'string' }),
            defineField({
              name: 'imagePosition',
              title: 'Image position',
              type: 'string',
              options: { list: ['left', 'right'], layout: 'radio' },
              initialValue: 'right',
            }),
          ],
          preview: {
            select: { title: 'heading', media: 'image' },
            prepare: ({ title, media }) => ({ title: title || 'Text + Image', subtitle: 'Text + Image', media }),
          },
        }),
        defineArrayMember({
          name: 'imageGallerySection',
          title: 'Image gallery',
          type: 'object',
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
                  fields: [
                    { name: 'alt', type: 'string', title: 'Alt text' },
                    { name: 'caption', type: 'string', title: 'Caption' },
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'heading' },
            prepare: ({ title }) => ({ title: title || 'Image gallery', subtitle: 'Gallery' }),
          },
        }),
        defineArrayMember({
          name: 'eventsSection',
          title: 'Events grid',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({
              name: 'eventType',
              title: 'Show events',
              type: 'string',
              options: { list: ['upcoming', 'past'], layout: 'radio' },
              initialValue: 'upcoming',
            }),
            defineField({ name: 'showTimeFilter', title: 'Show time filter', type: 'boolean', initialValue: true }),
          ],
          preview: {
            select: { title: 'heading', type: 'eventType' },
            prepare: ({ title, type }) => ({ title: title || 'Events grid', subtitle: `${type || 'upcoming'} events` }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
