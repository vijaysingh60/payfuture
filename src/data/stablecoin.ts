// Stablecoin cross-border payments, from the live page (payfuture.net/solutions/stablecoin-cross-border-payments/).
import { routes } from './site';

export const meta = {
  title: 'Stablecoin Cross-Border Payments for Emerging Markets | Payfuture',
  description:
    'Payfuture is the regulated stablecoin cross-border payments infrastructure for global businesses. Faster settlement, fewer intermediaries, and deep emerging market coverage.',
};

export const hero = {
  title: 'Stablecoin cross-border payments for emerging markets. *At scale.*',
  text: 'Payfuture is the stablecoin payments infrastructure for global businesses and payment platforms that need to settle cross-border transactions faster in emerging markets — without rebuilding their operations from scratch.',
  cta: { label: 'Talk to us', href: routes.contact },
  image: { src: '/img/pages/stable-hero.webp', alt: 'Stablecoin payments moving across emerging markets' },
  chips: [
    { icon: 'bolt', title: 'Near-instant settlement', sub: 'On-chain confirmation' },
    { icon: 'shield', title: 'Regulated', sub: 'In key global markets' },
  ],
};

export const cost = {
  title: 'The real cost of fragmented cross-border payments',
  items: [
    {
      icon: 'route',
      title: 'Your payment rails weren’t built for this market',
      text: 'Traditional cross-border payments rely on correspondent banking networks, multiple intermediaries, and settlement windows of two to five business days. In high-growth emerging markets, that’s not a delay — it’s a deal-breaker. Fees are opaque. Timelines are unpredictable. Corridor coverage is inconsistent.',
    },
    {
      icon: 'clock',
      title: "Your partners are waiting. Your infrastructure isn't ready",
      text: 'Finance and treasury teams lose confidence in international payment timelines. Merchants can’t promise reliable settlement to partners. Payment platform operators face compounding operational complexity with every new market they enter — and it’s costing them speed and credibility.',
    },
    {
      icon: 'building',
      title: 'Global businesses shouldn’t pay the price for legacy infrastructure',
      text: 'Goods and services cross borders in hours. B2B stablecoin payments should too. Businesses operating globally shouldn’t be penalised by banking infrastructure built for a world that no longer exists. The technology to fix this already exists. Most businesses just aren’t on it yet.',
    },
  ],
  cta: { label: 'Speak to an expert', href: routes.contact },
};

export const proof = {
  title: 'Processing over $3B in stablecoin in 2026. Licensed, regulated, and built for emerging markets.',
  paragraphs: [
    'We’ve built regulated, compliant infrastructure from the ground up — with an understanding of the local liquidity networks, regulatory landscapes, and operational demands that determine whether cross-border payments actually work at scale.',
    'We don’t just provide access to stablecoin payment rails. We understand the local landscape: what’s permitted, what liquidity exists in-market, and what it takes to settle reliably when traditional banking infrastructure falls short. When the markets you operate in have different rules, different currencies, and different speeds, you need a stablecoin payments platform that was designed for those conditions.',
  ],
  emphasis:
    'Our wallets are on-chain. Our volume is blockchain-transparent. And our global licences mean the infrastructure you’re building on is built to last.',
  stats: [
    { icon: 'coins', value: '$3B+', count: 3, prefix: '$', suffix: 'B+', label: 'Stablecoin payment volume in 2026' },
    { icon: 'shield', value: 'Regulated', label: 'In key global markets' },
    { icon: 'trend', value: 'Growing', label: 'Emerging market corridors' },
  ],
};

export const steps = {
  title: 'Four steps. Frictionless movement in and out of emerging markets.',
  text: 'Getting started is straightforward. Here’s how Payfuture’s stablecoin payments infrastructure moves your money:',
  items: [
    {
      title: 'On-ramp',
      text: 'Fiat converts into stablecoin through our compliant, regulated infrastructure, backed by globally licensed operations and full KYC/AML alignment.',
    },
    {
      title: 'Transfer',
      text: 'Funds move across stablecoin payment rails, working alongside existing banking infrastructure to enable faster, more predictable cross-border payments.',
    },
    {
      title: 'Off-ramp',
      text: 'Stablecoin converts into local currency at the destination market, backed by deep local liquidity pools that enable near-instant conversion. No waiting for a correspondent bank to open.',
    },
    {
      title: 'Settlement',
      text: 'Funds reach the end recipient quickly — often near-instantly — with full visibility across the stablecoin settlement lifecycle. Blockchain-transparent, auditable, and reliable.',
    },
  ],
  // What the travelling token reads before, between and after the four stages.
  labels: ['Fiat', 'Stablecoin', 'Stablecoin', 'Local currency', 'Paid ✓'],
};

