// Global mass payments, from the live page (payfuture.net/solutions/global-mass-payments/).
import { routes } from './site';

export const meta = {
  title: 'Global Mass Payments Infrastructure | Payfuture',
  description:
    "Send bulk payments to thousands of recipients across borders. Payfuture's global mass payments platform supports compliant, scalable multi-currency disbursements.",
};

export const hero = {
  title: 'Global mass payments infrastructure for *high-volume disbursements*',
  text: "Send payments to thousands of recipients across multiple markets in a single execution. Payfuture's global mass payments platform is built for businesses that need to disburse funds at scale — compliantly, efficiently, and without operational friction.",
  cta: { label: 'Talk to us', href: routes.contact },
  image: { src: '/img/pages/mass-hero.webp', alt: 'A busy market street in Morocco' },
  chips: [
    { icon: 'layers', title: 'One batch run', sub: 'Thousands of recipients' },
    { icon: 'check', title: 'Batch settled', sub: 'Across multiple corridors' },
  ],
};

export const what = {
  eyebrow: 'What are global mass payments?',
  text: 'Global mass payments enable businesses to send large volumes of payments to multiple recipients across different countries and currencies in a single batch. Rather than processing each transaction individually, a mass payment solution consolidates disbursements into one structured execution — reducing time, cost, and manual effort for finance and operations teams.',
  more: 'Businesses across e-commerce, gig platforms, marketplaces, SaaS, and B2B services rely on mass payout solutions to manage vendor settlements, partner commissions, supplier payments, affiliate payouts, and workforce disbursements at scale.',
};

export const who = {
  eyebrow: 'Use cases across industries',
  title: 'Who uses global mass payment solutions?',
  list: [
    'Marketplaces and platforms — settle sellers, vendors, and merchants across multiple markets simultaneously',
    'Gig and on-demand businesses — disburse earnings, tips, and incentives to contractors and freelancers globally',
    'Affiliate and partner networks — execute monthly commission and reward payouts across regions',
    'E-commerce and retail — manage supplier and logistics partner settlements across corridors',
    'Financial services and fintech — support high-volume client disbursements, refunds, and treasury flows',
  ],
  cta: { label: 'Talk to our mass payments team', href: routes.contact },
  image: { src: '/img/pages/challenges.webp', alt: 'Payfuture dashboard showing payouts across markets' },
};

export const challenges = {
  title: 'Challenges businesses face with high-volume global disbursements',
  text: 'Executing mass payments across borders introduces layers of complexity that standard banking infrastructure was not designed to handle efficiently.',
  tabs: [
    {
      label: 'Operational complexity at scale',
      text: 'Processing hundreds or thousands of individual payments manually increases error risk, delays settlement, and places significant strain on finance teams. Without a structured mass payment solution, each transaction requires individual handling — documentation, FX conversion, compliance checks, and reconciliation.',
      img: '/img/pages/mass-ch-1.webp',
    },
    {
      label: 'Multi-currency and FX exposure',
      text: 'Disbursing to recipients across different markets means managing multiple currencies simultaneously. Variable FX rates, hidden markups, and fragmented conversion processes make cost forecasting difficult and erode margins.',
      img: '/img/pages/mass-ch-2.webp',
    },
    {
      label: 'Compliance and regulatory requirements',
      text: "Global mass payouts must meet KYC, AML, and local regulatory requirements across each recipient's jurisdiction. Non-compliance creates payment delays, rejections, and reputational risk.",
      img: '/img/pages/mass-ch-3.webp',
    },
    {
      label: 'Settlement visibility',
      text: 'Without centralised tracking, businesses lose visibility into which payments have settled, which are pending, and which have failed — creating reconciliation gaps and operational follow-ups.',
      img: '/img/pages/mass-ch-4.webp',
    },
  ],
};

