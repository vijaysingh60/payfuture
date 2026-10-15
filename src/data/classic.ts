// Homepage content, taken from the live payfuture.net homepage.
// In the full build this comes from the CMS.

export const nav = [
  {
    label: 'Solutions',
    href: '#solutions',
    links: [
      'Pay-ins',
      'Payouts',
      'Cross-border payments',
      'Global mass payments',
      'Real-time payments',
      'Currency management',
      'Smart routing and cascading',
      'Authorisation optimisation',
      'Fraud and risk management',
      'Reconciliation management',
      'Reporting and analytics',
      'Banking services',
      'Recovery',
      'Stablecoin solutions',
    ],
  },
  {
    label: 'Countries',
    href: '#global-reach',
    links: ['Argentina', 'India', 'South Africa', 'Brazil', 'Nigeria', 'Pakistan', 'Egypt'],
  },
  {
    label: 'Industries',
    href: '#industries',
    links: ['Video Gaming', 'E-learning', 'Streaming', 'Remittance providers', 'Travel agencies', 'Partners'],
  },
  {
    label: 'Company',
    href: '#faq',
    links: ['About Us', 'Careers', 'Newsroom', 'Events'],
  },
];

export const heroSlides = [
  { src: '/img/hero/2.webp', alt: 'A market trader smiling at her stall' },
  { src: '/img/hero/3.webp', alt: 'Shoppers walking through a busy market street' },
  { src: '/img/hero/4.webp', alt: 'Aerial view of a crowded city street' },
  { src: '/img/hero/1.webp', alt: 'Everyday commerce in an emerging market' },
];

export const trustLogos = [
  { src: '/img/logos/Ace-Money-Transfer.svg', name: 'ACE Money Transfer' },
  { src: '/img/logos/APA.svg', name: 'APA' },
  { src: '/img/logos/Faster-Payments.svg', name: 'Faster Payments' },
  { src: '/img/logos/Unigox.svg', name: 'Unigox' },
  { src: '/img/logos/Tamatem-1.svg', name: 'Tamatem' },
  { src: '/img/logos/Profee-1.svg', name: 'Profee' },
  { src: '/img/logos/Pagsmile-1.svg', name: 'Pagsmile' },
];

export const features = [
  {
    icon: 'pin',
    title: 'A local payment experience',
    text: 'Reach customers in emerging markets with local payment methods they know and trust. Improve your customer experience with every single transaction.',
  },
  {
    icon: 'code',
    title: 'A single API integration',
    text: 'A single payments API for business and enterprise use cases. Integrate once to access local payment methods, online payment processing, and cross-border payment capabilities across multiple markets.',
  },
  {
    icon: 'trend',
    title: 'Payment processing',
    text: 'Optimised payment processing for businesses. Support higher approval rates, reduce failed transactions, and manage risk with advanced payment solutions designed for enterprise-scale operations.',
  },
  {
    icon: 'headset',
    title: '24/7 global support',
    text: 'Our global support team is available around the clock to ensure your operations run smoothly.',
  },
];

// lon/lat place each market on the globe.
export const markets = [
  { name: 'India', flag: '/img/flags/india.svg', lon: 78.9, lat: 21 },
  { name: 'Sri Lanka', flag: '/img/flags/sri-lanka.svg', lon: 80.7, lat: 7.8 },
  { name: 'Philippines', flag: '/img/flags/philippines.png', lon: 122, lat: 12.5 },
  { name: 'Nepal', flag: '/img/flags/nepal.svg', lon: 84, lat: 28.2 },
  { name: 'Egypt', flag: '/img/flags/egypt.svg', lon: 30.8, lat: 26.8 },
  { name: 'Nigeria', flag: '/img/flags/nigeria.svg', lon: 8.7, lat: 9.1 },
  { name: 'Bangladesh', flag: '/img/flags/bangladesh.svg', lon: 90.3, lat: 23.7 },
  { name: 'Malaysia', flag: '/img/flags/malaysia.svg', lon: 102, lat: 4.2 },
  { name: 'Pakistan', flag: '/img/flags/pakistan.svg', lon: 69.3, lat: 30.4 },
  { name: 'Kenya', flag: '/img/flags/kenya.svg', lon: 37.9, lat: 0.2 },
  { name: 'Morocco', flag: '/img/flags/morocco.svg', lon: -7.1, lat: 31.8 },
  { name: 'South Africa', flag: '/img/flags/south-africa.svg', lon: 24, lat: -29 },
];

export const flexible = [
  {
    icon: 'pin',
    title: 'Local payment acceptance for e-commerce and online businesses',
    text: 'Accept local payment methods with a seamless online payment experience, enabling consumers to pay in their local currency with ease, unlocking access to more customers and higher approval rates.',
  },
  {
    icon: 'code',
    title: 'A single payments API for business and enterprise use cases',
    text: 'Integrate once to access local payment methods, online payment processing, and cross-border payment capabilities across multiple markets.',
  },
  {
    icon: 'chart',
    title: 'Cross-border settlement and repatriation of funds',
    text: 'Simplify the repatriation of profits to your country and currency of choice. Navigate complex cross-border financial operations efficiently.',
  },
];

export const industries = [
  { name: 'E-learning', img: '/img/industries/e-learning.png' },
  { name: 'Streaming', img: '/img/industries/streaming.png' },
  { name: 'Travel', img: '/img/industries/travel.png' },
  { name: 'Video Gaming', img: '/img/industries/video-gaming.png' },
  { name: 'Remittance Providers', img: '/img/industries/remittance.png' },
];

