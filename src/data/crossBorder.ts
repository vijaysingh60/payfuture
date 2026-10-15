// Cross-border payments, from the live page (payfuture.net/solutions/cross-border-payments/).
import { routes } from './site';

export const meta = {
  title: 'Cross-border payment solutions for emerging markets | Payfuture',
  description:
    'B2B cross-border payments and cross-border payment solutions for emerging markets. Predictable FX settlement and scalable global growth.',
};

export const hero = {
  title: 'Cross-Border Payment Solutions for *Global Businesses*',
  text: 'Our cross-border payments solution enables businesses to enter and scale in emerging markets by supporting compliant cross-border fund movement in local markets. Built for reliable execution, Payfuture supports seamless commercial flows across high-growth regions.',
  cta: { label: 'Speak to our cross-border team', href: routes.contact },
  image: { src: '/img/pages/xb-hero.webp', alt: 'Cross-border payments for global businesses' },
  chips: [
    { icon: 'coins', title: 'Transparent FX fees', sub: 'Across corridors' },
    { icon: 'shield', title: 'Regulated', sub: 'Compliant infrastructure' },
  ],
};

export const strip = [
  { icon: 'store', title: 'Trusted by leading global merchants' },
  { icon: 'coins', title: 'Transparent FX fees across corridors' },
  { icon: 'shield', title: 'Regulated, compliant infrastructure' },
];

export const challenges = {
  eyebrow: 'Why Payfuture',
  title: 'The challenges merchants face when scaling internationally',
  list: [
    'Many traditional providers struggle with local compliance in emerging markets',
    'Regulatory complexity and settlement delays',
    'Limited liquidity and unpredictable operational timelines',
  ],
  cta: { label: 'Solve your cross-border challenges', href: routes.contact },
  image: { src: '/img/pages/challenges.webp', alt: 'Payfuture dashboard showing payments across markets' },
};

export const seamless = {
  title: 'Seamless global payments: fast, scalable, and ready for expansion',
  items: [
    {
      icon: 'globe',
      title: 'Growth across global corridors',
      text: 'Support international commercial flows across multiple countries, without the operational complexity of coordinating fragmented providers.',
    },
    {
      icon: 'route',
      title: 'Reliable execution in complex and emerging markets',
      text: 'Visibility into settlement flows, supported by compliance processes and reporting aligned to regulatory requirements across multiple jurisdictions.',
    },
    {
      icon: 'shield',
      title: 'Compliance and transfer visibility',
      text: 'End-to-end visibility into global payment operations, supported by robust compliance controls and reporting aligned to regulatory requirements.',
    },
  ],
  cta: { label: 'Speak to our cross-border team', href: routes.contact },
};

export const reach = {
  title: 'Explore our global reach',
  text: 'Payfuture connects you to the most trusted payment methods across emerging markets',
  markets: [
    { name: 'India', flag: '/img/flags/india.svg', lon: 78.9, lat: 21 },
    { name: 'Sri Lanka', flag: '/img/flags/sri-lanka.svg', lon: 80.7, lat: 7.8 },
    { name: 'Argentina', flag: '/img/flags/argentina.svg', lon: -63.6, lat: -38.4 },
    { name: 'Mexico', flag: '/img/flags/mexico.svg', lon: -102.5, lat: 23.6 },
    { name: 'Egypt', flag: '/img/flags/egypt.svg', lon: 30.8, lat: 26.8 },
    { name: 'Nigeria', flag: '/img/flags/nigeria.svg', lon: 8.7, lat: 9.1 },
    { name: 'Bangladesh', flag: '/img/flags/bangladesh.svg', lon: 90.3, lat: 23.7 },
    { name: 'Brazil', flag: '/img/flags/brazil.svg', lon: -51.9, lat: -14.2 },
    { name: 'Pakistan', flag: '/img/flags/pakistan.svg', lon: 69.3, lat: 30.4 },
    { name: 'Kenya', flag: '/img/flags/kenya.svg', lon: 37.9, lat: 0.2 },
    { name: 'Morocco', flag: '/img/flags/morocco.svg', lon: -7.1, lat: 31.8 },
    { name: 'South Africa', flag: '/img/flags/south-africa.svg', lon: 24, lat: -29 },
  ],
};

