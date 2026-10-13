import { geoDistance, geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import gsap from 'gsap';
import landTopo from 'world-atlas/land-110m.json';

export interface Market {
  name: string;
  lon: number;
  lat: number;
}

interface Arc {
  from: Market;
  to: Market;
  start: number;
}

const NAVY = '22, 58, 77';
const YELLOW = '#f7eb01';
const ARC_MS = 2600;
// Only the top of the sphere is on screen, so tilt it to bring the markets into that dome.
const TILT = 32;

export function initGlobe(canvas: HTMLCanvasElement, markets: Market[], reducedMotion: boolean) {
  const ctx = canvas.getContext('2d')!;
  const land = feature(landTopo as any, (landTopo as any).objects.land);
  const graticule = geoGraticule10();
  const projection = geoOrthographic().clipAngle(90).precision(0.6);
  const path = geoPath(projection, ctx);

  const view = { lon: 55, lat: -TILT + 12 };
  let active: Market | null = null;
  let auto = true;
  let autoClock = 0;
  let size = 0;
  let dpr = 1;
  let visible = false;
  let last = 0;
  let arcs: Arc[] = [];
  let resume: gsap.core.Tween | null = null;

  const autoLon = () => 55 + 42 * Math.sin(autoClock / 9000);

  function resize() {
    size = canvas.clientWidth;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = canvas.height = Math.round(size * dpr);
    projection.scale(size / 2 - 2).translate([size / 2, size / 2]);
  }

  const onFront = (m: Market) => geoDistance([m.lon, m.lat], [view.lon, view.lat]) < Math.PI / 2 - 0.06;

  function spawnArc(now: number) {
    const front = markets.filter(onFront);
    if (front.length < 2) return;
    const from = front[Math.floor(Math.random() * front.length)];
    const others = front.filter((m) => m !== from);
    arcs.push({ from, to: others[Math.floor(Math.random() * others.length)], start: now });
  }

  function drawArc(arc: Arc, now: number) {
    const t = (now - arc.start) / ARC_MS;
    const head = Math.min(1, t * 1.25);
    const tail = Math.max(0, t * 1.25 - 0.45);
    const lerp = geoInterpolate([arc.from.lon, arc.from.lat], [arc.to.lon, arc.to.lat]);
    const coords = [];
    for (let i = 0; i <= 24; i++) coords.push(lerp(tail + ((head - tail) * i) / 24));

    ctx.beginPath();
    path({ type: 'LineString', coordinates: coords });
    ctx.strokeStyle = `rgba(${NAVY}, ${0.55 * (1 - Math.max(0, t - 0.8) * 5)})`;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    const p = projection(lerp(head));
    if (p && t < 0.8) {
      ctx.beginPath();
      ctx.arc(p[0], p[1], 3.5, 0, Math.PI * 2);
      ctx.fillStyle = YELLOW;
      ctx.fill();
      ctx.strokeStyle = `rgb(${NAVY})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  function draw(now: number) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    projection.rotate([-view.lon, -view.lat]);

    const r = size / 2;
    const fill = ctx.createRadialGradient(r, r * 0.5, r * 0.1, r, r, r);
    fill.addColorStop(0, '#fbfcfd');
    fill.addColorStop(1, '#eff3f6');
    ctx.beginPath();
    path({ type: 'Sphere' });
    ctx.fillStyle = fill;
    ctx.fill();

    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = `rgba(${NAVY}, 0.045)`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    path(land);
    ctx.fillStyle = '#e2e9ed';
    ctx.fill();

    arcs = arcs.filter((a) => now - a.start < ARC_MS);
    arcs.forEach((a) => drawArc(a, now));

    markets.forEach((m, i) => {
      if (!onFront(m)) return;
      const p = projection([m.lon, m.lat]);
      if (!p) return;
      const isActive = m === active;
      const pulse = (now / 1800 + i * 0.37) % 1;

      ctx.beginPath();
      ctx.arc(p[0], p[1], 6 + pulse * (isActive ? 34 : 18), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${NAVY}, ${(1 - pulse) * (isActive ? 0.7 : 0.35)})`;
      ctx.lineWidth = isActive ? 2 : 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(p[0], p[1], isActive ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = YELLOW;
      ctx.fill();
      ctx.strokeStyle = `rgb(${NAVY})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  function frame(now: number) {
    if (!visible) return;
    const dt = Math.min(64, now - (last || now));
    last = now;
    if (auto) {
      autoClock += dt;
      view.lon = autoLon();
    }
    if (arcs.length < 3 && Math.random() < 0.02) spawnArc(now);
    draw(now);
    requestAnimationFrame(frame);
  }

  function focus(name: string) {
    const m = markets.find((x) => x.name === name);
    if (!m) return;
    resume?.kill();
    auto = false;
    active = m;
    gsap.to(view, { lon: m.lon, lat: Math.max(-62, m.lat - TILT), duration: 1.1, ease: 'power3.inOut', overwrite: true });
  }

  function blur() {
    active = null;
    resume = gsap.to(view, {
      lon: autoLon(),
      lat: -TILT + 12,
      duration: 1.4,
      delay: 0.5,
      ease: 'power2.inOut',
      overwrite: true,
      onComplete: () => (auto = true),
    });
  }

  resize();
  window.addEventListener('resize', resize);

  if (reducedMotion) {
    draw(0);
    return { focus: () => {}, blur: () => {} };
  }

  new IntersectionObserver(([entry]) => {
    const was = visible;
    visible = entry.isIntersecting;
    if (visible && !was) {
      last = 0;
      requestAnimationFrame(frame);
    }
  }).observe(canvas);

  return { focus, blur };
}
