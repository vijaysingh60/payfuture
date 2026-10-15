// Behaviour for the inner-page building blocks. Each init does nothing when its markup is absent.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover)').matches;
const $ = <T extends HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

/* CSS-driven visuals start when they scroll into view. */
export function initInView() {
  $$('[data-inview]').forEach((el) => {
    if (reducedMotion) return el.classList.add('is-in');
    ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => el.classList.add('is-in') });
  });
}

/* Inner-page hero: words rise, media wipes in, chips pop. */
export function initPageHero() {
  const hero = $('[data-page-hero]');
  if (!hero || reducedMotion) return;

  const img = $('[data-ph-img]', hero);
  gsap
    .timeline({ defaults: { ease: 'power4.out' }, delay: 0.1 })
    // y: 0 stops GSAP keeping the CSS start offset as a fixed pixel shift.
    .fromTo('[data-ph-word]', { yPercent: 120, y: 0 }, { yPercent: 0, duration: 1.1, stagger: 0.06 }, 0)
    .fromTo('[data-ph-fade]', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.35)
    .fromTo(
      '[data-ph-media]',
      { clipPath: 'inset(0% 0% 0% 100% round 32px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.4, ease: 'power4.inOut' },
      0.2,
    )
    .fromTo(img ?? [], { scale: 1.3 }, { scale: 1.05, duration: 2 }, 0.2)
    .fromTo('[data-ph-chip]', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)' }, 1.1)
    // Drop the clip once revealed so chips can hang outside the frame.
    .set('[data-ph-media]', { clipPath: 'none' });

  if (img) {
    gsap.to(img, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}

/* A soft yellow glow follows the pointer inside dark panels. */
export function initGlowAreas() {
  if (reducedMotion || !canHover) return;
  $$('[data-glow-area]').forEach((area) => {
    const glow = $('[data-glow]', area);
    if (!glow) return;
    const xTo = gsap.quickTo(glow, 'x', { duration: 1.2, ease: 'power3.out' });
    const yTo = gsap.quickTo(glow, 'y', { duration: 1.2, ease: 'power3.out' });
    area.addEventListener('pointermove', (e) => {
      const box = area.getBoundingClientRect();
      xTo(e.clientX - box.left);
      yTo(e.clientY - box.top);
    });
  });
}

/* Cards tilt towards the pointer and carry a spotlight. */
export function initTilt() {
  if (reducedMotion || !canHover) return;
  $$('[data-tilt]').forEach((card) => {
    const rx = gsap.quickTo(card, 'rotateX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotateY', { duration: 0.6, ease: 'power3.out' });
    gsap.set(card, { transformPerspective: 900 });
    card.addEventListener('pointermove', (e) => {
      const box = card.getBoundingClientRect();
      const px = (e.clientX - box.left) / box.width - 0.5;
      const py = (e.clientY - box.top) / box.height - 0.5;
      rx(-py * 7);
      ry(px * 9);
      card.style.setProperty('--mx', `${e.clientX - box.left}px`);
      card.style.setProperty('--my', `${e.clientY - box.top}px`);
    });
    card.addEventListener('pointerleave', () => {
      rx(0);
      ry(0);
    });
  });
}

/* Images wipe up into their frames, then drift slightly with scroll. */
export function initClipReveals() {
  if (reducedMotion) return;
  $$('[data-clip]').forEach((frame) => {
    const img = $('[data-clip-img]', frame);
    gsap.fromTo(
      frame,
      { clipPath: 'inset(100% 0% 0% 0% round 32px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 32px)',
        duration: 1.3,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: frame, start: 'top 85%', once: true },
      },
    );
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.25 },
        { scale: 1, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: frame, start: 'top 85%', once: true } },
      );
    }
  });
}

/* Steps: the track fills with scroll and each step lights as the fill reaches it. */
export function initSteps() {
  $$('[data-steps]').forEach((wrap) => {
    const fill = $('[data-steps-fill]', wrap);
    const steps = $$('[data-step]', wrap);
    if (reducedMotion) {
      steps.forEach((s) => s.classList.add('is-on'));
      if (fill) fill.style.transform = 'scaleX(1)';
      return;
    }
    ScrollTrigger.create({
      trigger: wrap,
      start: 'top 75%',
      end: 'bottom 55%',
      scrub: 0.4,
      onUpdate: (self) => {
        if (fill) gsap.set(fill, { scaleX: self.progress });
        // Step i lights once the fill passes its node, which sits at i/(n-1) along the track.
        steps.forEach((s, i) => s.classList.toggle('is-on', self.progress >= i / Math.max(1, steps.length - 1) - 0.02));
      },
    });
  });
}

