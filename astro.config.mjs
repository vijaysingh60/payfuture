import { defineConfig } from 'astro/config';

export default defineConfig({
  server: { port: 4321 },
  devToolbar: { enabled: false },
  vite: {
    // These load on demand (globe, Lottie) or only on some pages. Pre-bundling them at startup stops the dev
    // server from re-optimising mid-session, which otherwise breaks the globe with "504 Outdated Optimize Dep".
    optimizeDeps: {
      include: ['d3-geo', 'topojson-client', 'world-atlas/land-110m.json', '@lottiefiles/dotlottie-web', 'gsap', 'gsap/ScrollTrigger', 'lenis'],
    },
  },
});