export const how = {
  title: 'How it works?',
  items: [
    {
      title: 'Speak to our team',
      text: 'Get in touch to discuss your expansion plans, target markets, and settlement requirements. Our specialists will assess your use case and outline how Payfuture can support your growth.',
    },
    {
      title: 'Receive tailored pricing',
      text: 'We’ll provide a bespoke pricing proposal based on your volumes, markets, and commercial model. No off-the-shelf packages, just transparent pricing aligned to your business needs and growth ambitions.',
    },
    {
      title: 'Launch across emerging markets',
      text: 'Access emerging markets through a cross-border setup that supports seamless money movement into the country, regulatory requirements, and scalable operations without the operational burden of managing multiple providers',
    },
  ],
};

export const smarter = {
  title: 'A smarter way to move money across borders',
  paragraphs: [
    'Whether you are entering your first new market or expanding across multiple regions, Payfuture supports every stage of cross-border fund movement. We help businesses navigate regulatory requirements, execute compliant international transfers, and move capital reliably across complex corridors, delivering the speed and flexibility required for global growth.',
    'Our cross-border capabilities enable businesses to transfer and repatriate funds efficiently, manage currency conversion, and scale across emerging markets while maintaining regulatory alignment.',
  ],
  cta: { label: "Let's map your next market", href: routes.contact },
  image: { src: '/img/pages/xb-smarter.webp', alt: 'Money moving across borders between markets' },
};

export const whyChoose = {
  title: 'Why choose Payfuture for cross-border payment services',
  items: [
    {
      icon: 'globe',
      title: 'Expand into new markets',
      text: 'Accelerate expansion into high-growth markets with a unified global payment infrastructure. Payfuture orchestrates compliant commercial flows, bridging local acceptance with predictable global settlement to optimise liquidity across complex corridors.',
    },
    {
      icon: 'wallet',
      title: 'Turn international revenue into usable capital',
      text: 'Convert overseas revenue into destination currencies through predictable cross-border settlement workflows. Payfuture helps businesses manage liquidity efficiently, supporting treasury operations and global growth.',
    },
    {
      icon: 'checkCircle',
      title: 'Execute cross-border flows with confidence',
      text: 'Support international operations with predictable execution, clear fee structures, and visibility across complex corridors, helping teams operate cross-border without unnecessary operational friction.',
    },
  ],
};

export const industries = {
  title: 'Industries we specialise in',
  tabs: [
    {
      label: 'Financial Services',
      title: 'Cross-border payments solution for financial services',
      text: 'Banks, remittance companies, PSPs, and digital-first financial institutions use Payfuture to scale compliant cross-border money movement without managing multiple providers. Payfuture supports global settlement and liquidity management across complex corridors while maintaining regulatory alignment with local partners.',
      img: '/img/pages/ind-financial.webp',
    },
    {
      label: 'Global businesses',
      title: 'Simplify international treasury management',
      text: 'Global enterprises leverage Payfuture’s unified infrastructure to ensure seamless cross-border operations into the country and facilitate settlement. This simplifies global operations and helps finance teams manage FX exposure, liquidity, and regulatory complexity with greater predictability.',
      img: '/img/pages/ind-global.webp',
    },
    {
      label: 'Platform businesses',
      title: 'Scale global fund flows across multiple markets',
      text: 'Digital platforms use Payfuture to manage commercial flows across multiple operating regions, while supporting compliant international transfers and capital repatriation as platforms scale across emerging markets.',
      img: '/img/pages/ind-platform.webp',
    },
    {
      label: 'Global merchants',
      title: 'Access international revenue reliably',
      text: 'Merchants operating across borders use Payfuture to transfer revenue from international markets into destination currencies efficiently and compliantly. Payfuture enables reliable cross-border fund movement that supports international growth.',
      img: '/img/pages/ind-merchants.webp',
    },
    {
      label: 'Remittance',
      title: 'Support inbound and outbound cross-border flows',
      text: 'Remittance companies use Payfuture to facilitate cross-border fund movement between the EU and selected emerging markets, supporting both funding into local payout corridors and repatriation where required. This enables providers to manage liquidity efficiently while expanding into new regions.',
      img: '/img/pages/ind-remittance.webp',
    },
  ],
  cta: { label: "Let's map your next market", href: routes.contact },
};

