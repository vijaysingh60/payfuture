"""Turns live WordPress/Elementor page HTML into structured JSON the generic page template renders.
   python3 scripts/parse-live.py <pages.json> [<pages2.json>]   (pages.json = wp-json/wp/v2/pages output)"""
import json, re, sys, os
from bs4 import BeautifulSoup

BLOCK = ['p','li','h1','h2','h3','h4','h5','h6','div','section','ul','ol','button','table','details','summary']
SLUGS = {
  'solutions': ['pay-ins','payouts','real-time-payments','currency-management','smart-routing-and-cascading','authorisation-optimisation',
                'fraud-and-risk-management','reconciliation-management','reporting-and-analytics','banking-services','recovery'],
  'industries': ['e-learning','streaming','video-gaming','travel-agencies','remittance-providers','partners'],
  'corridors': ['corridors-china-to-india-cross-border-payments','corridors-usa-to-india-cross-border-payments'],
}
clean = lambda s: re.sub(r'\s+', ' ', s.replace('\xa0', ' ')).strip()

def tokens(html):
    soup = BeautifulSoup(html, 'html.parser')
    for t in soup(['script','style','svg','noscript','form','nav']): t.decompose()
    leaves = [el for el in soup.find_all(True) if not el.find(BLOCK)]
    leafset = set(map(id, leaves))
    out = []
    for el in leaves:
        # skip anything nested inside another leaf (spans inside a leaf div, links inside a paragraph ...)
        if any(id(p) in leafset for p in el.parents): continue
        t = clean(el.get_text(' '))
        if not t: continue
        n = el.name
        if re.fullmatch(r'h[1-6]', n): kind = n
        elif n in ('p','li','button','summary'): kind = n
        elif n == 'a':
            kind = 'a' if not el.find_parent(['p','li']) else 'p'
        else: kind = 'div'
        # skip pure UI chrome
        if kind in ('div','a','p') and t.lower() in ('previous','next','read more'): continue
        href = el.get('href') if n == 'a' else None
        out.append((kind, t, href))
    # a <button>/<summary> question is followed by its answer in a <div>/<p>/<details> body
    return out

def parse(html):
    toks = tokens(html)
    page = {'title': None, 'lead': [], 'cta': None, 'sections': [], 'faq': []}
    sec = None; pending_eyebrow = None; i = 0
    def new_section(title=None):
        nonlocal sec
        sec = {'eyebrow': pending_eyebrow, 'title': title, 'text': [], 'cards': [], 'bullets': [], 'tiles': [], 'cta': None}
        page['sections'].append(sec)
    while i < len(toks):
        kind, t, href = toks[i]
        if kind == 'h1': page['title'] = t
        elif kind == 'h5':
            pending_eyebrow = t
        elif kind == 'h2':
            if re.fullmatch(r'faqs?[ \-—:].*|faqs?', t, re.I) or re.search(r'\bfaq', t, re.I) and not toks[i+1:i+2] == []:
                page['faqTitle'] = t
            new_section(t); pending_eyebrow = None
        elif kind in ('h3','h4','h6') and sec is not None:
            body = []
            j = i + 1
            while j < len(toks) and toks[j][0] == 'p': body.append(toks[j][1]); j += 1
            sec['cards'].append({'title': t, 'text': ' '.join(body)}); i = j - 1
        elif kind in ('button','summary'):
            q = t; j = i + 1; ans = []
            while j < len(toks) and toks[j][0] in ('div','p','li') : 
                ans.append(toks[j][1]); j += 1
                if toks[j-1][0] == 'div': break
            page['faq'].append({'q': q, 'a': ' '.join(ans)}); i = j - 1
        elif kind == 'a':
            (sec['cta'] if sec is not None and sec['title'] else page.__setitem__('cta', page['cta'] or t)) if False else None
            if sec is None or not sec['title']: page['cta'] = page['cta'] or t
            elif not sec['cta']: sec['cta'] = t
        elif kind == 'li' and sec is not None: sec['bullets'].append(t)
        elif kind == 'div' and sec is not None:
            # a short label followed by a paragraph is a card; two labels in a row are one wrapped title; lone labels are tiles
            parts = [t]; j = i + 1
            while j < len(toks) and toks[j][0] == 'div' and len(toks[j][1]) < 40 and len(t) < 40: parts.append(toks[j][1]); j += 1
            title = ' '.join(parts) if len(parts) > 1 else t
            if j < len(toks) and toks[j][0] == 'p' and len(title) < 70:
                body = []
                while j < len(toks) and toks[j][0] == 'p': body.append(toks[j][1]); j += 1
                sec['cards'].append({'title': title, 'text': ' '.join(body)}); i = j - 1
            elif len(title) < 60: sec['tiles'].append(title); i = j - 1
            else: sec['text'].append(title); i = j - 1
        elif kind == 'p':
            if sec is None: page['lead'].append(t)
            else: sec['text'].append(t)
        i += 1
    page['sections'] = [s for s in page['sections'] if s['title'] or s['text'] or s['cards'] or s['bullets'] or s['tiles']]
    return page

if __name__ == '__main__':
    pages = []
    for f in sys.argv[1:]: pages += json.load(open(f))
    by = {p['link'].rstrip('/').split('/')[-1]: p for p in pages}
    for group, slugs in SLUGS.items():
        for s in slugs:
            p = by.get(s)
            if not p: print('MISSING', s); continue
            data = parse(p['content']['rendered'])
            data.update({'slug': s, 'group': group, 'wpTitle': clean(re.sub('<[^>]+>', '', p['title']['rendered']))})
            os.makedirs('src/data/live', exist_ok=True)
            json.dump(data, open(f'src/data/live/{s}.json', 'w'), indent=1, ensure_ascii=False)
            print(f"{group}/{s}: {len(data['sections'])} sections, {sum(len(x['cards']) for x in data['sections'])} cards, {len(data['faq'])} faq")