export const wrongPartner = {
  title: 'Choosing the wrong infrastructure partner has a cost',
  text: 'Without scalable stablecoin payments infrastructure, businesses continue absorbing unnecessary FX costs, losing settlement predictability, and falling behind competitors already operating on faster payment rails.',
  emphasis: 'In high-growth emerging markets, delayed payments don’t just cost money — they cost relationships and market position.',
  without: {
    title: 'Without regulated stablecoin infrastructure',
    items: [
      'Opaque fee structures and unpredictable FX costs',
      'Settlement delays of 2–5 business days',
      'Dependence on correspondent banking networks',
      'Compliance gaps as you scale into new corridors',
      'No visibility into fund movement',
    ],
  },
  with: {
    title: 'With Payfuture',
    items: [
      'Transparent pricing with consistent FX outcomes',
      'Near-instant stablecoin settlement',
      'Direct stablecoin payment rails, fewer intermediaries',
      'Operating within a globally, regulated infrastructure',
      'Blockchain-transparent, on-chain confirmation',
      'Deep local liquidity and local landscape knowledge',
    ],
  },
};

export const why = {
  eyebrow: 'Why Payfuture',
  title: 'Speed, compliance, and control across every corridor.',
  list: [
    'Finance teams gain real-time visibility and control over international payment flows — no more uncertainty about when funds will land. Merchants settle faster, with fewer intermediaries, lower operational overhead, and more predictable FX outcomes.',
    'Payment platforms expand into new emerging markets without building stablecoin payments infrastructure from scratch. Treasury operations run on payment rails designed for the pace of global commerce — compliant, regulated, and blockchain-transparent.',
    'The result isn’t just faster stablecoin cross-border payments. It’s a payments operation built to scale into every market where opportunity exists.',
  ],
  cta: { label: 'Speak to an expert', href: routes.contact },
  image: { src: '/img/pages/stable-why.webp', alt: 'Payfuture stablecoin payment flow on a phone' },
};

