// Homepage content, from "New Home Page Copy.pdf".
// In the full build this comes from the CMS.

export const hero = {
  eyebrow: 'The last mile of global remittance',
  text: 'Global money transfer operators use Payfuture’s rails to move money into India, Pakistan, Nigeria, the Philippines and Egypt, from FX to the recipient’s account. Fund us in fiat or stablecoins, and we take it the rest of the way.',
};

// Business-to-business story: a sender funds in fiat or stablecoin, then businesses in each market are paid
// in local currency. `chip` is the small card that rides over the photo and changes with each slide.
export const heroSlides = [
  {
    src: '/img/hero/dubai-treasury.webp',
    alt: 'A trader at a treasury desk in Dubai at dusk, watching rates on several monitors',
    chip: { title: 'Funds received', sub: 'Fiat or stablecoin' },
  },
  {
    src: '/img/hero/mumbai-operations.webp',
    alt: 'A team lead helps an analyst on a payments operations floor in Mumbai at night',
    chip: { title: 'Paid in INR', sub: 'Local banking partner' },
  },
  {
    src: '/img/hero/kenya-exporter.webp',
    alt: 'A flower exporter and a logistics coordinator walk through a rose greenhouse near Lake Naivasha',
    chip: { title: 'Exporter paid', sub: 'Supplier payment' },
  },
  {
    src: '/img/hero/lahore-partner.webp',
    alt: 'Three senior colleagues in discussion in a boardroom in Lahore',
    chip: { title: 'Paid in PKR', sub: 'Partner bank' },
  },
  {
    src: '/img/hero/cairo-fintech.webp',
    alt: 'A compliance lead at a standing desk in an open-plan fintech office in Cairo',
    chip: { title: 'Paid in EGP', sub: 'KYB and screening' },
  },
  {
    src: '/img/hero/rosario-trade.webp',
    alt: 'An exporter and a port agent walk past grain silos beside a river barge in Rosario at sunset',
    chip: { title: 'Trade settled', sub: 'Importer to exporter' },
  },
];

// Tight 2:1 crops for the photo pills inside the headline.
export const heroPills = {
  a: ['/img/pills/london-treasury.webp', '/img/pills/compliance.webp', '/img/pills/kenya-flowers.webp'],
  b: ['/img/pills/lahore-meeting.webp', '/img/pills/dubai-desk.webp', '/img/pills/mumbai-floor.webp'],
};

export const trust = {
  title: 'Trusted by international payment and remittance businesses',
  logos: [
    { src: '/img/logos/APA.svg', name: 'APA' },
    { src: '/img/logos/Faster-Payments.svg', name: 'Faster Payments' },
    { src: '/img/logos/Unigox.svg', name: 'Unigox' },
    { src: '/img/logos/Tamatem-1.svg', name: 'Tamatem' },
  ],
};

export const features = [
  {
    icon: 'globe',
    title: 'The last mile, end to end',
    text: 'We carry money the final stretch into India, Pakistan, Nigeria, the Philippines and Egypt, to bank accounts in each market and UPI in India.',
  },
  {
    icon: 'gear',
    title: 'Money in and out.',
    text: 'Remittances flow into our corridors and supplier payments flow out of them. The same rails carry both.',
  },
  {
    icon: 'transfer',
    title: 'Fiat and stablecoin rails',
    text: 'Move money in fiat or stablecoins, depending on where your business is based. Recipients are paid in local currency either way.',
  },
  {
    icon: 'headset',
    title: 'One compliant partner, end to end.',
    text: 'From the moment your funds reach us to the moment the recipient is paid, you deal with one counterparty.',
  },
];

// lon/lat place each market on the globe. `corridor` marks the five core corridors.
export const markets = [
  { name: 'India', flag: '/img/flags/india.svg', currency: 'INR', lon: 78.9, lat: 21, corridor: true },
  { name: 'Philippines', flag: '/img/flags/philippines.png', currency: 'PHP', lon: 122, lat: 12.5, corridor: true },
  { name: 'Egypt', flag: '/img/flags/egypt.svg', currency: 'EGP', lon: 30.8, lat: 26.8, corridor: true },
  { name: 'Nigeria', flag: '/img/flags/nigeria.svg', currency: 'NGN', lon: 8.7, lat: 9.1, corridor: true },
  { name: 'Pakistan', flag: '/img/flags/pakistan.svg', currency: 'PKR', lon: 69.3, lat: 30.4, corridor: true },
  { name: 'South Africa', flag: '/img/flags/south-africa.svg', currency: 'ZAR', lon: 24, lat: -29, corridor: false },
];

export const corridors = markets.filter((m) => m.corridor);

export const reach = {
  title: 'Five corridors. Some of the world’s largest.',
  text: 'Four of our five corridors rank in the global top six for remittance inflows. Pick a market to see payout methods and what you’ll need to send.',
};

export const why = {
  eyebrow: 'Why Payfuture',
  title: 'Where global money meets last-mile rails',
  text: 'Money sent from abroad still has to land in a local bank account, in local currency, through a compliant route. Money leaving these markets to pay a supplier overseas faces the same problem in reverse. Payfuture’s rails handle both directions in India, Pakistan, Nigeria, the Philippines and Egypt.',
};

