import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  initBatch,
  initClipReveals,
  initCoinFlow,
  initCorridorFinder,
  initGlowAreas,
  initInView,
  initPageHero,
  initSteps,
  initTabs,
  initTilt,
} from './pages';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover)').matches;
const $ = <T extends HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

/* ---------- Smooth scroll ---------- */
function initSmoothScroll() {
  if (reducedMotion) return;
  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -90 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Header ---------- */
function initHeader() {
  const header = $('[data-header]')!;
  const toggle = $('[data-nav-toggle]')!;
  const setOpen = (open: boolean) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  $$('[data-nav] a').forEach((a) => a.addEventListener('click', () => setOpen(false)));

  // Tuck the bar away while reading down the page; bring it back on the way up.
  ScrollTrigger.create({
    start: 400,
    end: 'max',
    onUpdate: (self) => {
      if (header.classList.contains('is-open')) return;
      header.classList.toggle('is-hidden', self.direction === 1);
    },
    onLeaveBack: () => header.classList.remove('is-hidden'),
  });

  gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
}

/* ---------- Hero ---------- */
function initPhotoPills() {
  $$('[data-pill]').forEach((pill, p) => {
    const imgs = $$<HTMLImageElement>('img', pill);
    gsap.set(imgs, { y: 0, yPercent: (i) => (i === 0 ? 0 : 101) });
    if (reducedMotion) return;
    let current = 0;
    const next = () => {
      const from = imgs[current];
      current = (current + 1) % imgs.length;
      gsap.to(from, { yPercent: -101, duration: 0.9, ease: 'power4.inOut' });
      gsap.fromTo(imgs[current], { yPercent: 101 }, { yPercent: 0, duration: 0.9, ease: 'power4.inOut' });
      gsap.delayedCall(2.8, next);
    };
    gsap.delayedCall(3 + p * 1.4, next);
  });
}

function initStage() {
  const slides = $$('.stage__slide');
  const dots = $$('.stage__dot');
  if (!slides.length) return;
  let current = 0;
  let z = 1;
  let autoplay: gsap.core.Tween | null = null;

  const drift = (img: Element, delay = 0) =>
    gsap.to(img, { scale: 1.16, duration: 8, delay, ease: 'none', overwrite: 'auto' });

  function show(index: number) {
    const next = (index + slides.length) % slides.length;
    if (next === current) return;
    const slide = slides[next];
    const img = slide.querySelector('img')!;

    gsap.killTweensOf(img);
    gsap.set(slide, { zIndex: ++z });
    gsap.fromTo(
      slide,
      { clipPath: 'inset(0% 0% 0% 100%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut' },
    );
    gsap.fromTo(img, { scale: 1.3, xPercent: 8 }, { scale: 1.05, xPercent: 0, duration: 1.8, ease: 'power3.out' });
    drift(img, 1.8);

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === next);
      dot.setAttribute('aria-selected', String(i === next));
    });
    current = next;
    swapChip(slide);
  }

  // The card over the photo follows the slide: it drops out, takes the new text, and rises back in.
  function swapChip(slide: HTMLElement) {
    const title = $('[data-chip-title]');
    const sub = $('[data-chip-sub]');
    const card = title?.closest<HTMLElement>('.chip');
    if (!title || !sub || !card) return;
    gsap.timeline()
      .to(card, { yPercent: 25, opacity: 0, duration: 0.3, ease: 'power2.in' })
      .add(() => {
        title.textContent = slide.dataset.slideTitle ?? '';
        sub.textContent = slide.dataset.slideSub ?? '';
      })
      .to(card, { yPercent: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }, '+=0.45');
  }

  const queue = () => {
    autoplay?.kill();
    autoplay = gsap.delayedCall(5.5, () => {
      show(current + 1);
      queue();
    });
  };

  dots.forEach((dot, i) =>
    dot.addEventListener('click', () => {
      show(i);
      queue();
    }),
  );

  if (reducedMotion) return;
  drift(slides[0].querySelector('img')!, 1);
  queue();

  // The framed photo opens out to the full width of the page as it scrolls up.
  gsap.fromTo(
    '[data-stage-frame]',
    { clipPath: 'inset(0% 7% 0% 7% round 40px)' },
    {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      ease: 'none',
      scrollTrigger: { trigger: '[data-stage]', start: 'top 80%', end: 'top 12%', scrub: 0.5 },
    },
  );
  gsap.to('.stage__slide', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: { trigger: '[data-stage]', start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

function initHeroIntro() {
  if (reducedMotion || !$('[data-hero]')) return;

  const intro = gsap
    .timeline({ paused: true, defaults: { ease: 'power4.out' } })
    .to('[data-loader]', { yPercent: -100, duration: 0.9, ease: 'power4.inOut' })
    .set('[data-loader]', { display: 'none' })
    .fromTo('[data-hero-word]', { yPercent: 120, y: 0 }, { yPercent: 0, duration: 1.2, stagger: 0.09 }, 0.45)
    .to('.photo-pill', { width: '1.5em', duration: 1.2, stagger: 0.15, ease: 'power4.inOut' }, 0.75)
    .fromTo('[data-hero-fade]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 1.05)
    .fromTo('.stage', { opacity: 0, y: 90 }, { opacity: 1, y: 0, duration: 1.3 }, 1.2)
    .fromTo('.chip', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.18, ease: 'back.out(1.7)' }, 2);

  // Let the loader bar finish, but never hold the page for slow assets.
  gsap.delayedCall(0.95, () => intro.play());

  const glow = $('[data-hero-glow]');
  const hero = $('[data-hero]');
  if (glow && hero && canHover) {
    const xTo = gsap.quickTo(glow, 'x', { duration: 1.2, ease: 'power3.out' });
    const yTo = gsap.quickTo(glow, 'y', { duration: 1.2, ease: 'power3.out' });
    hero.addEventListener('pointermove', (e) => {
      const box = hero.getBoundingClientRect();
      xTo(e.clientX - box.left);
      yTo(e.clientY - box.top);
    });
  }
}

/* ---------- Scroll reveals ---------- */
function splitWords(el: HTMLElement, masked = true) {
  const words: HTMLElement[] = [];
  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (child.textContent ?? '').split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(' ');
          const word = document.createElement('span');
          word.className = 'w';
          word.textContent = part;
          words.push(word);
          if (!masked) return frag.append(word);
          const mask = document.createElement('span');
          mask.className = 'w-mask';
          mask.append(word);
          frag.append(mask);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
  return words;
}

function initReveals() {
  if (reducedMotion) return;

  $$('[data-split]').forEach((el) => {
    gsap.from(splitWords(el), {
      yPercent: 120,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // Statement text lights up word by word as it is read.
  $$('[data-highlight]').forEach((el) => {
    gsap.fromTo(
      splitWords(el, false),
      { opacity: 0.14 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 55%', scrub: 0.4 },
      },
    );
  });

  // Horizontal offsets widen the page on a phone, which shows up as a blank
  // strip and a sideways scroll. Small screens rise into place instead.
  const compact = window.matchMedia('(max-width: 900px)').matches;
  const from: Record<string, gsap.TweenVars> = compact
    ? {
        left: { y: 36 },
        right: { y: 36 },
        scale: { scale: 0.96, y: 24 },
        up: { y: 36 },
      }
    : {
        left: { x: -60 },
        right: { x: 60 },
        scale: { scale: 0.9, y: 24 },
        up: { y: 50 },
      };
  $$('[data-reveal]').forEach((el) => gsap.set(el, { opacity: 0, ...from[el.dataset.reveal || 'up'] }));

  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 92%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.08,
        // Hand transforms back to CSS so hover states work.
        clearProps: 'transform,opacity',
      }),
  });

  // Phones rise into their panels as the panel scrolls in.
  $$('[data-phone]').forEach((phone) => {
    gsap.from(phone, {
      yPercent: 45,
      ease: 'none',
      scrollTrigger: { trigger: phone.parentElement, start: 'top 95%', end: 'top 30%', scrub: 0.8 },
    });
  });

  // Each stacked card eases back as the next one slides over it.
  const cards = $$('.stack__card');
  cards.slice(0, -1).forEach((card, i) => {
    gsap.to(card, {
      scale: 0.92 + i * 0.02,
      ease: 'none',
      scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: true },
    });
  });
}

function initCounters() {
  if (reducedMotion) return;
  $$('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const state = { value: 0 };
    el.textContent = (0).toFixed(decimals);
    gsap.to(state, {
      value: target,
      duration: 2.4,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => (el.textContent = state.value.toFixed(decimals)),
    });
  });
}

