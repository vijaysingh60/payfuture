// Country pages. Facts, figures and payment methods are from payfuture.net/countries/*.
// Anything the live site doesn't say is shown on the page as "To be confirmed" (see `snapshotTbc`), never invented.
// The Philippines has no live page, so its facts are empty and render as TBC until the client supplies them.

export type Region = 'asia' | 'africa' | 'latam';

export interface Stat {
  /** Numeric part, animated on scroll. */
  value: number;
  /** A fixed string shown as-is (for ranges such as "72–75%"), which skips the count-up. */
  display?: string;
  decimals?: number;
  prefix?: string;
  /** Text after the number, e.g. " million", "%", "bn". */
  suffix?: string;
  label: string;
  text?: string;
}

export interface Country {
  slug: string;
  name: string;
  /** True where the name takes "the" in running text (the Philippines). */
  the?: boolean;
  flag: string;
  code: string;
  region: Region;
  /** Marked as one of the five core corridors on the homepage. */
  core: boolean;
  lon: number;
  lat: number;
  intro: string;
  methods: { name: string; detail: string }[];
  facts: Stat[];
  momentum: Stat[];
  context: string[];
  /** Optional compliance or proof point, only where the live site states it. */
  note?: { title: string; text: string };
  proof?: { title: string; text: string; href: string };
}

export const regions = [
  { id: 'all', label: 'All regions' },
  { id: 'asia', label: 'Asia' },
  { id: 'africa', label: 'Africa' },
  { id: 'latam', label: 'Latin America' },
];

export const crossBorder = (name: string) =>
  `Payfuture supports businesses operating in ${name} by enabling compliant cross-border fund movement into international destination currencies. This allows platforms to move revenue out of ${name}, manage foreign exchange requirements, and repatriate funds efficiently while continuing to operate in line with local market rules.`;