/* Tabs: click or arrow keys to switch; auto-advance while in view, paused on hover. */
export function initTabs() {
  $$('[data-tabs]').forEach((root) => {
    const tabs = $$('[role="tab"]', root);
    const panels = $$('[role="tabpanel"]', root);
    let current = 0;
    let inView = false;
    const ms = 7000;
    root.style.setProperty('--tab-ms', `${ms}ms`);

    const show = (next: number, focus = false) => {
      if (next === current) return;
      tabs[current].classList.remove('is-active');
      tabs[current].setAttribute('aria-selected', 'false');
      tabs[current].tabIndex = -1;
      panels[current].classList.remove('is-active');
      panels[current].hidden = true;

      current = next;
      const tab = tabs[current];
      const panel = panels[current];
      // Restart the progress bar animation.
      tab.classList.remove('is-active');
      void tab.offsetWidth;
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      tab.tabIndex = 0;
      if (focus) tab.focus();
      panel.hidden = false;
      panel.classList.add('is-active');

      if (!reducedMotion) {
        gsap.fromTo(
          $('.tabs__media', panel),
          { clipPath: 'inset(0% 100% 0% 0% round 26px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 26px)', duration: 0.9, ease: 'power4.inOut' },
        );
        gsap.fromTo($('.tabs__media img', panel), { scale: 1.2 }, { scale: 1, duration: 1.4, ease: 'power3.out' });
        gsap.fromTo($$('.tabs__copy > *', panel), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' });
      }
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => show(i));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          show((current + 1) % tabs.length, true);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          show((current - 1 + tabs.length) % tabs.length, true);
        }
      });
      // The bar finishing is the cue to advance.
      tab.querySelector('.tabs__bar i')?.addEventListener('animationend', () => {
        if (i === current && inView) show((current + 1) % tabs.length);
      });
    });

    const setPlay = (play: boolean) => root.style.setProperty('--tab-play', play ? 'running' : 'paused');
    if (reducedMotion) {
      setPlay(false);
      return;
    }
    setPlay(false);
    ScrollTrigger.create({
      trigger: root,
      start: 'top 75%',
      end: 'bottom 20%',
      onToggle: (self) => {
        inView = self.isActive;
        setPlay(inView);
      },
    });
    root.addEventListener('pointerenter', () => setPlay(false));
    root.addEventListener('pointerleave', () => setPlay(inView));
  });
}

/* Corridor finder: search plus region filters. */
export function initCorridorFinder() {
  $$('[data-finder]').forEach((root) => {
    const input = $<HTMLInputElement>('[data-finder-search]', root);
    const filters = $$('[data-region]', $('.finder__filters', root) ?? root);
    const cards = $$('[data-corridor]', root);
    const empty = $('[data-finder-empty]', root);
    let region = 'all';

    const apply = () => {
      const q = (input?.value ?? '').trim().toLowerCase();
      const shown = cards.filter((card) => {
        const ok = (region === 'all' || card.dataset.region === region) && (!q || card.dataset.search!.includes(q));
        card.hidden = !ok;
        return ok;
      });
      if (empty) empty.hidden = shown.length > 0;
      if (!reducedMotion && shown.length) {
        gsap.fromTo(shown, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', overwrite: true, clearProps: 'transform,opacity' });
      }
    };

    input?.addEventListener('input', apply);
    filters.forEach((btn) =>
      btn.addEventListener('click', () => {
        region = btn.dataset.region!;
        filters.forEach((b) => {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        apply();
      }),
    );
  });
}

/* Stablecoin flow: on wide screens the section pins and a token travels the four stages. */
export function initCoinFlow() {
  const root = $('[data-coinflow]');
  if (!root) return;
  const token = $('[data-coinflow-token]', root)!;
  const labels = $$('b', token);
  const fill = $('[data-coinflow-fill]', root);
  const stations = $$('[data-coinflow-station]', root);
  const cards = $$('[data-coinflow-card]', root);
  const n = cards.length;

  const render = (p: number) => {
    // Stage s is reached when the token passes station s at s/(n-1) of the rail.
    const pos = p * (n - 1);
    const reached = Math.floor(pos + 0.001);
    gsap.set(token, { left: `${p * 100}%` });
    if (fill) gsap.set(fill, { scaleX: p });
    stations.forEach((s, i) => s.classList.toggle('is-passed', i <= reached && p > 0));
    cards.forEach((c, i) => {
      c.classList.toggle('is-active', i === Math.min(reached, n - 1));
      c.classList.toggle('is-done', i < reached);
    });
    // Label 0 before the first station, label i+1 after station i, and the last once everything is done.
    const labelIndex = p >= 0.999 ? labels.length - 1 : p === 0 ? 0 : Math.min(labels.length - 2, reached + 1);
    labels.forEach((l, i) => l.classList.toggle('is-on', i === labelIndex));
  };

  if (reducedMotion) {
    render(1);
    return;
  }

  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    const state = { p: 0 };
    render(0);
    gsap.to(state, {
      p: 1,
      ease: 'none',
      onUpdate: () => render(state.p),
      scrollTrigger: {
        trigger: root.closest('section') ?? root,
        start: 'top top',
        end: '+=160%',
        scrub: 0.6,
        pin: true,
      },
    });
  });
  mm.add('(max-width: 900px)', () => {
    // No rail on small screens: light each card as it scrolls in.
    cards.forEach((c) =>
      ScrollTrigger.create({ trigger: c, start: 'top 70%', onEnter: () => c.classList.add('is-active'), onLeaveBack: () => c.classList.remove('is-active') }),
    );
  });
}

/* Mass payments: each capability moves the sticky batch panel to its stage. */
export function initBatch() {
  const root = $('[data-batch]');
  if (!root) return;
  const panel = $('[data-batch-panel]', root)!;
  const label = $('[data-batch-label]', root);
  const steps = $$('[data-batch-step]', root);
  const names = ['Queued', 'Converting', 'Screening', 'Settling', 'Settled'];

  const setStage = (i: number) => {
    panel.dataset.stage = String(i);
    if (label) label.textContent = names[i];
    steps.forEach((s, j) => s.classList.toggle('is-active', j === i));
  };

  if (reducedMotion) return setStage(steps.length - 1);

  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    steps.forEach((step, i) =>
      ScrollTrigger.create({
        trigger: step,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setStage(i),
      }),
    );
  });
  mm.add('(max-width: 900px)', () => {
    // Panel sits above the list on small screens; play the stages through once it is seen.
    ScrollTrigger.create({
      trigger: panel,
      start: 'top 75%',
      once: true,
      onEnter: () => steps.forEach((_, i) => gsap.delayedCall(i * 0.9, () => setStage(i))),
    });
  });
}
