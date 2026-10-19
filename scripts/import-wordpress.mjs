// Imports news posts, events and categories from the live WordPress site into Sanity.
//
//   node scripts/import-wordpress.mjs --dry     convert only: report what would be written, touch nothing
//   node scripts/import-wordpress.mjs           convert, upload images, write documents
//
// Safe to re-run: documents use stable ids (wp-post-<id>, wp-event-<id>, wp-cat-<id>) and are replaced in place,
// and Sanity de-duplicates identical image files. Reads PROJECT_ID and SANITY_TOKEN from .env.
import { readFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { createClient } from '@sanity/client';
import { JSDOM } from 'jsdom';

const DRY = process.argv.includes('--dry');
const WP = 'https://www.payfuture.net/wp-json/wp/v2';

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')];
    }),
);
const client = createClient({ projectId: env.PROJECT_ID, dataset: 'production', apiVersion: '2024-01-01', token: env.SANITY_TOKEN, useCdn: false });

const key = () => randomBytes(6).toString('hex');
const log = (...a) => console.log(...a);
const stats = { blocks: {}, images: 0, imageFails: [], tables: 0, embeds: 0 };
const bump = (k) => (stats.blocks[k] = (stats.blocks[k] ?? 0) + 1);

async function getJSON(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

/* ---------- images ---------- */
const imageCache = new Map();
const cleanSrc = (src) => src.replace(/^https?:\/\/sp-[a-z]+\.shortpixel\.ai\/client\/[^/]+\//, '').replace(/-\d+x\d+(\.\w+)$/, '$1');

async function uploadImage(src) {
  const url = cleanSrc(src);
  if (imageCache.has(url)) return imageCache.get(url);
  const p = (async () => {
    if (DRY) return `dry-${url}`;
    let res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    // Resized variants (-300x200) were stripped above; fall back to the URL as written if the original is gone.
    if (!res.ok && url !== src) res = await fetch(src, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(`${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload('image', buf, { filename: url.split('/').pop().split('?')[0] });
    return asset._id;
  })().catch((e) => {
    stats.imageFails.push(`${url} (${e.message})`);
    return null;
  });
  imageCache.set(url, p);
  return p;
}

/* ---------- HTML -> Portable Text ---------- */
const SKIP = new Set(['SCRIPT', 'STYLE', 'SVG', 'NOSCRIPT', 'HEAD', 'META', 'LINK', 'TITLE', 'BUTTON', 'FORM', 'INPUT', 'SELECT', 'TEXTAREA']);
const INLINE = new Set(['A', 'SPAN', 'STRONG', 'B', 'EM', 'I', 'U', 'SMALL', 'CODE', 'SUP', 'SUB', 'MARK', 'ABBR', 'BR', 'FONT', 'S', 'DEL', 'INS']);
const clean = (s) => s.replace(/ /g, ' ').replace(/[ \t\r\n]+/g, ' ');

function sitePath(href) {
  if (!href) return null;
  const m = href.match(/^https?:\/\/(?:www\.)?payfuture\.net(\/[^#]*)?(#.*)?$/i);
  if (m) return (m[1] ?? '/') + (m[2] ?? '');
  return href;
}

/** Inline nodes -> spans (+ link definitions). */
function inlineToSpans(nodes, marks = [], defs = []) {
  const spans = [];
  for (const n of nodes) {
    if (n.nodeType === 3) {
      const text = clean(n.textContent);
      if (text) spans.push({ _type: 'span', _key: key(), text, marks: [...marks] });
    } else if (n.nodeType === 1) {
      const tag = n.tagName;
      if (SKIP.has(tag)) continue;
      if (tag === 'BR') {
        spans.push({ _type: 'span', _key: key(), text: '\n', marks: [...marks] });
        continue;
      }
      let next = marks;
      if (tag === 'STRONG' || tag === 'B') next = [...marks, 'strong'];
      else if (tag === 'EM' || tag === 'I') next = [...marks, 'em'];
      else if (tag === 'A') {
        const href = sitePath(n.getAttribute('href'));
        if (href && !href.startsWith('javascript:')) {
          const k = key();
          defs.push({ _type: 'link', _key: k, href });
          next = [...marks, k];
        }
      }
      spans.push(...inlineToSpans([...n.childNodes], next, defs));
    }
  }
  return spans;
}

/** Tidy a list of spans: trim the ends, merge neighbours with identical marks, drop empties. */
function tidy(spans) {
  const out = [];
  for (const s of spans) {
    const prev = out[out.length - 1];
    if (prev && prev.marks.join() === s.marks.join()) prev.text += s.text;
    else out.push({ ...s });
  }
  if (out.length) {
    out[0].text = out[0].text.replace(/^ +/, '');
    out[out.length - 1].text = out[out.length - 1].text.replace(/ +$/, '');
  }
  return out.map((s) => ({ ...s, text: s.text.replace(/ ?\n ?/g, '\n').replace(/ {2,}/g, ' ') })).filter((s) => s.text !== '');
}

function textBlock(nodes, { style = 'normal', listItem, level } = {}) {
  const defs = [];
  const children = tidy(inlineToSpans(nodes, [], defs));
  if (!children.length || children.every((c) => !c.text.trim())) return null;
  const block = { _type: 'block', _key: key(), style, markDefs: defs, children };
  if (listItem) Object.assign(block, { listItem, level });
  bump(listItem ? `list:${listItem}` : style);
  return block;
}

const isInline = (n) => n.nodeType === 3 || (n.nodeType === 1 && INLINE.has(n.tagName) && !n.querySelector?.('p,div,ul,ol,table,h1,h2,h3,h4,h5,h6,img,figure,iframe,blockquote'));

function tableBlock(table) {
  const rows = [...table.querySelectorAll('tr')]
    .map((tr) => ({
      _type: 'tableRow',
      _key: key(),
      cells: [...tr.querySelectorAll('th,td')].map((c) => clean(c.textContent).trim()),
    }))
    .filter((r) => r.cells.some(Boolean));
  if (!rows.length) return null;
  const width = Math.max(...rows.map((r) => r.cells.length));
  rows.forEach((r) => { while (r.cells.length < width) r.cells.push(''); });
  const headRows = table.querySelectorAll('thead tr').length || (table.querySelector('tr')?.querySelector('th') ? 1 : 0);
  stats.tables++;
  bump('table');
  return { _type: 'table', _key: key(), headerRows: headRows, rows };
}

async function imageBlock(img) {
  const raw = img.getAttribute('data-src') || img.getAttribute('data-lazy-src') || img.getAttribute('src');
  if (!raw || raw.startsWith('data:') || /\.svg(\?|$)/i.test(raw)) return null;
  const w = Number(img.getAttribute('width') || 0);
  if (w && w < 80) return null;
  const id = await uploadImage(new URL(raw, 'https://www.payfuture.net').href);
  if (!id) return null;
  stats.images++;
  bump('image');
  const caption = img.closest('figure')?.querySelector('figcaption')?.textContent?.trim();
  return { _type: 'image', _key: key(), asset: { _type: 'reference', _ref: id }, alt: img.getAttribute('alt') || undefined, caption: caption || undefined };
}

async function listBlocks(list, level, out) {
  const kind = list.tagName === 'OL' ? 'number' : 'bullet';
  for (const li of list.children) {
    if (li.tagName !== 'LI') continue;
    const inlineNodes = [];
    const nested = [];
    for (const c of li.childNodes) {
      if (c.nodeType === 1 && (c.tagName === 'UL' || c.tagName === 'OL')) nested.push(c);
      else if (c.nodeType === 1 && (c.tagName === 'P' || c.tagName === 'DIV')) inlineNodes.push(...c.childNodes, c.ownerDocument.createTextNode(' '));
      else inlineNodes.push(c);
    }
    const b = textBlock(inlineNodes, { listItem: kind, level });
    if (b) {
      // Several source posts type a dash or bullet into the item itself; the list already provides one.
      const first = b.children[0];
      first.text = first.text.replace(/^\s*[–—•·-]\s+/, '');
      if (!first.text) b.children.shift();
      if (b.children.length) out.push(b);
    }
    for (const n of nested) await listBlocks(n, level + 1, out);
  }
}

async function walk(node, out) {
  let buffer = [];
  const flush = () => {
    const b = textBlock(buffer);
    if (b) out.push(b);
    buffer = [];
  };

  for (const c of node.childNodes) {
    if (c.nodeType === 8) continue; // comments
    if (c.nodeType === 3) { buffer.push(c); continue; }
    if (c.nodeType !== 1) continue;
    const tag = c.tagName;
    const cls = c.getAttribute('class') || '';
    if (SKIP.has(tag)) continue;
    if (/ez-toc-container|elementor-widget-spacer|wp-block-spacer|elementor-button-wrapper/.test(cls)) {
      // Buttons that are only a link become a plain paragraph containing that link.
      if (/elementor-button-wrapper/.test(cls)) { flush(); const b = textBlock([...c.querySelectorAll('a')]); if (b) out.push(b); }
      continue;
    }
    if (isInline(c)) { buffer.push(c); continue; }

    flush();
    if (/^H[1-6]$/.test(tag)) {
      const style = tag === 'H3' ? 'h3' : tag === 'H4' || tag === 'H5' || tag === 'H6' ? 'h4' : 'h2';
      const b = textBlock([...c.childNodes], { style });
      if (b) out.push(b);
    } else if (tag === 'P') {
      const onlyImg = [...c.childNodes].filter((n) => n.nodeType !== 3 || n.textContent.trim()).length === 1 && c.querySelector('img');
      if (onlyImg) { const b = await imageBlock(c.querySelector('img')); if (b) out.push(b); }
      else if (c.querySelector('img,iframe,table,ul,ol')) await walk(c, out);
      else { const b = textBlock([...c.childNodes]); if (b) out.push(b); }
    } else if (tag === 'UL' || tag === 'OL') {
      await listBlocks(c, 0, out);
    } else if (tag === 'BLOCKQUOTE') {
      const b = textBlock([...c.querySelectorAll('p')].length ? [...c.querySelectorAll('p')].flatMap((p) => [...p.childNodes, p.ownerDocument.createTextNode(' ')]) : [...c.childNodes], { style: 'blockquote' });
      if (b) out.push(b);
    } else if (tag === 'TABLE') {
      const t = tableBlock(c);
      if (t) out.push(t);
    } else if (tag === 'IMG') {
      const b = await imageBlock(c);
      if (b) out.push(b);
    } else if (tag === 'FIGURE') {
      const img = c.querySelector('img');
      if (img) { const b = await imageBlock(img); if (b) out.push(b); } else await walk(c, out);
    } else if (tag === 'IFRAME') {
      const src = c.getAttribute('src') || c.getAttribute('data-src');
      if (src) {
        stats.embeds++;
        bump('embed');
        out.push({
          _type: 'embed',
          _key: key(),
          url: src.startsWith('//') ? `https:${src}` : src,
          height: Number(c.getAttribute('height')) || undefined,
          title: c.getAttribute('title') || undefined,
        });
      }
    } else if (tag === 'HR') {
      bump('divider');
      out.push({ _type: 'divider', _key: key(), style: 'line' });
    } else if (tag === 'DETAILS') {
      const summary = c.querySelector('summary');
      if (summary) { const b = textBlock([summary], { style: 'h3' }); if (b) out.push(b); summary.remove(); }
      await walk(c, out);
    } else if (tag === 'A' && /button/.test(cls)) {
      const b = textBlock([c]);
      if (b) out.push(b);
    } else {
      await walk(c, out); // div, section, article, figure wrappers, Elementor containers…
    }
  }
  flush();
}

async function htmlToBlocks(html) {
  const dom = new JSDOM(`<body>${html}</body>`);
  const out = [];
  await walk(dom.window.document.body, out);
  // Collapse accidental duplicate consecutive headings left by Elementor wrappers.
  return out.filter((b, i) => !(b.style?.startsWith('h') && out[i - 1]?.style === b.style && out[i - 1].children?.[0]?.text === b.children[0]?.text));
}

const plain = (html) => (html ? new JSDOM(`<body>${html}</body>`).window.document.body.textContent.replace(/\s+/g, ' ').trim() : '');

/* ---------- documents ---------- */
async function mainImage(item) {
  const m = item._embedded?.['wp:featuredmedia']?.[0];
  if (!m?.source_url) return undefined;
  const id = await uploadImage(m.source_url);
  return id ? { _type: 'image', asset: { _type: 'reference', _ref: id }, alt: m.alt_text || plain(item.title.rendered) } : undefined;
}

const seo = (item) => ({
  seoTitle: item.yoast_head_json?.title || undefined,
  seoDescription: item.yoast_head_json?.description || item.yoast_head_json?.og_description || undefined,
});

async function main() {
  log(DRY ? 'DRY RUN: nothing will be uploaded or written.\n' : 'Importing into Sanity…\n');
  const [posts, events, cats] = await Promise.all([
    getJSON(`${WP}/posts?per_page=100&_embed=wp:featuredmedia,wp:term,author`),
    getJSON(`${WP}/event?per_page=100&_embed=wp:featuredmedia`),
    getJSON(`${WP}/categories?per_page=100`),
  ]);
  log(`Found ${posts.length} posts, ${events.length} events, ${cats.filter((c) => c.count > 0).length} categories in use.`);

  const docs = [];
  for (const c of cats.filter((c) => c.count > 0)) {
    docs.push({ _id: `wp-cat-${c.id}`, _type: 'category', title: plain(c.name), slug: { _type: 'slug', current: c.slug } });
  }

  let n = 0;
  for (const p of posts) {
    const refs = (p._embedded?.['wp:term']?.[0] ?? []).map((t) => ({ _type: 'reference', _key: key(), _ref: `wp-cat-${t.id}` }));
    docs.push({
      _id: `wp-post-${p.id}`,
      _type: 'post',
      title: plain(p.title.rendered),
      slug: { _type: 'slug', current: p.slug },
      publishedAt: new Date(p.date_gmt + 'Z').toISOString(),
      excerpt: plain(p.excerpt?.rendered),
      mainImage: await mainImage(p),
      categories: refs,
      author: p._embedded?.author?.[0]?.name || 'Marketing',
      body: await htmlToBlocks(p.content.rendered),
      ...seo(p),
    });
    process.stdout.write(`\r  posts converted: ${++n}/${posts.length}`);
  }
  process.stdout.write('\n');

  n = 0;
  for (const e of events) {
    docs.push({
      _id: `wp-event-${e.id}`,
      _type: 'event',
      title: plain(e.title.rendered),
      slug: { _type: 'slug', current: e.slug },
      startDate: e.meta?._event_start_date || e.date.slice(0, 10),
      endDate: e.meta?._event_end_date || undefined,
      location: e.meta?._event_location || undefined,
      excerpt: plain(e.excerpt?.rendered),
      mainImage: await mainImage(e),
      body: await htmlToBlocks(e.content.rendered),
      ...seo(e),
    });
    process.stdout.write(`\r  events converted: ${++n}/${events.length}`);
  }
  process.stdout.write('\n\n');

  log('Blocks produced:', JSON.stringify(stats.blocks));
  log(`Images: ${stats.images} placed, ${stats.imageFails.length} failed. Tables: ${stats.tables}. Embeds: ${stats.embeds}.`);
  if (stats.imageFails.length) log('Failed images:\n  ' + stats.imageFails.slice(0, 12).join('\n  '));
  const empty = docs.filter((d) => ['post', 'event'].includes(d._type) && !d.body?.length);
  log(`Posts/events with an empty body: ${empty.length}${empty.length ? ' -> ' + empty.map((d) => d.slug.current).join(', ') : ''}`);
  const noImg = docs.filter((d) => ['post', 'event'].includes(d._type) && !d.mainImage);
  log(`Posts/events without a main image: ${noImg.length}`);

  // Never overwrite good documents with ones that lost images to a network hiccup.
  if (!DRY && stats.imageFails.length) {
    console.error(`\nAborting before any write: ${stats.imageFails.length} image(s) could not be downloaded. Re-run when the network is stable.`);
    process.exit(2);
  }

  if (DRY) {
    const sample = docs.find((d) => d._type === 'post' && d.body.length > 8);
    log('\nSample converted post:', sample.title, '\n', JSON.stringify(sample.body.slice(0, 5), null, 1).slice(0, 1400));
    return;
  }

  // Write categories first so references resolve, then everything else, ten per transaction.
  const ordered = [...docs.filter((d) => d._type === 'category'), ...docs.filter((d) => d._type !== 'category')];
  for (let i = 0; i < ordered.length; i += 10) {
    const tx = client.transaction();
    ordered.slice(i, i + 10).forEach((d) => tx.createOrReplace(d));
    await tx.commit();
    process.stdout.write(`\r  written: ${Math.min(i + 10, ordered.length)}/${ordered.length}`);
  }
  process.stdout.write('\n');
  const counts = await client.fetch('{"posts":count(*[_type=="post"]),"events":count(*[_type=="event"]),"categories":count(*[_type=="category"])}');
  log('Dataset now contains:', counts);
}

main().catch((e) => {
  console.error('\nImport failed:', e.message);
  process.exit(1);
});