export const countries: Country[] = [
  {
    slug: 'india',
    name: 'India',
    flag: '/img/flags/india.svg',
    code: 'INR',
    region: 'asia',
    core: true,
    lon: 78.9,
    lat: 21,
    intro:
      'Money into and out of India on compliant fiat and stablecoin rails, delivered in INR through local banking and payment systems, including UPI. India remains one of the largest global payout destinations, and one of the most complex to navigate.',
    methods: [
      { name: 'Net banking', detail: 'Internet bank transfer processing system. Access to 70+ banks in India for deposits and payouts.' },
      { name: 'Unified Payments Interface (UPI)', detail: 'Mobile payments system. The most popular payment system in India.' },
    ],
    facts: [
      { value: 1.45, decimals: 2, suffix: ' billion', label: 'Population', text: 'India is the most populous country globally, surpassing China’s population in recent years.' },
      { value: 40, suffix: '%', label: 'Digital payments growing by', text: 'India leads in seamless, real-time digital transactions, transforming business-consumer interactions with money.' },
      { value: 900, suffix: ' million+', label: 'Internet user base', text: 'Over 900 million internet users make India the second-largest online market globally.' },
    ],
    momentum: [
      { value: 18.3, decimals: 1, suffix: ' billion', label: 'UPI transactions in March 2025', text: 'Worth more than ₹27.1 trillion, approximately USD $325 billion.' },
      { value: 91, suffix: '%', label: 'of Indian consumers used a mobile wallet in 2023' },
    ],
    context: [
      'Unified Payments Interface (UPI) is India’s flagship real-time payment system, developed by the National Payments Corporation of India (NPCI) and launched in 2016. It enables instant bank-to-bank transfers through mobile apps, without the need for card details or complex authentication steps.',
      'UPI’s interoperability, low fees, and support for features like recurring payments and QR-based transactions have made it the preferred method for digital transactions, particularly among younger demographics.',
    ],
    note: {
      title: 'Licensed route',
      text: 'Payfuture has partnered with an RBI-authorised Payment Aggregator – Cross Border (PA-CB), licensed to facilitate international payment collection and settlement.',
    },
    proof: {
      title: 'Live in this corridor',
      text: 'Profee, an international remittance provider, uses Payfuture’s infrastructure to deliver INR payouts into India via local banking and payment systems.',
      href: '/newsroom/cross-border-payouts-india-payfuture-profee/',
    },
  },
  {
    slug: 'pakistan',
    name: 'Pakistan',
    flag: '/img/flags/pakistan.svg',
    code: 'PKR',
    region: 'asia',
    core: true,
    lon: 69.3,
    lat: 30.4,
    intro:
      'Money into and out of Pakistan in PKR, for money transfer operators, banks, fintechs, payroll providers and trading businesses. Pakistan is the fifth most populous country in the world, and 84% of its banking transactions were digital in 2024.',
    methods: [
      { name: 'Card payments', detail: 'Credit and debit cards, with support for Verified by Visa and Mastercard SecureCode.' },
      { name: 'Bank transfers', detail: 'Via online bank transfer. Access to 27+ banks in Pakistan for deposits and payouts.' },
      { name: 'Mobile wallets', detail: 'The largest e-payment methods in Pakistan.' },
    ],
    facts: [
      { value: 234, suffix: ' million', label: 'Population', text: 'Pakistan is the fifth most populous country in the world, offering vast growth potential across multiple sectors.' },
      { value: 84, suffix: '%', label: 'Digital payments', text: '84% of total banking transactions in 2024 were digital, according to the State Bank of Pakistan.' },
      { value: 35, suffix: '%', label: 'E-wallet adoption', text: 'E-wallet users grew from 20 million in March 2023 to 27 million by December 2023, driven by regulatory support and rising mobile usage.' },
    ],
    momentum: [
      { value: 87, suffix: '%', label: 'of digital payments for e-commerce initiated through digital wallets' },
      { value: 85, suffix: '%', label: 'increase in e-wallet users during the 2024 fiscal year' },
    ],
    context: [
      'Pakistan is fast becoming a major player in the global digital economy. Once a cash-heavy society, the country is now embracing mobile wallets and fintech innovation, with platforms like JazzCash and Easypaisa driving financial inclusion and giving millions of unbanked users access to digital services.',
      'With only 21% of adults holding a formal bank account, digital wallets and mobile payments are unlocking access to financial services for millions.',
    ],
  },
  {
    slug: 'nigeria',
    name: 'Nigeria',
    flag: '/img/flags/nigeria.svg',
    code: 'NGN',
    region: 'africa',
    core: true,
    lon: 8.7,
    lat: 9.1,
    intro:
      'Money into and out of Nigeria in NGN, with access to all banks in Nigeria for collections and payouts, single and bulk. Nigeria is the continent’s largest economy and its most populous nation.',
    methods: [{ name: 'Bank transfers', detail: 'Access to all banks in Nigeria for collections and payouts (single and bulk payout).' }],
    facts: [
      { value: 227.9, decimals: 1, suffix: ' million', label: 'Population', text: 'The most populous country in Africa and the sixth-largest global population, young and tech-savvy.' },
      { value: 8.9, decimals: 1, suffix: ' billion', label: 'Real-time payment transactions', text: 'Forecast for real-time payments by 2027.' },
    ],
    momentum: [
      { value: 124, suffix: '%', label: 'growth in mobile app transfers from 2021 to 2022' },
      { value: 60, suffix: '%', label: 'of online transactions are bank transfers' },
    ],
    context: [
      'The Nigeria Inter-Bank Settlement Scheme (NIBSS) is widely known for its real-time inter-bank transfers and settlements, and is key in supporting the Central Bank of Nigeria’s policies to promote cashless transactions and financial inclusion.',
      'Nigeria ranks first globally for peer-to-peer (P2P) exchange volumes. With over 818 million mobile transfers processed each month in early 2023, compared to just 12.9 million in 2016, the shift towards digital is accelerating.',
    ],
  },
  {
    slug: 'philippines',
    name: 'Philippines',
    the: true,
    flag: '/img/flags/philippines.png',
    code: 'PHP',
    region: 'asia',
    core: true,
    lon: 122,
    lat: 12.5,
    intro:
      'Money into and out of the Philippines in PHP, for money transfer operators, banks, fintechs, payroll providers and trading businesses. Payfuture has an office in Manila.',
    methods: [],
    facts: [],
    momentum: [],
    context: [],
  },
  {
    slug: 'egypt',
    name: 'Egypt',
    flag: '/img/flags/egypt.svg',
    code: 'EGP',
    region: 'africa',
    core: true,
    lon: 30.8,
    lat: 26.8,
    intro:
      'Money into and out of Egypt in EGP, with Fawry, the country’s top payment method, enabling payments through digital wallets, and compliance with Central Bank of Egypt regulations.',
    methods: [{ name: 'Fawry', detail: 'Egypt’s top payment method, enabling easy payments through digital wallets.' }],
    facts: [
      { value: 117, suffix: ' million', label: 'Population', text: 'The 13th most populous country globally, with a median age of just 24.3 years.' },
      { value: 80, suffix: ' million', label: 'Internet users', text: 'The highest number of internet users in the MENA region.' },
      { value: 129, prefix: '$', suffix: ' million', label: 'E-commerce monthly revenue', text: 'As of 2024, one of the fastest-growing sectors in the country.' },
    ],
    momentum: [
      { value: 71.5, decimals: 1, suffix: '%', label: 'of eligible Egyptians (16+) financially included as of June 2024', text: 'Up from 70.7% in December 2023.' },
      { value: 31, prefix: '$', suffix: ' billion', label: 'projected digital payments market by 2028', text: 'Up from $20.6 billion in 2024, an annual growth rate of 11%.' },
    ],
    context: [
      'Egypt’s 181% increase in financial inclusion from 2016 to 2024 reflects the country’s rapid shift toward mobile wallets and alternative payments.',
      'With only 21% of adults holding a formal bank account, digital wallets and mobile payments are unlocking access to financial services for millions.',
    ],
  },
  {
    slug: 'kenya',
    name: 'Kenya',
    flag: '/img/flags/kenya.svg',
    code: 'KES',
    region: 'africa',
    core: false,
    lon: 37.9,
    lat: 0.2,
    intro:
      'Money into and out of Kenya in KES across M-Pesa and bank transfers. Kenya leads the world in mobile money usage, with M-Pesa driving over 80% of all digital payments nationwide.',
    methods: [{ name: 'M-Pesa payments', detail: 'Collections, payouts, and bank transfers across Kenya’s leading mobile-money network.' }],
    facts: [
      { value: 57, suffix: ' million', label: 'Population', text: 'Young, connected, and increasingly digital-first.' },
      { value: 762, prefix: '$', suffix: ' million', label: 'E-commerce, 2024', text: 'Approximately $762 million, driven by mobile-first consumers.' },
      { value: 91, suffix: '%', label: 'Mobile money penetration', text: 'M-Pesa reaches 47.7 million active subscriptions.' },
    ],
    momentum: [
      { value: 80, prefix: '≈', suffix: '%', label: 'of digital transactions powered by M-Pesa' },
      { value: 32, suffix: '%', label: 'internet penetration, with rapid year-on-year growth' },
    ],
    context: [
      'Kenya continues to set the benchmark for digital transformation in Africa. With over 47.7 million active mobile-money subscriptions and one of the world’s highest rates of mobile-led payments, the country offers an exceptionally receptive environment for digital commerce.',
    ],
  },
  {
    slug: 'brazil',
    name: 'Brazil',
    flag: '/img/flags/brazil.svg',
    code: 'BRL',
    region: 'latam',
    core: false,
    lon: -51.9,
    lat: -14.2,
    intro:
      'Money into and out of Brazil in BRL via PIX, bank transfers and cash vouchers. PIX now serves over 153 million users, covering nearly 75% of the population.',
    methods: [
      { name: 'Payment hubs', detail: 'Electronic money transfer. Real-time transfers, available 24/7.' },
      { name: 'Bank transfers', detail: 'Via online bank transfer. Access to 170+ banks in Brazil for deposits and payouts.' },
      { name: 'Cash vouchers', detail: 'Voucher invoicing method, payable at thousands of locations including ATMs, post offices, and retail stores.' },
    ],
    facts: [
      { value: 215, suffix: ' million', label: 'Population', text: 'With an internet penetration of 86.6%.' },
      { value: 4, suffix: ' billion+', label: 'PIX transactions monthly' },
      { value: 12.9, decimals: 1, suffix: '% CAGR', label: 'Growth rate', text: 'Increasing from $23.57 billion in 2023 to $44.01 billion by 2028.' },
    ],
    momentum: [
      { value: 80, suffix: '%+', label: 'of visits to e-commerce sites come from mobile devices' },
      { value: 153, suffix: 'M+', label: 'PIX users, nearly 75% of the population' },
    ],
    context: [
      'PIX, the instant payment platform launched in 2020, has revolutionised the way Brazilians pay. It enables real-time, secure transfers 24/7 with no need for cards.',
    ],
  },
  {
    slug: 'argentina',
    name: 'Argentina',
    flag: '/img/flags/argentina.svg',
    code: 'ARS',
    region: 'latam',
    core: false,
    lon: -63.6,
    lat: -38.4,
    intro:
      'Money into and out of Argentina in ARS, with access to all banks for deposits and payouts. In 2023, credit cards represented 39% of e-commerce payments and digital wallets 38%. By 2027, wallets are projected to lead at 59%.',
    methods: [{ name: 'Bank transfers', detail: 'Access to all banks in Argentina for deposits and payouts.' }],
    facts: [
      { value: 45, suffix: ' million', label: 'Population', text: 'A mature market with growing e-commerce and digital wallet use.' },
      { value: 22, suffix: '%', label: 'E-commerce growth', text: 'Expected between 2023 and 2026, driven by digital adoption and mobile-first behaviours.' },
      { value: 23, suffix: '%', label: 'Digital wallets', text: 'Of online sales, Argentina’s second-most popular payment method.' },
    ],
    momentum: [
      { value: 69, suffix: '%', label: 'of e-commerce volume in 2023 came from mobile devices' },
      { value: 26, suffix: '%', label: 'of consumers used digital wallets for e-commerce in 2024, double the Latin American average' },
    ],
    context: [
      'Argentina ranks as one of the fastest-growing e-commerce markets in Latin America, with a growth rate of over 75% in recent years.',
    ],
  },
  {
    slug: 'mexico',
    name: 'Mexico',
    flag: '/img/flags/mexico.svg',
    code: 'MXN',
    region: 'latam',
    core: false,
    lon: -102.5,
    lat: 23.6,
    intro:
      'Money into and out of Mexico in MXN over SPEI, the country’s real-time payment network. Mexico is the second-largest economy in Latin America, with e-commerce revenue already above $60 billion.',
    methods: [{ name: 'SPEI transfers', detail: 'Instant bank transfers through Mexico’s real-time payment network, with high acceptance rates and chargeback protection.' }],
    facts: [
      { value: 127, suffix: ' million', label: 'Population', text: 'The second-largest economy in Latin America.' },
      { value: 110, suffix: ' million', label: 'Active internet users', text: 'Approximately, supporting widespread adoption of e-commerce and mobile-led experiences.' },
    ],
    momentum: [
      { value: 75, suffix: '%+', label: 'mobile internet penetration' },
      { value: 67, prefix: '~', suffix: '%', label: 'of online purchases use alternative payment methods' },
    ],
    context: [
      'Mexico’s e-commerce ecosystem has grown dramatically, supported by rising financial inclusion, rapid broadband expansion and widespread adoption of alternative payment methods such as SPEI transfers, OXXO Pay and digital wallets.',
    ],
  },
  {
    slug: 'morocco',
    name: 'Morocco',
    flag: '/img/flags/morocco.svg',
    code: 'MAD',
    region: 'africa',
    core: false,
    lon: -7.1,
    lat: 31.8,
    intro:
      'Money into and out of Morocco in MAD, across CASH PLUS, Attijariwafa Bank and CIH Bank. Morocco has a fast-maturing digital economy and an ambitious national push to cut its reliance on cash.',
    methods: [
      { name: 'CASH PLUS', detail: 'One of Morocco’s most widely used payment networks, with a mobile wallet and over 95% coverage nationwide.' },
      { name: 'Attijariwafa Bank', detail: 'Morocco’s largest bank, enabling secure, direct payments through bank transfer.' },
      { name: 'CIH Bank', detail: 'One of Morocco’s leading digital-first banks, enabling fast, secure payments through direct bank transfer.' },
    ],
    facts: [
      { value: 37, suffix: ' million', label: 'Population', text: 'A young, mobile-first population with a median age around 30.' },
      { value: 35, prefix: '~', suffix: ' million', label: 'Internet users', text: 'With internet penetration above 90%, one of the highest connectivity rates on the African continent.' },
    ],
    momentum: [
      { value: 30, suffix: '%', label: 'average annual growth in e-commerce over the past five years' },
      { value: 58, suffix: '%', label: 'of adults held an active bank account at the end of 2024', text: 'Up from 54% a year earlier.' },
    ],
    context: [
      'Morocco’s government aims to lift online transaction volumes to 20 billion dirhams by 2030 under its national digital strategy.',
    ],
  },
  {
    slug: 'south-africa',
    name: 'South Africa',
    flag: '/img/flags/south-africa.svg',
    code: 'ZAR',
    region: 'africa',
    core: false,
    lon: 24,
    lat: -29,
    intro:
      'Money into and out of South Africa in ZAR, with access to all banks for deposits and payouts. South Africa is one of the continent’s largest and most dynamic economies, with nearly 48 million mobile internet users.',
    methods: [{ name: 'Bank transfers', detail: 'Access to all banks in South Africa for deposits and payouts.' }],
    facts: [
      { value: 60, suffix: ' million+', label: 'Population', text: 'One of the continent’s largest and most dynamic economies.' },
      { value: 48, prefix: '~', suffix: ' million', label: 'Mobile internet users', text: 'Driving a mobile-first digital revolution.' },
      { value: 6.56, decimals: 2, prefix: '$', suffix: ' billion', label: 'E-commerce market', text: 'Projected by 2025, driven by increased online shopping and payment platforms.' },
    ],
    momentum: [],
    context: [
      'The number of e-commerce users is forecast to increase from approximately 11.7 million in 2025 to 21.52 million by 2029, indicating a growing online consumer base.',
    ],
  },
  {
    slug: 'bangladesh',
    name: 'Bangladesh',
    flag: '/img/flags/bangladesh.svg',
    code: 'BDT',
    region: 'asia',
    core: false,
    lon: 90.3,
    lat: 23.7,
    intro:
      'Money into and out of Bangladesh in BDT through bKash, Nagad and bank transfers. Bangladesh is one of the fastest-growing digital economies in South Asia, with 100 million+ mobile financial services accounts.',
    methods: [
      { name: 'Mobile wallets', detail: 'bKash and Nagad, the country’s leading mobile wallets. The largest payment method in Bangladesh, backed by 100 million+ MFS accounts.' },
      { name: 'Bank transfers', detail: 'Via online bank transfer. Full pay-in and payout support for deposits and withdrawals.' },
    ],
    facts: [
      { value: 177, suffix: ' million', label: 'Population', text: 'One of the world’s most populous nations.' },
      { value: 73.5, display: '72–75%', label: 'Smartphone penetration', text: 'Between 72% and 75%, putting digital payments within reach of most of the population.' },
      { value: 82.5, display: '82–83 million', label: 'Online population', text: 'Between 82 and 83 million people already online.' },
    ],
    momentum: [
      { value: 100, suffix: 'M+', label: 'mobile financial services accounts now active' },
      { value: 6, decimals: 1, prefix: '$', suffix: 'bn', label: 'value of Bangladesh’s online shopping market' },
    ],
    context: [
      'Interoperability through the National Payment Switch (NPSB) now allows seamless bank-to-wallet transfers, and rising adoption of QR payments is moving consumers from cash on delivery to secure, real-time digital payments.',
    ],
  },
];

/** Rows of the corridor snapshot card. `null` renders as a visible "To be confirmed" tag. */
export const snapshotTbc = ['Typical delivery time', 'Recipient details needed', 'Limits and documents'];

export const steps = [
  { title: 'Tell us the corridor', text: 'Pick the market and the direction: money in, money out or both.' },
  { title: 'Send funds in fiat or stablecoins', text: 'Depending on the service available in your jurisdiction.' },
  { title: 'We deliver', text: 'Recipients get local currency in their bank account. Suppliers overseas are paid by international wire.' },
];

export const bySlug = (slug: string) => countries.find((c) => c.slug === slug)!;
