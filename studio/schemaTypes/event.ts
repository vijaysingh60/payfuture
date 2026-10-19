import { defineField, defineType } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', description: 'The web address: /newsroom/events/<slug>/', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'startDate', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'endDate', type: 'date', description: 'Leave empty for a one-day event.' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alternative text' })],
    }),
    defineField({ name: 'body', type: 'blockContent' }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3, group: 'seo' }),
  ],
  groups: [{ name: 'seo', title: 'SEO' }],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'startDate', direction: 'desc' }] }],
  preview: { select: { title: 'title', date: 'startDate', location: 'location', media: 'mainImage' }, prepare: ({ title, date, location, media }) => ({ title, subtitle: [date, location].filter(Boolean).join(' · '), media }) },
});
