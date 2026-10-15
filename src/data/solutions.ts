// Solutions overview, from "Updated solutions page.pdf".
import { routes } from './site';

export const hero = {
  title: 'Enterprise cross-border & *stablecoin payments* for emerging markets',
  text: 'Compliant fiat and stablecoin rails for remittances, payroll and supplier payments across India, Pakistan, Nigeria, the Philippines and Egypt. We handle every step, from your funds to the recipient’s account.',
  cta: { label: 'Talk to our team', href: routes.contact },
};

// `side` puts each label left or right of its pin so neighbours do not collide.
export const mapPins = [
  { name: 'India', code: 'INR', lon: 78.9, lat: 21, side: 'right' as const },
  { name: 'Pakistan', code: 'PKR', lon: 69.3, lat: 30.4, side: 'left' as const },
  { name: 'Nigeria', code: 'NGN', lon: 8.7, lat: 9.1, side: 'left' as const },
  { name: 'Philippines', code: 'PHP', lon: 122, lat: 12.5, side: 'left' as const },
  { name: 'Egypt', code: 'EGP', lon: 30.8, lat: 26.8, side: 'left' as const },
];
export const mapHub = { name: 'London', lon: -0.13, lat: 51.5 };

export const simpler = {
  title: 'A simpler way to move money in and out of emerging markets',
  paragraphs: [
    'Payfuture moves money into and out of India, Pakistan, Nigeria, the Philippines and Egypt for money transfer operators, banks, fintechs, payroll providers and trading businesses.',
    'You send us funds in fiat or stablecoins, depending on what’s available in your jurisdiction. We carry them over our rails and deliver local currency to the recipient.',
    'Delivery options differ by market. Each corridor page shows what’s available and the recipient details you’ll need.',
  ],
  image: { src: '/img/pages/solutions-simpler.webp', alt: 'Glowing currency symbols connected across a network' },
};

export const pillars = [
  { icon: 'clock', title: 'Focused payout corridors', text: 'Payout infrastructure for India, Pakistan, Nigeria, the Philippines and Egypt.' },
  { icon: 'gear', title: 'In and out.', text: 'Remittances flow in and supplier payments flow out, on the same rails.' },
  { icon: 'checkCircle', title: 'Fiat and stablecoin rails', text: 'Move money in fiat, or in stablecoins where your jurisdiction allows.' },
];

export const lastMile = {
  title: 'Built for the last mile',
  paragraphs: [
    'Global payment providers can get money to a border on their own. Getting it into a recipient’s account in Lahore, Lagos or Manila takes last-mile rails and local knowledge.',
    'Payfuture’s rails reach recipients in five corridors and carry payments back out to suppliers overseas. Delivery options depend on the market.',
    'Pick the solution that fits how your money needs to move.',
  ],
  cta: { label: 'Learn more', href: routes.corridors },
  links: [
    { label: 'Stablecoin settlement', href: routes.stablecoin },
    { label: 'Cross-border payments', href: routes.crossBorder },
    { label: 'Global mass payments', href: routes.massPayments },
    { label: 'Currency management', href: '#' },
    { label: 'Local payouts', href: routes.corridors },
  ],
};

export const products = [
  {
    icon: 'wallet',
    title: 'Remittance payouts',
    text: 'Deliver local currency to beneficiaries in Payfuture’s payout corridors. Available delivery methods depend on the market.',
  },
  { icon: 'coins', title: 'FX & liquidity', text: 'See the rate before you confirm a transfer.' },
  {
    icon: 'globe',
    title: 'Fiat and stablecoin rails',
    text: 'Move money in stablecoins where available to your business. Recipients always get local currency.',
    href: routes.stablecoin,
    linkLabel: 'Choose your jurisdiction',
  },
  {
    icon: 'cart',
    title: 'Mass payouts',
    text: 'Payroll and contractor payments in batches, for payroll providers and businesses with teams in our corridors.',
    href: routes.massPayments,
  },
  {
    icon: 'target',
    title: 'Transfer tracking.',
    text: 'A record of every transfer across every corridor, for your operations and finance teams.',
  },
  {
    icon: 'repeat',
    title: 'Supplier payments',
    text: 'Importers pay suppliers overseas and exporters get paid by buyers abroad, through the same rails.',
    href: routes.crossBorder,
  },
];

export const statement =
  'One partner covers remittances, payroll, supplier payments and FX across five corridors, end to end. No stitching providers together market by market.';

export const massPayouts = {
  title: 'Mass payouts into emerging markets',
  text: 'Payroll and contractor payouts to recipients in India, Pakistan, Nigeria, the Philippines and Egypt, for payroll providers and businesses with teams there.',
  links: [
    { label: 'Cross-border payouts', href: routes.crossBorder },
    { label: 'Global Mass Payments', href: routes.massPayments },
    { label: 'Stablecoin Payments', href: routes.stablecoin },
  ],
};

export const youCan = {
  badge: 'With Payfuture you can',
  items: [
    'Send money into and out of five corridors',
    'Move funds in fiat, or in stablecoins where available',
    'Pay recipients in local currency',
  ],
};

export const closing = {
  title: 'Money in and out of five corridors, end to end',
  text: 'Payfuture moves money into and out of India, Pakistan, Nigeria, the Philippines and Egypt on compliant fiat and stablecoin rails. Your recipients get local currency, delivered the way they already get paid.',
  cta: { label: 'Ready to move money across emerging markets?', href: routes.contact },
};
