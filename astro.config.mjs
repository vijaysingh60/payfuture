import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL when deploying (for example https://www.payfuture.net). It drives canonical tags, the sitemap and social cards.
const site = process.env.SITE_URL ?? 'https://www.payfuture.net';

export default defineConfig({
  site,
  server: { port: 4321 },
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  // Retired addresses from the old WordPress site point at their closest equivalent here.
  redirects: {
    '/our-global-reach': '/countries-and-payment-corridors/',
    '/event-pages': '/newsroom/events/',
    '/countries/online-payment-methods-in-pakistan': '/countries/pakistan/',
    '/countries/online-payment-gateway-in-bangladesh': '/countries/bangladesh/',
    '/expand-to-india': '/countries/india/',
    '/expand-to-egypt': '/countries/egypt/',
    '/expand-to-south-africa': '/countries/south-africa/',
    '/pakistan-payments-guide': '/countries/pakistan/',
    '/your-resource-is-on-its-way-india': '/countries/india/',
    '/youre-one-step-closer-to-entering-egypt': '/countries/egypt/',
    '/youre-one-step-closer-to-entering-pakistan': '/countries/pakistan/',
    '/youre-one-step-closer-to-entering-south-africa': '/countries/south-africa/',
    '/subscribe-to-reach': '/newsroom/',
    // Old article address still linked from inside other articles.
    '/newsroom/the-new-economics-of-cross-border-payments-what-enterprises-need-to-know-in-2026': '/newsroom/new-economics-cross-border-payments-2026/',
    '/thank-you': '/contact/',
    '/thank-you-newsletter': '/newsroom/',
  },
  vite: {
    // These load on demand (globe, Lottie) or only on some pages. Pre-bundling them at startup stops the dev
    // server from re-optimising mid-session, which otherwise breaks the globe with "504 Outdated Optimize Dep".
    optimizeDeps: {
      include: ['d3-geo', 'topojson-client', '@lottiefiles/dotlottie-web', 'gsap', 'gsap/ScrollTrigger', 'lenis'],
    },
  },
});
