// Site-wide navigation and footer. Paths match the live site's URLs.

export const routes = {
  home: '/',
  solutions: '/solutions/',
  massPayments: '/solutions/global-mass-payments/',
  stablecoin: '/solutions/stablecoin-cross-border-payments/',
  crossBorder: '/solutions/cross-border-payments/',
  about: '/about-us/',
  corridors: '/countries-and-payment-corridors/',
  contact: '/contact/',
  careers: '/careers/',
  newsroom: '/newsroom/',
  privacy: '/privacy-policy/',
  cookies: '/cookies/',
  terms: '/terms-and-conditions/',
  security: '/payment-security/',
  country: (slug: string) => `/countries/${slug}/`,
};

export interface Link {
  label: string;
  href: string;
}

const slugOf = (label: string) => label.toLowerCase().replace(/\s+/g, '-');

const solutions: Link[] = [
  { label: 'Solutions overview', href: routes.solutions },
  { label: 'Cross-border payments', href: routes.crossBorder },
  { label: 'Global mass payments', href: routes.massPayments },
  { label: 'Stablecoin solutions', href: routes.stablecoin },
  ...[
    'Pay-ins',
    'Payouts',
    'Real-time payments',
    'Currency management',
    'Smart routing and cascading',
    'Authorisation optimisation',
    'Fraud and risk management',
    'Reconciliation management',
    'Reporting and analytics',
    'Banking services',
    'Recovery',
  ].map((label) => ({ label, href: `/solutions/${slugOf(label)}/` })),
];

const countryLink = (label: string): Link => ({ label, href: routes.country(slugOf(label)) });

const countries: Link[] = [
  { label: 'Countries and corridors', href: routes.corridors },
  ...['India', 'Pakistan', 'Nigeria', 'Philippines', 'Egypt', 'Kenya', 'Brazil', 'Argentina', 'Mexico', 'Morocco', 'South Africa', 'Bangladesh'].map(countryLink),
];

const industries: Link[] = [
  { label: 'All industries', href: '/industries/' },
  ...['Video gaming', 'E-learning', 'Streaming', 'Remittance providers', 'Travel agencies', 'Partners'].map((label) => ({ label, href: `/industries/${slugOf(label)}/` })),
];

const company: Link[] = [
  { label: 'About Us', href: routes.about },
  { label: 'Careers', href: routes.careers },
  { label: 'Newsroom', href: routes.newsroom },
  { label: 'Events', href: `${routes.newsroom}events/` },
  { label: 'Contact', href: routes.contact },
];

export const nav = [
  { label: 'Solutions', href: routes.solutions, links: solutions },
  { label: 'Countries', href: routes.corridors, links: countries },
  { label: 'Industries', href: '/industries/', links: industries },
  { label: 'Company', href: routes.about, links: company },
];

export const legal: Link[] = [
  { label: 'Privacy', href: routes.privacy },
  { label: 'Cookies', href: routes.cookies },
  { label: 'Terms and conditions', href: routes.terms },
  { label: 'Payment security', href: routes.security },
];

export const footer = {
  columns: [
    { title: 'Solutions', wide: true, links: solutions },
    { title: 'Countries', links: countries },
    { title: 'Industries', links: industries },
    { title: 'Company', links: company },
  ],
  socials: [
    { name: 'LinkedIn', icon: '/img/icons/linkedin.svg', href: 'https://www.linkedin.com/company/payfuture/' },
    { name: 'Instagram', icon: '/img/icons/instagram.svg', href: 'https://www.instagram.com/payfuture/' },
    { name: 'YouTube', icon: '/img/icons/youtube.svg', href: 'https://www.youtube.com/@payfuture' },
  ],
  email: 'contact@payfuture.net',
};
