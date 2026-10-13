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

const YELLOW = '#f7eb01';
const NAVY = '#163a4d';
const ARC_MS = 2400;
const REST_LAT = 14;

export function initGlobe(canvas: HTMLCanvasElement, markets: Market[], reducedMotion: boolean) {
  const ctx = canvas.getContext('2d')!;
  const land = feature(landTopo as any, (landTopo as any).objects.land);
  const graticule = geoGraticule10();
  const projection = geoOrthographic().clipAngle(90).precision(0.6);
  const path = geoPath(projection, ctx);

  const view = { lon: 55, lat: REST_LAT };
  let active: Market | null = null;
  let auto = true;
  let autoClock = 0;
  let size = 0;
  let dpr = 1;
  let visible = false;
  let last = 0;
  let arcs: Arc[] = [];
  let resume: gsap.core.Tween | null = null;

  // Sway across the longitudes where the markets are, rather than a full spin past empty ocean.
  const autoLon = () => 55 + 48 * Math.sin(autoClock / 8000);

  function resize() {
    size = canvas.clientWidth;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.height = Math.round(size * dpr);
    projection.scale(size / 2 - 4).translate([size / 2, size / 2]);
  }

  const onFront = (m: Market) => geoDistance([m.lon, m.lat], [view.lon, view.lat]) < Math.PI / 2 - 0.08;

  function spawnArc(now: number) {
    const front = markets.filter(onFront);
    if (front.length < 2) return;
    const from = active && onFront(active) ? active : front[Math.floor(Math.random() * front.length)];
    const others = front.filter((m) => m !== from);
    arcs.push({ from, to: others[Math.floor(Math.random() * others.length)], start: now });
  }

  function drawArc(arc: Arc, now: number) {
    const t = (now - arc.start) / ARC_MS;
    const head = Math.min(1, t * 1.25);
    const tail = Math.max(0, t * 1.25 - 0.5);
    const lerp = geoInterpolate([arc.from.lon, arc.from.lat], [arc.to.lon, arc.to.lat]);
    const coords = [];
    for (let i = 0; i <= 24; i++) coords.push(lerp(tail + ((head - tail) * i) / 24));

    ctx.beginPath();
    path({ type: 'LineString', coordinates: coords });
    ctx.strokeStyle = `rgba(247, 235, 1, ${0.85 * (1 - Math.max(0, t - 0.8) * 5)})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    const p = projection(lerp(head));
    if (p && t < 0.8) {
      ctx.beginPath();
      ctx.arc(p[0], p[1], 4, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    }
  }

  function drawLabel(x: number, y: number, text: string) {
    ctx.font = '700 14px "Montserrat Variable", Montserrat, sans-serif';
    const w = ctx.measureText(text).width + 28;
    const h = 32;
    const top = y - 58;
    ctx.beginPath();
    ctx.roundRect(x - w / 2, top, w, h, h / 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x - 6, top + h - 1);
    ctx.lineTo(x, top + h + 7);
    ctx.lineTo(x + 6, top + h - 1);
    ctx.fill();
    ctx.fillStyle = NAVY;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, top + h / 2 + 1);
  }

  function draw(now: number) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    projection.rotate([-view.lon, -view.lat]);

    const r = size / 2;
    const fill = ctx.createRadialGradient(r * 0.7, r * 0.6, r * 0.05, r, r, r);
    fill.addColorStop(0, '#0d6079');
    fill.addColorStop(1, '#012b38');
    ctx.beginPath();
    path({ type: 'Sphere' });
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    path(land);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.13)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    arcs = arcs.filter((a) => now - a.start < ARC_MS);
    arcs.forEach((a) => drawArc(a, now));

    let label: [number, number] | null = null;
    markets.forEach((m, i) => {
      if (!onFront(m)) return;
      const p = projection([m.lon, m.lat]);
      if (!p) return;
      const isActive = m === active;
      const pulse = (now / 1800 + i * 0.37) % 1;

      ctx.beginPath();
      ctx.arc(p[0], p[1], 6 + pulse * (isActive ? 40 : 20), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(247, 235, 1, ${(1 - pulse) * (isActive ? 0.9 : 0.5)})`;
      ctx.lineWidth = isActive ? 2 : 1.2;
      ctx.stroke();

      ctx.save();
      ctx.shadowColor = YELLOW;
      ctx.shadowBlur = isActive ? 26 : 14;
      ctx.beginPath();
      ctx.arc(p[0], p[1], isActive ? 9 : 5.5, 0, Math.PI * 2);
      ctx.fillStyle = YELLOW;
      ctx.fill();
      ctx.restore();

      if (isActive) label = [p[0], p[1]];
    });
    if (label && active) drawLabel(label[0], label[1], (active as Market).name);
  }

  function frame(now: number) {
    if (!visible) return;
    const dt = Math.min(64, now - (last || now));
    last = now;
    if (auto) {
      autoClock += dt;
      view.lon = autoLon();
    }
    if (arcs.length < 4 && Math.random() < 0.03) spawnArc(now);
    draw(now);
    requestAnimationFrame(frame);
  }

  function focus(name: string) {
    const m = markets.find((x) => x.name === name);
    if (!m) return;
    resume?.kill();
    auto = false;
    active = m;
    gsap.to(view, { lon: m.lon, lat: m.lat - 8, duration: 1.1, ease: 'power3.inOut', overwrite: true });
  }

  function blur() {
    active = null;
    resume = gsap.to(view, {
      lon: autoLon(),
      lat: REST_LAT,
      duration: 1.4,
      delay: 0.6,
      ease: 'power2.inOut',
      overwrite: true,
      onComplete: () => (auto = true),
    });
  }

  resize();
  new ResizeObserver(resize).observe(canvas);

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
