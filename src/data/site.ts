// Site-wide navigation and footer. Paths match the live site's URLs.

export const routes = {
  home: '/',
  solutions: '/solutions/',
  massPayments: '/solutions/global-mass-payments/',
  stablecoin: '/solutions/stablecoin-cross-border-payments/',
  crossBorder: '/solutions/cross-border-payments/',
  about: '/about-us/',
  corridors: '/countries-and-payment-corridors/',
  contact: '#get-started',
};

export interface Link {
  label: string;
  href: string;
}

// Pages not yet built in this demo point nowhere for now.
const todo = (label: string): Link => ({ label, href: '#' });

const solutions: Link[] = [
  { label: 'Solutions overview', href: routes.solutions },
  { label: 'Cross-border payments', href: routes.crossBorder },
  { label: 'Global mass payments', href: routes.massPayments },
  { label: 'Stablecoin solutions', href: routes.stablecoin },
  todo('Pay-ins'),
  todo('Payouts'),
  todo('Real-time payments'),
  todo('Currency management'),
  todo('Smart routing and cascading'),
  todo('Authorisation optimisation'),
  todo('Fraud and risk management'),
  todo('Reconciliation management'),
  todo('Reporting and analytics'),
  todo('Banking services'),
  todo('Recovery'),
];

const countries: Link[] = [
  { label: 'Countries and corridors', href: routes.corridors },
  ...['Argentina', 'India', 'South Africa', 'Brazil', 'Nigeria', 'Pakistan', 'Egypt'].map(todo),
];

const industries: Link[] = ['Video Gaming', 'E-learning', 'Streaming', 'Remittance providers', 'Travel agencies', 'Partners'].map(todo);

const company: Link[] = [{ label: 'About Us', href: routes.about }, ...['Careers', 'Newsroom', 'Events'].map(todo)];

export const nav = [
  { label: 'Solutions', href: routes.solutions, links: solutions },
  { label: 'Countries', href: routes.corridors, links: countries },
  { label: 'Industries', href: '#', links: industries },
  { label: 'Company', href: routes.about, links: company },
];

export const footer = {
  columns: [
    { title: 'Solutions', wide: true, links: solutions },
    { title: 'Countries', links: countries },
    { title: 'Industries', links: industries },
    { title: 'Company', links: company },
  ],
  socials: [
    { name: 'LinkedIn', icon: '/img/icons/linkedin.svg' },
    { name: 'Instagram', icon: '/img/icons/instagram.svg' },
    { name: 'YouTube', icon: '/img/icons/youtube.svg' },
  ],
  email: 'contact@payfuture.net',
};
