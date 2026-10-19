import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'News post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'The web address: /newsroom/<slug>/. Keep it unchanged for posts that already have inbound links.',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published', validation: (r) => r.required(), initialValue: () => new Date().toISOString() }),
    defineField({ name: 'excerpt', type: 'text', rows: 3, description: 'Shown on cards and in search results. About 150 characters.' }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alternative text' })],
    }),
    defineField({ name: 'categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] }),
    defineField({ name: 'author', type: 'string', initialValue: 'Marketing' }),
    defineField({ name: 'body', type: 'blockContent' }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3, group: 'seo' }),
  ],
  groups: [{ name: 'seo', title: 'SEO' }],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', date: 'publishedAt', media: 'mainImage' }, prepare: ({ title, date, media }) => ({ title, subtitle: date ? new Date(date).toLocaleDateString('en-GB') : '', media }) },
});
