import { defineArrayMember, defineType } from 'sanity';

// Rich text used by news posts and events. Mirrors what the website can render.
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bulleted list', value: 'bullet' },
        { title: 'Numbered list', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [{ name: 'href', type: 'url', title: 'URL', validation: (r) => r.uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true }) }],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative text' },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
    }),
    defineArrayMember({
      name: 'table',
      title: 'Table',
      type: 'object',
      fields: [
        { name: 'caption', type: 'string', title: 'Caption' },
        { name: 'headerRows', type: 'number', title: 'Header rows', initialValue: 1 },
        {
          name: 'rows',
          type: 'array',
          title: 'Rows',
          of: [
            {
              type: 'object',
              name: 'tableRow',
              fields: [{ name: 'cells', type: 'array', title: 'Cells', of: [{ type: 'text', rows: 2 }] }],
              preview: { select: { cells: 'cells' }, prepare: ({ cells }) => ({ title: (cells ?? []).join('  |  ') }) },
            },
          ],
        },
      ],
      preview: { select: { rows: 'rows' }, prepare: ({ rows }) => ({ title: 'Table', subtitle: `${(rows ?? []).length} rows` }) },
    }),
    defineArrayMember({
      name: 'embed',
      title: 'Video or embed',
      type: 'object',
      fields: [
        { name: 'url', type: 'url', title: 'URL (YouTube, Vimeo, Datawrapper…)' },
        { name: 'title', type: 'string', title: 'Title (read out to screen readers)' },
        { name: 'height', type: 'number', title: 'Height in pixels', description: 'Charts need a fixed height. Leave empty for 16:9 video.' },
      ],
      preview: { select: { url: 'url' }, prepare: ({ url }) => ({ title: 'Embed', subtitle: url }) },
    }),
    defineArrayMember({ name: 'divider', title: 'Divider', type: 'object', fields: [{ name: 'style', type: 'string', hidden: true, initialValue: 'line' }], preview: { prepare: () => ({ title: '— Divider —' }) } }),
  ],
});
