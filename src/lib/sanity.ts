// Build-time access to Sanity. Pages call these in their frontmatter, so content is fetched when the site is built.
// PROJECT_ID and SANITY_TOKEN come from .env (not PUBLIC_, so they are never sent to the browser).
import { createClient } from '@sanity/client';
import { toHTML, uriLooksSafe } from '@portabletext/to-html';

const projectId = import.meta.env.PROJECT_ID ?? process.env.PROJECT_ID;
const token = import.meta.env.SANITY_TOKEN ?? process.env.SANITY_TOKEN;
const dataset = 'production';

export const sanity = createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false, token });

/* ---------- types ---------- */
export interface Img {
  url: string;
  alt?: string;
  w?: number;
  h?: number;
  lqip?: string;
}
export interface Cat {
  title: string;
  slug: string;
  count?: number;
}
export interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  author?: string;
  image?: Img;
  categories: Cat[];
  seoTitle?: string;
  seoDescription?: string;
  words: number;
  body?: any[];
}
export interface EventItem {
  _id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate?: string;
  location?: string;
  excerpt?: string;
  image?: Img;
  seoTitle?: string;
  seoDescription?: string;
  body?: any[];
}

/* ---------- images ---------- */
/** Sanity serves resized, format-converted images from its CDN via query parameters. */
export const sized = (img: Img | undefined, width: number, height?: number) => {
  if (!img?.url) return '';
  const q = new URLSearchParams({ w: String(width), auto: 'format', q: '80', fit: height ? 'crop' : 'max' });
  if (height) q.set('h', String(height));
  return `${img.url}?${q}`;
};

const IMAGE = `{ "url": asset->url, "alt": alt, "w": asset->metadata.dimensions.width, "h": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip }`;
const POST_CARD = `{
  _id, title, "slug": slug.current, publishedAt, excerpt, author, seoTitle, seoDescription,
  "image": mainImage${IMAGE},
  "categories": categories[]->{ title, "slug": slug.current },
  "words": length(string::split(pt::text(body), " "))
}`;
const BODY = `body[]{ ..., _type == "image" => { ..., "url": asset->url, "w": asset->metadata.dimensions.width, "h": asset->metadata.dimensions.height } }`;

const memo = new Map<string, Promise<any>>();
const cached = <T>(key: string, run: () => Promise<T>) => {
  if (!memo.has(key)) memo.set(key, run());
  return memo.get(key) as Promise<T>;
};

