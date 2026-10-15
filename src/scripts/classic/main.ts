import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

/* ---------- Smooth scroll ---------- */
function initSmoothScroll() {
  if (reducedMotion) return;
  const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Header, announcement bar, progress ---------- */
function initHeader() {
  const header = $('[data-header]')!;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = $('[data-nav-toggle]')!;
  const setOpen = (open: boolean) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  $$('[data-nav] a').forEach((a) => a.addEventListener('click', () => setOpen(false)));

  const bar = $('[data-announce]');
  $('[data-announce-close]')?.addEventListener('click', () => {
    if (!bar) return;
    gsap.to(bar, {
      height: 0,
      minHeight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => {
        bar.remove();
        ScrollTrigger.refresh();
      },
    });
  });

  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });
}

/* ---------- Hero ---------- */
function initHero() {
  const slides = $$('.hero__slide');
  const dots = $$('.hero__dot');
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
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'power4.inOut' },
    );
    gsap.fromTo(img, { scale: 1.3, xPercent: 8 }, { scale: 1.05, xPercent: 0, duration: 1.7, ease: 'power3.out' });
    drift(img, 1.7);

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === next);
      dot.setAttribute('aria-selected', String(i === next));
    });
    current = next;
  }

  function queue() {
    autoplay?.kill();
    autoplay = gsap.delayedCall(5.5, () => {
      show(current + 1);
      queue();
    });
  }

  dots.forEach((dot, i) =>
    dot.addEventListener('click', () => {
      show(i);
      queue();
    }),
  );

  if (reducedMotion) return;

  const firstImg = slides[0].querySelector('img')!;
  gsap
    .timeline({ defaults: { ease: 'power4.out' }, onComplete: queue })
    .fromTo('.hero__media', { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' }, 0)
    .fromTo(firstImg, { scale: 1.35 }, { scale: 1.05, duration: 2 }, 0)
    .fromTo('[data-hero-line]', { yPercent: 115, y: 0 }, { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.25)
    .to('.hero__underline path', { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 1)
    .fromTo('[data-hero]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.7)
    .fromTo('[data-hero-chip]', { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.18, ease: 'back.out(1.7)' }, 1.3);
  drift(firstImg, 2);

  // Image drifts slower than the page as the hero scrolls away.
  gsap.to('.hero__slide', {
    yPercent: 7,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
}

/* ---------- Scroll reveals ---------- */
function splitWords(el: HTMLElement) {
  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (child.textContent ?? '').split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(' ');
          const mask = document.createElement('span');
          mask.className = 'w-mask';
          const word = document.createElement('span');
          word.className = 'w';
          word.textContent = part;
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
  return $$('.w', el);
}

function initReveals() {
  if (reducedMotion) return;

  $$('[data-split]').forEach((el) => {
    const words = splitWords(el);
    gsap.from(words, {
      yPercent: 115,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.045,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  const compact = window.matchMedia('(max-width: 900px)').matches;
  const from: Record<string, gsap.TweenVars> = compact
    ? {
        left: { y: 32 },
        right: { y: 32 },
        scale: { scale: 0.96, y: 20 },
        up: { y: 32 },
      }
    : {
        left: { x: -56 },
        right: { x: 56 },
        scale: { scale: 0.88, y: 20 },
        up: { y: 44 },
      };
  $$('[data-reveal]').forEach((el) => gsap.set(el, { opacity: 0, ...from[el.dataset.reveal || 'up'] }));

  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        // Hand transforms back to CSS so hover states work.
        clearProps: 'transform,opacity',
      }),
  });

  $$('[data-parallax]').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -Number(el.dataset.parallax) },
      {
        yPercent: Number(el.dataset.parallax),
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    );
  });

  // Phones rise into their panels as the panel scrolls in.
  $$('[data-phone]').forEach((phone) => {
    gsap.from(phone, {
      yPercent: 45,
      ease: 'none',
      scrollTrigger: { trigger: phone.parentElement, start: 'top 95%', end: 'top 30%', scrub: 0.8 },
    });
  });
}

function initCounters() {
  $$('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    if (reducedMotion) return;
    const state = { value: 0 };
    el.textContent = (0).toFixed(decimals);
    gsap.to(state, {
      value: target,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = state.value.toFixed(decimals)),
    });
  });
}

/* ---------- Pointer effects ---------- */
function initPointerEffects() {
  if (reducedMotion || !window.matchMedia('(hover: hover)').matches) return;

  $$('.card').forEach((card) =>
    card.addEventListener('pointermove', (e) => {
      const box = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - box.left}px`);
      card.style.setProperty('--my', `${e.clientY - box.top}px`);
    }),
  );

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
  }

  links.forEach((link) => {
    const name = link.dataset.market!;
    link.addEventListener('pointerenter', () => globe?.focus(name));
    link.addEventListener('focus', () => globe?.focus(name));
    link.addEventListener('pointerleave', () => globe?.blur());
    link.addEventListener('blur', () => globe?.blur());
    link.addEventListener('click', (e) => e.preventDefault());
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
    const button = $('.faq__q', item)!;
    button.addEventListener('click', () => {
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
initHero();
initReveals();
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