/* ---------- Pointer effects ---------- */
function initPointerEffects() {
  if (reducedMotion || !canHover) return;

  $$('[data-magnetic]').forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
    btn.addEventListener('pointermove', (e) => {
      const box = btn.getBoundingClientRect();
      xTo((e.clientX - box.left - box.width / 2) * 0.3);
      yTo((e.clientY - box.top - box.height / 2) * 0.4);
    });
    btn.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });

  // Industry rows: a photo trails the pointer and swaps with the hovered row.
  const float = $('[data-rows-float]');
  const list = $('[data-rows]');
  if (float && list) {
    const img = $<HTMLImageElement>('img', float)!;
    gsap.set(float, { xPercent: -50, yPercent: -50, scale: 0.6 });
    const xTo = gsap.quickTo(float, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(float, 'y', { duration: 0.6, ease: 'power3.out' });
    const rows = $$('[data-row]', list);
    let activeRow: HTMLElement | null = null;
    let pointer = { x: -1, y: -1 };

    const setRow = (row: HTMLElement | null) => {
      if (row === activeRow) return;
      activeRow = row;
      if (!row) {
        gsap.to(float, { opacity: 0, scale: 0.6, duration: 0.3, overwrite: 'auto' });
        return;
      }
      img.src = row.dataset.row!;
      gsap.to(float, {
        opacity: 1,
        scale: 1,
        rotate: rows.indexOf(row) % 2 ? 5 : -5,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    // Resolve the row from the pointer position, so the photo also clears when the page
    // scrolls out from under a still pointer (no pointerleave fires in that case).
    const sync = () => {
      const under = pointer.x < 0 ? null : document.elementFromPoint(pointer.x, pointer.y);
      setRow(under?.closest<HTMLElement>('[data-row]') ?? null);
    };

    window.addEventListener('pointermove', (e) => {
      pointer = { x: e.clientX, y: e.clientY };
      xTo(e.clientX + 200);
      yTo(e.clientY);
      sync();
    });
    window.addEventListener('scroll', sync, { passive: true });
    document.addEventListener('pointerleave', () => {
      pointer = { x: -1, y: -1 };
      setRow(null);
    });
  }
}

/* ---------- Global reach: globe + country search ---------- */
function initGlobalReach() {
  const canvas = $<HTMLCanvasElement>('[data-globe]');
  const links = $$('[data-market]');
  let globe: { focus: (name: string) => void; blur: () => void } | null = null;

  if (canvas) {
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const { initGlobe } = await import('./globe');
        globe = initGlobe(canvas, JSON.parse(canvas.dataset.markets || '[]'), reducedMotion);
      },
      { rootMargin: '600px' },
    );
    io.observe(canvas);

    if (!reducedMotion) {
      gsap.from('.reach__visual', {
        scale: 0.8,
        rotate: -12,
        ease: 'none',
        scrollTrigger: { trigger: '.reach', start: 'top bottom', end: 'top 20%', scrub: 0.6 },
      });
    }
  }

  links.forEach((link) => {
    const name = link.dataset.market!;
    link.addEventListener('pointerenter', () => globe?.focus(name));
    link.addEventListener('focus', () => globe?.focus(name));
    link.addEventListener('pointerleave', () => globe?.blur());
    link.addEventListener('blur', () => globe?.blur());
    link.addEventListener('click', (e) => {
      e.preventDefault();
      globe?.focus(name);
    });
  });

  const input = $<HTMLInputElement>('[data-market-search]');
  const empty = $('[data-market-empty]');
  input?.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    const matches = links.filter((link) => {
      const match = link.dataset.market!.toLowerCase().includes(query);
      link.parentElement!.hidden = !match;
      return match;
    });
    if (empty) empty.hidden = matches.length > 0;
    if (!reducedMotion) {
      gsap.fromTo(
        matches.map((m) => m.parentElement),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power2.out', overwrite: true, clearProps: 'transform,opacity' },
      );
    }
    if (query && matches.length === 1) globe?.focus(matches[0].dataset.market!);
    else globe?.blur();
  });
}

