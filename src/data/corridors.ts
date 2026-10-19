// Countries and corridors, from "New Country Corridor Page.pdf".
import { routes } from './site';
import { corridors as corridorMarkets } from './home';

export const hero = {
  title: 'Rails into five of the world’s *top ten* remittance markets',
  text: 'Payfuture moves money into and out of India, Pakistan, Nigeria, the Philippines and Egypt for money transfer operators, banks, fintechs, payroll providers and trading businesses. Recipients get local currency.',
  image: { src: '/img/pages/corridors-hero.webp', alt: 'A woman checking her phone in a busy market' },
};

export const strip = [
  { icon: 'transfer', title: 'In & out', sub: 'remittances in, supplier payments out' },
  { icon: 'route', title: 'End to end', sub: 'from your funds to the recipient' },
  { icon: 'coins', title: 'Fiat or stablecoin rails', sub: 'depending on your jurisdiction' },
  { icon: 'shield', title: 'Compliant', sub: 'KYB and screening on every client' },
];

export const serve = {
  title: 'Corridors we serve',
  text: 'Choose the market you need to move money into or out of. Each corridor page sets out delivery options and the recipient details you’ll need.',
  markets: corridorMarkets,
};

export const whatWeDo = {
  eyebrow: 'What we do',
  title: 'Money in and out, end to end',
  text: 'Remittances and payroll flow into our corridors. Supplier payments flow out. Payfuture’s rails carry both, with local currency at the receiving end.',
  items: [
    {
      icon: 'wallet',
      title: 'Remittance payouts',
      text: 'Deliver money from abroad to bank accounts in our five markets, in local currency.',
      tag: 'In',
    },
    {
      icon: 'users',
      title: 'Mass payouts',
      text: 'Payroll and contractor payments to hundreds or thousands of recipients in one run.',
      tag: 'In',
      href: routes.massPayments,
    },
    {
      icon: 'transfer',
      title: 'Supplier payments',
      text: 'Importers pay suppliers overseas. Exporters receive payment from buyers abroad.',
      tag: 'In & out',
      href: routes.crossBorder,
    },
    {
      icon: 'route',
      title: 'Stablecoin rails',
      text: 'Move money in fiat, or in stablecoins where your jurisdiction allows. Recipients get local currency.',
      tag: 'Fiat or stablecoin',
      href: routes.stablecoin,
    },
  ],
};

export const howItWorks = {
  eyebrow: 'How it works',
  title: 'From your funds to their account',
  items: [
    { title: 'Tell us the corridor', text: 'Pick the market and the direction: money in, money out or both.' },
    { title: 'Send funds in fiat or stablecoins', text: 'Depending on the service available in your jurisdiction.' },
    {
      title: 'We deliver',
      text: 'Recipients get local currency in their bank account. Suppliers overseas are paid by international wire.',
    },
  ],
};

export const explore = {
  eyebrow: 'Corridors',
  title: 'Explore our cross-border payment corridors',
  regions: [
    { id: 'all', label: 'All regions' },
    { id: 'asia', label: 'Asia' },
    { id: 'africa', label: 'Africa' },
    { id: 'latam', label: 'Latin America' },
  ],
  corridors: [
    {
      from: 'China',
      to: 'India',
      fromFlag: '/img/flags/china.svg',
      toFlag: '/img/flags/india.svg',
      codes: 'CNY → INR',
      region: 'asia',
      text: 'Supplier settlements, treasury transfers and B2B payments across the China-India corridor.',
      href: '/corridors-china-to-india-cross-border-payments/',
    },
    {
      from: 'USA',
      to: 'India',
      fromFlag: '/img/flags/usa.svg',
      toFlag: '/img/flags/india.svg',
      codes: 'USD → INR',
      region: 'asia',
      text: 'Vendor, supplier and treasury payments across the USA–India corridor.',
      href: '/corridors-usa-to-india-cross-border-payments/',
    },
  ],
  cta: { label: 'Don’t see your corridor? Talk to us', href: routes.contact },
};

export const stablecoin = {
  eyebrow: 'Optional rails',
  title: 'Stablecoin rails, when you want them',
  paragraphs: [
    'Move money in fiat or stablecoins, depending on the service available in your jurisdiction. Recipients receive local currency either way.',
    'See what’s available to you through our jurisdiction selector.',
  ],
  cta: { label: 'Talk to the team', href: routes.contact },
  card: {
    title: 'One partner. Last-mile delivery.',
    text: 'Payfuture carries money into and out of India, Pakistan, Nigeria, the Philippines and Egypt, end to end. Fiat or stablecoins in, local currency to the recipient.',
    from: 'Fiat / stablecoin in',
    to: 'Local currency out',
  },
};

export const why = {
  eyebrow: 'Why Payfuture',
  title: 'Why remittance businesses choose Payfuture',
  items: [
    { icon: 'store', title: 'Built for emerging markets', text: 'Fiat or stablecoins, depending on your business and jurisdiction.' },
    { icon: 'shield', title: 'Settlement choice', text: 'Fiat or stablecoin options, depending on your business and jurisdiction.' },
    {
      icon: 'transfer',
      title: 'End-to-end flows',
      text: 'From your funds to the recipient’s account, one compliant partner handles every step.',
    },
    {
      icon: 'coins',
      title: 'Local currency for recipients',
      text: 'However you send, recipients are paid in local currency. They never need a crypto wallet.',
    },
  ],
};

export const closing = {
  title: 'Find your corridor',
  text: 'Tell us where money needs to go, in or out, fiat or stablecoin, and we’ll map the corridor with you.',
  cta: { label: 'Speak with our team', href: routes.contact },
};