export const support = {
  title: 'How Payfuture supports global mass payments',
  items: [
    {
      title: 'Batch disbursement infrastructure',
      text: 'Execute bulk payment runs to thousands of recipients across multiple corridors from a single platform — without manual processing or fragmented banking relationships.',
    },
    {
      title: 'Multi-currency settlement',
      text: 'Manage disbursements across multiple currencies with clear FX fees and defined conversion pathways, giving treasury teams better control over costs and forecasting.',
    },
    {
      title: 'Compliance-aligned execution',
      text: "Payfuture's infrastructure supports regulatory alignment across recipient jurisdictions — including documentation requirements, KYC processes, and local compliance frameworks — reducing the risk of payment failures.",
    },
    {
      title: 'Settlement visibility and reconciliation',
      text: 'Track payment status across your entire disbursement batch. Structured reporting gives finance teams clear visibility into settled, pending, and failed transactions without manual follow-up.',
    },
    {
      title: 'API-ready integration',
      text: "Connect Payfuture's mass payout infrastructure to your existing ERP, marketplace platform, or financial stack through a clean API — enabling automated disbursement workflows without operational constraints.",
    },
  ],
  cta: { label: 'Talk to our mass payments team', href: routes.contact },
};

export const why = {
  eyebrow: 'Why Payfuture',
  text: 'Most payment providers offer bulk disbursements as an add-on. Payfuture is built specifically for high-volume cross-border disbursements — which means fewer workarounds, less manual intervention, and better outcomes for your finance and operations teams.',
  without: {
    title: 'With standard banking infrastructure',
    items: [
      'Manual file handling and reconciliation',
      'Hidden FX markups eroding margins',
      'Compliance managed ad hoc across jurisdictions',
      'Limited real-time settlement visibility',
    ],
  },
  with: {
    title: 'With Payfuture',
    items: [
      'Automated batch execution via API or platform upload',
      'Transparent FX fees — no hidden conversion costs',
      'Compliance built in across recipient jurisdictions',
      'Real-time tracking across your full disbursement run',
    ],
  },
};

export const steps = {
  title: 'Three steps to execute global mass payments',
  items: [
    {
      title: 'Define your disbursement run',
      text: 'Upload your recipient list, payment amounts, currencies, and required documentation through the platform or API',
    },
    { title: 'Review and approve', text: 'Validate payment details, confirm FX rates, and review compliance flags before execution' },
    {
      title: 'Execute and track',
      text: 'Payfuture processes the batch across corridors and provides settlement status across your full disbursement run',
    },
  ],
};

export const industries = {
  title: 'Industries using global mass payment infrastructure',
  items: [
    { icon: 'store', title: 'Marketplaces', text: 'Vendor and seller settlements across markets' },
    { icon: 'bolt', title: 'Gig economy', text: 'Contractor earnings and incentive payouts' },
    { icon: 'users', title: 'Affiliate networks', text: 'Commission disbursements to global partners' },
    { icon: 'cart', title: 'E-commerce', text: 'Supplier and logistics payments' },
    { icon: 'layers', title: 'SaaS / Technology', text: 'Revenue share, rebates, and platform payouts' },
    { icon: 'building', title: 'Financial services', text: 'Client disbursements and treasury flows' },
  ],
};

export const faqs = {
  title: 'FAQs - Global mass payments',
  items: [
    {
      q: 'What is a global mass payment?',
      a: 'A global mass payment is a bulk disbursement that sends funds to multiple recipients across different countries and currencies in a single batch execution, rather than processing each transaction individually.',
    },
    {
      q: 'What is the difference between mass payments and mass payouts?',
      a: 'The terms are often used interchangeably. Mass payments typically refers to the outbound disbursement process from a business to recipients. Mass payouts is commonly used in marketplace and platform contexts where funds are distributed to sellers, contractors, or partners.',
    },
    {
      q: 'How do businesses execute global mass payment runs?',
      a: 'Businesses typically upload a recipient file, validate payment details, confirm FX rates, and execute the batch through a mass payment platform or API. The platform handles routing, compliance checks, and settlement across each corridor.',
    },
    {
      q: 'What currencies and corridors does Payfuture support for mass payments?',
      a: 'Contact our team to discuss supported corridors, currencies, and settlement models aligned with your specific disbursement needs.',
    },
    {
      q: 'How do global mass payments handle compliance?',
      a: 'Mass payment infrastructure should support KYC, AML, local regulatory documentation, and purpose code requirements across each recipient jurisdiction to reduce the risk of payment delays or rejections.',
    },
  ],
};
