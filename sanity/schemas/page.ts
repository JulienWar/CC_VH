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
        // ── Generic section types ──
        defineArrayMember({
          name: 'textSection',
          title: 'Text section',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Subtitle (bold)', type: 'string' }),
            defineField({ name: 'text', title: 'Body text (paragraphs separated by blank lines)', type: 'text', rows: 8 }),
            defineField({ name: 'body', title: 'Rich text (alternative)', type: 'blockContent' }),
            defineField({
              name: 'backgroundColor',
              title: 'Background color',
              type: 'string',
              options: {
                list: [
                  { title: 'Cream', value: 'cream' },
                  { title: 'Brown', value: 'brown' },
                ],
                layout: 'radio',
              },
              initialValue: 'cream',
            }),
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
            defineField({ name: 'text', title: 'Body text (paragraphs separated by blank lines)', type: 'text', rows: 8 }),
            defineField({ name: 'body', title: 'Rich text (alternative)', type: 'blockContent' }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'imageAlt', title: 'Image alt text', type: 'string' }),
            defineField({
              name: 'imagePosition',
              title: 'Image position',
              type: 'string',
              options: { list: ['left', 'right'], layout: 'radio' },
              initialValue: 'right',
            }),
            defineField({
              name: 'backgroundColor',
              title: 'Background color',
              type: 'string',
              options: {
                list: [
                  { title: 'Cream', value: 'cream' },
                  { title: 'Brown', value: 'brown' },
                ],
                layout: 'radio',
              },
              initialValue: 'cream',
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
                    { name: 'caption', type: 'string', title: 'Caption / Label' },
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
        // ── Homepage-specific sections ──
        defineArrayMember({
          name: 'heroHP',
          title: 'Home Hero (full screen)',
          type: 'object',
          fields: [
            defineField({ name: 'backgroundImage', title: 'Background image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'cardTitle', title: 'Card title (e.g. "Don\'t Miss")', type: 'string' }),
            defineField({ name: 'cardText', title: 'Card text', type: 'string' }),
            defineField({ name: 'cardLink', title: 'Card link URL', type: 'string' }),
            defineField({ name: 'cardLinkLabel', title: 'Card link label', type: 'string', initialValue: 'Book now' }),
          ],
          preview: {
            select: { title: 'cardTitle' },
            prepare: ({ title }) => ({ title: title || 'Home Hero', subtitle: 'Full-screen hero' }),
          },
        }),
        defineArrayMember({
          name: 'aboutIntro',
          title: 'About intro (text + image)',
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 6 }),
            defineField({ name: 'ctaLabel', title: 'Button label', type: 'string' }),
            defineField({ name: 'ctaLink', title: 'Button link', type: 'string' }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'imageAlt', title: 'Image alt text', type: 'string' }),
          ],
          preview: {
            prepare: () => ({ title: 'About intro', subtitle: 'Brown text + image' }),
          },
        }),
        defineArrayMember({
          name: 'whatIsOn',
          title: 'What\'s On (events carousel)',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: "What's On" }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string', initialValue: 'See all events' }),
            defineField({ name: 'ctaLink', title: 'CTA link', type: 'string', initialValue: '/programming' }),
          ],
          preview: {
            select: { title: 'heading' },
            prepare: ({ title }) => ({ title: title || "What's On", subtitle: 'Events carousel' }),
          },
        }),
        defineArrayMember({
          name: 'artistsResidencies',
          title: 'Artists Residencies',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Artists Residencies' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
            defineField({
              name: 'artistNames',
              title: 'Artist names (one per line)',
              type: 'text',
              rows: 6,
            }),
            defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string', initialValue: 'See all residencies' }),
            defineField({ name: 'ctaLink', title: 'CTA link', type: 'string', initialValue: '/residencies' }),
            defineField({ name: 'image', title: 'Full-width image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'imageAlt', title: 'Image alt text', type: 'string' }),
          ],
          preview: {
            select: { title: 'heading' },
            prepare: ({ title }) => ({ title: title || 'Artists Residencies', subtitle: 'Residencies section' }),
          },
        }),
        defineArrayMember({
          name: 'locationSection',
          title: 'Location',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Our Location' }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 }),
            defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string' }),
            defineField({ name: 'ctaLink', title: 'CTA link', type: 'string' }),
            defineField({ name: 'mapImage', title: 'Map image', type: 'image', options: { hotspot: true } }),
          ],
          preview: {
            select: { title: 'heading' },
            prepare: ({ title }) => ({ title: title || 'Location', subtitle: 'Map + description' }),
          },
        }),
        defineArrayMember({
          name: 'foundingEntities',
          title: 'Founding entities',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Founding entities' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'logo1', title: 'Logo 1', type: 'image' }),
            defineField({ name: 'logo1Alt', title: 'Logo 1 alt text', type: 'string' }),
            defineField({ name: 'logo2', title: 'Logo 2', type: 'image' }),
            defineField({ name: 'logo2Alt', title: 'Logo 2 alt text', type: 'string' }),
          ],
          preview: {
            select: { title: 'heading' },
            prepare: ({ title }) => ({ title: title || 'Founding entities', subtitle: 'Logos section' }),
          },
        }),
        defineArrayMember({
          name: 'partnersSection',
          title: 'Partners',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Partners' }),
            defineField({
              name: 'logos',
              title: 'Partner logos',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'image',
                  fields: [
                    { name: 'alt', type: 'string', title: 'Partner name' },
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'heading' },
            prepare: ({ title }) => ({ title: title || 'Partners', subtitle: 'Logo grid' }),
          },
        }),
        defineArrayMember({
          name: 'venueGallery',
          title: 'Venue Gallery (scrollable cards)',
          type: 'object',
          fields: [
            defineField({
              name: 'items',
              title: 'Gallery items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
                    defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                  ],
                  preview: {
                    select: { title: 'label', media: 'image' },
                  },
                }),
              ],
            }),
          ],
          preview: {
            prepare: () => ({ title: 'Venue Gallery', subtitle: 'Scrollable cards' }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