/* ---------- queries ---------- */
export const getPosts = () => cached<Post[]>('posts', () => sanity.fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${POST_CARD}`));

export const getPost = (slug: string) =>
  cached<Post | null>(`post:${slug}`, () =>
    sanity.fetch(`*[_type == "post" && slug.current == $slug][0]{ ..., "slug": slug.current, "image": mainImage${IMAGE}, "categories": categories[]->{ title, "slug": slug.current }, "words": length(string::split(pt::text(body), " ")), ${BODY} }`, { slug }),
  );

export const getCategories = () =>
  cached<Cat[]>('cats', () =>
    sanity.fetch(`*[_type == "category"]{ title, "slug": slug.current, "count": count(*[_type == "post" && references(^._id)]) }[count > 0] | order(count desc, title asc)`),
  );

export const getEvents = () =>
  cached<EventItem[]>('events', () =>
    sanity.fetch(`*[_type == "event" && defined(slug.current)] | order(startDate desc){ _id, title, "slug": slug.current, startDate, endDate, location, excerpt, seoTitle, seoDescription, "image": mainImage${IMAGE} }`),
  );

export const getEvent = (slug: string) =>
  cached<EventItem | null>(`event:${slug}`, () =>
    sanity.fetch(`*[_type == "event" && slug.current == $slug][0]{ ..., "slug": slug.current, "image": mainImage${IMAGE}, ${BODY} }`, { slug }),
  );

/* ---------- formatting ---------- */
export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Intl.DateTimeFormat('en-GB', { ...opts, timeZone: 'UTC' }).format(new Date(iso));

export const readTime = (words: number) => Math.max(1, Math.round(words / 220));

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/* ---------- Portable Text -> HTML ---------- */
const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const textOf = (block: any) => (block.children ?? []).map((c: any) => c.text ?? '').join('');

export interface Heading {
  id: string;
  text: string;
}

/** Renders a body to HTML and returns the h2 headings (with stable ids) for a contents list. */
export function renderBody(body: any[] = []): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const used = new Set<string>();
  const idFor = (text: string) => {
    let id = slugify(text).slice(0, 60) || 'section';
    let n = 2;
    while (used.has(id)) id = `${id.slice(0, 56)}-${n++}`;
    used.add(id);
    return id;
  };
  // Pre-assign ids so the contents list and the rendered headings always agree.
  const ids = new Map<string, string>();
  for (const b of body) {
    if (b._type === 'block' && b.style === 'h2') {
      const id = idFor(textOf(b));
      ids.set(b._key, id);
      headings.push({ id, text: textOf(b) });
    }
  }

  const html = toHTML(body, {
    onMissingComponent: false,
    components: {
      block: {
        h2: ({ children, value }) => `<h2 id="${ids.get(value._key) ?? ''}">${children}</h2>`,
      },
      marks: {
        link: ({ children, value }) => {
          const href = value?.href ?? '';
          if (!uriLooksSafe(href)) return String(children);
          const external = /^https?:\/\//i.test(href);
          return `<a href="${esc(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${children}</a>`;
        },
      },
      types: {
        image: ({ value }) => {
          if (!value?.url) return '';
          const w = value.w && value.w < 1200 ? value.w : 1200;
          const alt = esc(value.alt ?? '');
          const img = `<img src="${esc(value.url)}?w=${w}&auto=format&q=80" alt="${alt}" loading="lazy"${value.w && value.h ? ` width="${value.w}" height="${value.h}"` : ''}>`;
          return value.caption ? `<figure>${img}<figcaption>${esc(value.caption)}</figcaption></figure>` : `<figure>${img}</figure>`;
        },
        table: ({ value }) => {
          const rows: { cells: string[] }[] = value?.rows ?? [];
          const head = Math.min(value?.headerRows ?? 0, rows.length);
          const cell = (tag: string, c: string) => `<${tag}>${esc(c).replace(/\n/g, '<br>')}</${tag}>`;
          const thead = head ? `<thead>${rows.slice(0, head).map((r) => `<tr>${r.cells.map((c) => cell('th', c)).join('')}</tr>`).join('')}</thead>` : '';
          const tbody = `<tbody>${rows.slice(head).map((r) => `<tr>${r.cells.map((c) => cell('td', c)).join('')}</tr>`).join('')}</tbody>`;
          return `<table>${thead}${tbody}</table>`;
        },
        embed: ({ value }) => {
          const url = String(value?.url ?? '');
          const title = esc(value?.title || 'Embedded content');
          // Only well-known hosts are embedded; anything else becomes a plain link.
          if (/^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com)\//i.test(url)) {
            return `<div class="embed"><iframe src="${esc(url)}" loading="lazy" allowfullscreen title="${title}"></iframe></div>`;
          }
          if (/^https:\/\/datawrapper\.dwcdn\.net\//i.test(url)) {
            // Datawrapper charts report their real height by postMessage; the stored height is the starting size.
            const h = Math.min(1400, Math.max(200, Number(value?.height) || 450));
            return `<div class="embed embed--chart"><iframe src="${esc(url)}" loading="lazy" title="${title}" height="${h}" style="height:${h}px" scrolling="no" frameborder="0"></iframe></div>`;
          }
          return `<p><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(url)}</a></p>`;
        },
        divider: () => '<hr>',
      },
    },
  });
  return { html, headings };
}

export const postHref = (slug: string) => `/newsroom/${slug}/`;
export const eventHref = (slug: string) => `/newsroom/events/${slug}/`;
export const categoryHref = (slug: string) => `/newsroom/category/${slug}/`;