export const useCases = {
  title: 'What you can do with Payfuture',
  text: 'Remittances and payroll in, supplier payments out. All of it runs on the same fiat and stablecoin rails.',
  items: [
    {
      title: 'Remittance payouts.',
      text: 'Deliver money to recipients in our five corridors, in local currency.',
      cta: 'Learn more',
    },
    {
      title: 'Fiat and stablecoin rails.',
      text: 'Move funds in fiat or stablecoins, depending on your jurisdiction. Recipients always get local currency.',
      cta: 'Choose your jurisdiction',
    },
    {
      title: 'Mass payouts',
      text: 'Pay hundreds or thousands of people in one run, for payroll providers and businesses with teams in our corridors.',
      cta: 'Learn more',
    },
  ],
};

export const who = {
  title: 'Who we work with.',
  text: 'The businesses that move money into and out of our corridors, end to end.',
  items: [
    { name: 'Money transfer operators', img: '/img/who/money-transfer-operators.webp' },
    { name: 'Banks and fintechs', img: '/img/who/banks-fintechs.webp' },
    { name: 'Businesses paying people', img: '/img/who/businesses-paying-people.webp' },
    { name: 'Contractor payments', img: '/img/who/contractor-payments.webp' },
    { name: 'Remittance Providers', img: '/img/who/remittance-providers.webp' },
    { name: 'Global payment networks and aggregators', img: '/img/who/payment-networks.webp' },
  ],
  partnersTitle: 'Partner with us. Refer a client, or bring us a corridor you need covered.',
  partners: [
    { name: 'Acquirers', icon: '/img/icons/partner-3.svg' },
    { name: 'Referral Partners and Agents', icon: '/img/icons/partner-4.svg' },
  ],
};

export const growth = {
  title: 'Turn complex markets into growth opportunities',
  text: 'Remittances into our five markets are some of the largest money flows in the world. Connect once and deliver local currency into all of them.',
  stats: [
    { value: 250, decimals: 0, suffix: '+', label: 'Global Merchants' },
    { value: 2.5, decimals: 1, suffix: 'bn+', label: 'Potential Shoppers' },
    { value: 4, decimals: 0, suffix: '', label: 'Continents Covered' },
  ],
  // Ticker runs the solution names from "Explore our solutions".
  ticker: ['Remittance payouts', 'FX', 'Supplier payments', 'Mass payouts', 'Fiat and stablecoin rails', 'Compliant rails'],
};

export const moneyInOut = {
  title: 'Money in. Money out.',
  text: 'Remittance is only half the story. Businesses in our markets also pay suppliers abroad and get paid by buyers overseas. Payfuture’s rails carry money in both directions.',
  items: [
    { dir: 'In', text: 'remittances from abroad, delivered in local currency.' },
    { dir: 'In', text: 'payments from overseas buyers to exporters.' },
    { dir: 'Out', text: 'importers paying suppliers overseas.' },
    { dir: 'Both ways', text: 'oil and gas traders moving money for imports and exports.' },
  ],
  cta: 'Overcome challenges in emerging markets',
};

import { routes } from './site';

export const solutions = {
  title: 'Explore our solutions',
  left: [
    { icon: 'upload', title: 'Remittance payouts.', text: 'Money from abroad, delivered to recipients in local currency.', href: routes.corridors },
    { icon: 'globe', title: 'FX', text: 'See the rate before you confirm a transfer.', href: routes.solutions },
    {
      icon: 'upload',
      title: 'Supplier payments',
      text: 'Importers pay suppliers overseas and exporters get paid by buyers abroad, on the same rails.',
      href: routes.crossBorder,
    },
  ],
  right: [
    { icon: 'pin', title: 'Mass payouts', text: 'Payroll and contractor payments into our corridors, sent in batches.', href: routes.massPayments },
    {
      icon: 'checkCircle',
      title: 'Fiat and stablecoin rails',
      text: 'Move money in stablecoins where your jurisdiction allows. Choose your jurisdiction to see what applies.',
      href: routes.stablecoin,
    },
    {
      icon: 'pin',
      title: 'Compliant rails',
      text: 'Every client is onboarded through KYB and every transfer is screened before it moves.',
      href: routes.solutions,
    },
  ],
};

// Only the first answer is in the copy deck; the other four are drafted from copy elsewhere on the page.
export const faqs = [
  {
    q: 'What is Payfuture?',
    a: 'Payfuture provides compliant fiat and stablecoin rails for money moving into and out of emerging markets. We cover India, Pakistan, Nigeria, the Philippines and Egypt, end to end, for money transfer operators, banks, fintechs, payroll providers and trading businesses.',
  },
  {
    q: 'What can businesses do with Payfuture?',
    a: 'Pay out remittances to recipients in local currency, send mass payouts for payroll and contractors, and make or receive supplier payments. All of it runs on the same fiat and stablecoin rails.',
  },
  {
    q: 'Which corridors does Payfuture support?',
    a: 'India, Pakistan, Nigeria, the Philippines and Egypt. Four of our five corridors rank in the global top six for remittance inflows.',
  },
  {
    q: 'Can I settle in fiat or stablecoins?',
    a: 'Yes. You can fund us in fiat or stablecoins, depending on where your business is based and what your jurisdiction allows. Recipients are paid in local currency either way.',
  },
  {
    q: 'Who is Payfuture for?',
    a: 'Money transfer operators, banks and fintechs, businesses paying people and contractors, remittance providers, and global payment networks and aggregators.',
  },
];