export const faqs = {
  title: 'Stablecoin Payments FAQs',
  text: 'Key questions about payment stablecoins, settlement, infrastructure, compliance, and B2B use cases.',
  items: [
    {
      q: 'What are stablecoin payments?',
      a: 'Stablecoin payments are transactions made using blockchain-based digital assets that are pegged to a stable reference value, typically a fiat currency such as the US dollar. Unlike volatile cryptocurrencies, stablecoins are designed to maintain a consistent value, making them suitable for commercial transactions, cross-border payments, and B2B settlement. Common examples include USDT, USDC, and PYUSD.',
    },
    {
      q: 'How do stablecoin payments work?',
      a: 'Stablecoin payments typically begin by converting fiat currency into a stablecoin through an on-ramp. The value is then transferred over blockchain rails to the destination and converted back into local currency through an off-ramp. This model bypasses many of the intermediary banks involved in traditional wire transfers, enabling faster fund movement with fewer friction points across borders.',
    },
    {
      q: 'What are stablecoin payment rails?',
      a: 'Stablecoin payment rails are blockchain-based infrastructure used to move stablecoins between parties. Unlike correspondent banking networks, these rails enable near-instant transfers across geographies without requiring multiple intermediary institutions. Businesses use stablecoin payment rails to improve settlement speed, reduce costs, and increase predictability in cross-border payment flows.',
    },
    {
      q: 'What is stablecoin settlement?',
      a: 'Stablecoin settlement refers to the finalisation of a payment using stablecoin infrastructure. Once a transfer is completed on-chain, funds can be converted into local currency and delivered to the recipient. Stablecoin settlement is typically faster than traditional international wire settlement, which often takes two to five business days depending on the corridor and intermediaries involved.',
    },
    {
      q: 'How are stablecoins used for cross-border payments?',
      a: 'Stablecoins for cross-border payments replace the traditional correspondent banking model with blockchain-based fund movement. A business converts fiat into stablecoin, transfers value globally using stablecoin payment rails, and the recipient receives local currency on the other end. This model reduces intermediary dependence, shortens settlement timelines, and improves visibility across the payment lifecycle.',
    },
    {
      q: 'What are the benefits of stablecoin cross-border payments for businesses?',
      a: 'Key benefits include faster settlement compared with traditional SWIFT-based transfers, reduced reliance on intermediary banks, more predictable FX outcomes, lower operational friction in emerging markets, and improved visibility into fund movement. For treasury and finance teams managing international payment flows, stablecoin rails offer greater control and consistency.',
    },
    {
      q: 'Are stablecoin cross-border payments suitable for B2B transactions?',
      a: 'Yes. B2B stablecoin payments are increasingly used by merchants, financial platforms, and payment companies to settle supplier invoices, manage treasury transfers, fund international operations, and support remittance flows. Payfuture’s infrastructure is built specifically for B2B stablecoin payments at scale across global and emerging markets.',
    },
    {
      q: 'How do stablecoin payments compare with traditional cross-border payments?',
      a: 'Traditional cross-border payments often involve multiple correspondent banks, opaque fee structures, and settlement windows of two to five business days. Stablecoin cross-border payments use blockchain rails to move funds more directly, reducing intermediaries, shortening timelines, and improving cost transparency. For businesses operating across emerging markets, the difference in speed and reliability can be significant.',
    },
    {
      q: 'What is a stablecoin payments platform?',
      a: 'A stablecoin payments platform is infrastructure that enables businesses to send, receive, and settle payments using stablecoins. It typically includes on-ramp and off-ramp capabilities, compliance frameworks, FX management, and API-based integration. PayFuture operates as a stablecoin payments platform designed for B2B use cases, cross-border merchants, and payment service providers.',
    },
    {
      q: 'What is a stablecoin payment gateway?',
      a: 'A stablecoin payment gateway enables businesses to accept stablecoin payments from customers or counterparties. While a gateway handles the acceptance layer, broader infrastructure manages on-ramp, off-ramp, settlement, compliance, and local currency delivery. Businesses exploring stablecoin payment gateways for cross-border use cases often benefit from a more complete infrastructure layer.',
    },
    {
      q: 'What is stablecoin payment processing?',
      a: 'Stablecoin payment processing covers the full lifecycle of a stablecoin transaction, from initiation and compliance checks through fund movement and final settlement. A stablecoin payment processor handles the technical and operational complexity of executing transactions at scale, including on-chain execution, FX conversion, regulatory alignment, and delivery into local markets.',
    },
    {
      q: 'What is stablecoin payments infrastructure?',
      a: 'Stablecoin payments infrastructure refers to the systems, rails, compliance frameworks, and liquidity networks that power stablecoin-based fund movement. For businesses, accessing purpose-built infrastructure rather than building it in-house enables faster market entry, lower operational overhead, and more reliable cross-border payment performance.',
    },
    {
      q: 'How can businesses accept stablecoin payments?',
      a: 'Businesses can accept stablecoin payments by integrating with a stablecoin payments platform through an API. PayFuture provides API-based integration that allows businesses to accept stablecoin payments as part of a broader cross-border payment strategy, with support for scalable transaction handling and reliable processing across global markets.',
    },
    {
      q: 'What are the best APIs for stablecoin payments?',
      a: 'The best stablecoin payment APIs combine compliance infrastructure, on-ramp and off-ramp capabilities, multi-currency support, and reliable performance at scale. Businesses should look for APIs that handle the full payment lifecycle, including stablecoin settlement, FX conversion, and regulatory alignment for the markets in which they operate.',
    },
    {
      q: 'Can stablecoins be used for remittance payments?',
      a: 'Yes. Stablecoins are increasingly used for remittance payments, especially in corridors where traditional infrastructure is slow or costly. Stablecoin rails enable faster delivery, fewer intermediaries, and more predictable costs, which is especially valuable for high-frequency, lower-value cross-border remittance flows.',
    },
    {
      q: 'What stablecoin payment volume does PayFuture process?',
      a: 'PayFuture has processed over $1 billion in stablecoin payment volume in 2026, supporting B2B stablecoin payments across global and emerging markets. The platform’s wallets are on-chain, making volume blockchain-transparent and verifiable.',
    },
    {
      q: 'Are stablecoin payments compliant with financial regulations?',
      a: 'Stablecoin payments can be executed in a compliant manner when routed through regulated infrastructure. PayFuture operates within a globally licensed, regulated framework and supports KYC, AML, and local compliance requirements across the markets it serves.',
    },
    {
      q: 'What markets does PayFuture support for stablecoin cross-border payments?',
      a: 'PayFuture’s stablecoin payments infrastructure is designed for global and emerging market coverage, with a focus on high-growth corridors where traditional payment infrastructure is fragmented or slow. Corridor availability and settlement options depend on the market and use case.',
    },
    {
      q: 'How do businesses reduce cross-border payment costs with stablecoins?',
      a: 'Businesses can reduce cross-border payment costs with stablecoins by cutting out layers of intermediary banks, reducing reconciliation complexity, improving settlement speed, and lowering the operational overhead tied to delayed payments. The cost advantage is often most visible in fragmented or high-friction corridors.',
    },
    {
      q: 'Which industries benefit most from stablecoin payments?',
      a: 'Stablecoin payments are especially relevant for digital merchants, remittance providers, payment service providers, marketplaces, treasury teams, financial platforms, and businesses operating across emerging markets. These industries benefit most when speed, predictability, and corridor access matter.',
    },
    {
      q: 'How do stablecoin payments improve treasury operations?',
      a: 'Stablecoin payments can improve treasury operations by enabling faster internal fund movement, improving visibility into payment status, reducing settlement delays, and giving finance teams more control over international liquidity. This can help businesses manage working capital more efficiently across markets.',
    },
  ],
};