export const faqs = {
  title: 'FAQ',
  items: [
    {
      q: 'What are cross-border payments and how does Payfuture help businesses manage them?',
      a: 'Cross-border fund movement involves transferring money between countries, often requiring currency conversion, regulatory compliance, and coordination across multiple banking systems. Payfuture enables compliant, cross-border transfers and supports execution into destination currencies with clear fees and predictable timelines. This results in faster, more predictable international fund movement and efficient repatriation into destination currencies.',
    },
    {
      q: 'What is Payfuture’s cross-border payment platform?',
      a: 'Payfuture provides a compliant and regulated infrastructure that enables businesses to manage commercial expansion and global settlement across complex, high-growth markets. Through its unified platform, Payfuture helps businesses facilitate compliant money movement into the country, supporting scalable operations, predictable settlement outcomes, and alignment with local market requirements.',
    },
    {
      q: 'What challenges do businesses face with cross-border payments, and how does Payfuture solve them?',
      a: 'Businesses moving money across borders often face delayed fund movement, high currency conversion costs, compliance complexity, and execution challenges in hard-to-serve markets. Payfuture addresses these issues by enabling compliant, money movement into the country and predictable settlement outcomes across emerging markets.',
    },
    {
      q: 'What are typical remittance timelines when using Payfuture?',
      a: 'Payfuture supports more efficient execution across destination markets, delivering faster and more predictable transfer timelines in high-growth regions. In some emerging markets the funds arrive in seconds.',
    },
    {
      q: 'What types of cross-border payments does Payfuture support?',
      a: 'Payfuture’s infrastructure facilitates commercial transactions, enabling businesses to ensure seamless cross-border operations into the country and manage global settlement for high-value use cases such as:',
      list: [
        'Revenue repatriation',
        'International vendor and supplier payments',
        'B2B transfers and treasury operations',
        'Platform payout facilitation',
      ],
      after:
        'This allows businesses to manage global fund movement efficiently across emerging markets without relying on fragmented banking relationships.',
    },
    {
      q: 'What fees are involved in cross-border payments when using Payfuture?',
      a: 'Cross-border fund transfers can involve FX conversion costs, intermediary bank fees, and service charges depending on the currencies and corridors involved. Payfuture helps businesses manage these costs by providing clear, predictable fee structures for cross-border money movement.',
    },
    {
      q: 'What makes Payfuture a strong cross-border payment solution for enterprise merchants?',
      a: 'Payfuture combines compliant fund movement, predictable FX fee structures, and execution capability in challenging markets. Enterprise merchants choose Payfuture for its ability to ensure seamless expansion into the country across emerging market corridors such as India, Pakistan, Nigeria, Morocco and Egypt while maintaining regulatory alignment and operational control.',
    },
    {
      q: 'How does Payfuture ensure compliance for cross-border payments?',
      a: 'Payfuture supports cross-border payment operations across multiple jurisdictions through robust onboarding workflows, transaction monitoring controls, and partner-led compliance checks where required. This helps businesses operate across local market rules with clearer visibility and more consistent processes.',
    },
    {
      q: 'Which industries use Payfuture for cross-border payments?',
      a: 'Payfuture supports businesses operating across industries such as marketplaces, SaaS platforms, travel, logistics, digital services, and education that require reliable cross-border fund movement for B2B transfers, vendor payouts, and international treasury operations.',
    },
    {
      q: 'What is an example of a cross-border payment processed through Payfuture?',
      a: 'A common cross-border use case involves a business headquartered in the UK, UAE, or Europe consolidating revenue generated in markets such as India, Nigeria, or Egypt into EUR for treasury management. Another example is a remittance firm receiving EUR in Europe, converting funds to INR, and settling locally in India via a domestic payment rail.',
    },
    {
      q: 'How does Payfuture support businesses expanding into new markets?',
      a: 'Payfuture supports international expansion by enabling compliant cross-border fund movement, currency conversion, and a compliant capital repatriation across emerging markets. Businesses operating in India, Nigeria, Egypt, Morocco, Kenya, Pakistan, Mexico, and Southeast Asia rely on Payfuture to manage commercial revenue reliably as they scale into new regions.',
    },
  ],
};