/* ---------- Lottie ---------- */
function initLottie() {
  $$<HTMLCanvasElement>('[data-lottie]').forEach((canvas) => {
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const { DotLottie } = await import('@lottiefiles/dotlottie-web');
        DotLottie.setWasmUrl('/vendor/dotlottie-player.wasm');
        new DotLottie({ canvas, src: canvas.dataset.lottie!, loop: true, autoplay: !reducedMotion });
      },
      { rootMargin: '400px' },
    );
    io.observe(canvas);
  });
}

/* ---------- FAQ + newsletter ---------- */
function initFaq() {
  const faq = $('[data-faq]');
  if (!faq) return;
  faq.classList.add('js-faq');
  requestAnimationFrame(() => requestAnimationFrame(() => faq.classList.add('is-ready')));
  const items = $$('.faq__item', faq);
  items.forEach((item) => {
    $('.faq__q', item)!.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      items.forEach((other) => {
        other.classList.toggle('is-open', other === item && open);
        $('.faq__q', other)!.setAttribute('aria-expanded', String(other === item && open));
      });
    });
  });
}

function initNewsletter() {
  const form = $<HTMLFormElement>('[data-newsletter]');
  const status = $('[data-newsletter-status]');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!status) return;
    if (!form.checkValidity()) {
      status.textContent = 'Please fill in your name and a valid email.';
      return;
    }
    status.textContent = 'Thanks — this demo form is not connected yet.';
    form.reset();
  });
}

initSmoothScroll();
initHeader();
initPhotoPills();
initStage();
initHeroIntro();
initPageHero();
initReveals();
initInView();
initClipReveals();
initSteps();
initTabs();
initCorridorFinder();
initCoinFlow();
initBatch();
initGlowAreas();
initTilt();
initCounters();
initPointerEffects();
initGlobalReach();
initLottie();
initFaq();
initNewsletter();

(window as any).__pfReady = true;

// Lazy images, fonts and the FAQ all change the page height; keep scroll triggers in step.
let refreshTimer: number;
new ResizeObserver(() => {
  clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
}).observe(document.body);