export const partners = [
  { name: 'Payment Gateways', icon: '/img/icons/partner-1.svg' },
  { name: 'Licensed Payment Processors', icon: '/img/icons/partner-2.svg' },
  { name: 'Acquirers', icon: '/img/icons/partner-3.svg' },
  { name: 'Referral Partners and Agents', icon: '/img/icons/partner-4.svg' },
];

export const stats = [
  { value: 250, decimals: 0, suffix: '+', label: 'Global Merchants' },
  { value: 2.5, decimals: 1, suffix: 'bn+', label: 'Potential Shoppers' },
  { value: 4, decimals: 0, suffix: '', label: 'Continents Covered' },
];

export const highlights = [
  'Seamless pay-ins & payouts',
  'Worldwide market access',
  'Proactive and reliable customer support',
  'Seamless across all devices',
  'Fully customisable pages',
];

export const challenges = [
  "Governments frequently update policies and regulations, affecting businesses' ability to operate efficiently",
  'Local entities are often required in emerging markets, including local directors, shareholders, and verified office premises.',
  'Navigating tax complexities, filings, and local compliance requirements.',
  'Political stability in these countries also has a huge impact on the way business is conducted.',
];

export const solutionsLeft = [
  {
    icon: 'transfer',
    title: 'Local pay-ins & payouts',
    text: 'Payfuture offers the most popular local payment methods in each region',
  },
  {
    icon: 'globe',
    title: 'Fast & easy integration',
    text: 'Connect with Payfuture with just one API, saving time while accessing the most local payment methods in emerging markets',
  },
  {
    icon: 'cart',
    title: 'Supporting e-commerce businesses',
    text: 'We help e-commerce businesses enter emerging markets smoothly with comprehensive end-to-end services.',
  },
];

export const solutionsRight = [
  {
    icon: 'pin',
    title: 'Local knowledge',
    text: 'With our deep market expertise, we empower businesses to expand into emerging markets successfully',
  },
  {
    icon: 'checkCircle',
    title: 'Higher payment approval rates',
    text: 'By offering the most popular local payment methods, businesses can maximise approval rates',
  },
  {
    icon: 'growth',
    title: 'Focus on growth',
    text: "Payfuture's local partners manage local entities' setup and ongoing maintenance, handling all the complex tasks for businesses entering emerging markets",
  },
];

export const faqs = [
  {
    q: 'What is Payfuture?',
    a: 'Payfuture is a global payments infrastructure provider that enables businesses to accept local payment methods, process online payments, and manage cross-border transfers across emerging markets. It helps companies expand into high-growth regions with reliable and compliant payment solutions.',
  },
  {
    q: 'What payment solutions does Payfuture offer?',
    a: 'Payfuture offers payment processing (pay-ins), payouts, currency management, fraud and risk controls, and reporting tools. These solutions are designed to support businesses operating across multiple markets.',
  },
  {
    q: 'Which countries does Payfuture support?',
    a: 'Payfuture supports payments across emerging markets including India, Nigeria, Brazil, Egypt, Pakistan, Kenya, and South Africa, with continued expansion into other high-growth regions.',
  },
  {
    q: 'What are local payment methods?',
    a: 'Local payment methods are region-specific ways customers prefer to pay, such as bank transfers, digital wallets, and real-time payment systems. These methods are widely used in emerging markets where card adoption may be lower.',
  },
  {
    q: 'What is the difference between pay-ins and payouts?',
    a: 'Pay-ins refer to accepting payments from customers, while payouts refer to sending funds to customers, partners, or vendors. Payfuture supports both to help businesses manage the full payment lifecycle.',
  },
  {
    q: 'How does Payfuture improve payment approval rates?',
    a: 'Payfuture improves approval rates by offering locally preferred payment methods, optimising transaction flows, and reducing checkout friction, leading to more successful transactions.',
  },
  {
    q: 'What industries does Payfuture support?',
    a: 'Payfuture supports industries such as e-commerce, travel, streaming, e-learning, marketplaces, and remittance providers that require reliable and scalable payment infrastructure.',
  },
];

export const footer = {
  columns: [
    {
      title: 'Solutions',
      wide: true,
      links: [
        'Recovery',
        'Smart routing and cascading',
        'Banking services',
        'Fraud and risk management',
        'Authorisation optimisation',
        'Reporting and analytics',
        'Global mass payments',
        'Cross-border payments',
        'Currency management',
        'Pay-ins',
        'Payouts',
        'Real-time payments',
        'Reconciliation management',
        'Stablecoin solutions',
      ],
    },
    {
      title: 'Countries',
      links: ['Argentina', 'India', 'South Africa', 'Brazil', 'Nigeria', 'Pakistan', 'Egypt'],
    },
    {
      title: 'Industries',
      links: ['Video Gaming', 'E-learning', 'Streaming', 'Remittance providers', 'Travel agencies', 'Partners'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Newsroom', 'Events'],
    },
  ],
  socials: [
    { name: 'LinkedIn', icon: '/img/icons/linkedin.svg' },
    { name: 'Instagram', icon: '/img/icons/instagram.svg' },
    { name: 'YouTube', icon: '/img/icons/youtube.svg' },
  ],
  email: 'contact@payfuture.net',
};
