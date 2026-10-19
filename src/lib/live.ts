// Data for the solution and industry pages, parsed from payfuture.net by scripts/parse-live.py.
const files = import.meta.glob('../data/live/*.json', { eager: true, import: 'default' }) as Record<string, LivePage>;

export interface LiveSection {
  eyebrow: string | null;
  title: string | null;
  text: string[];
  cards: { title: string; text: string }[];
  bullets: string[];
  tiles: string[];
  cta: string | null;
}
export interface LivePage {
  slug: string;
  group: 'solutions' | 'industries' | 'corridors';
  wpTitle: string;
  title: string;
  lead: string[];
  cta: string | null;
  sections: LiveSection[];
  faq: { q: string; a: string }[];
}

const all = Object.values(files);
export const livePages = (group: LivePage['group']) => all.filter((p) => p.group === group);
export const livePage = (slug: string) => all.find((p) => p.slug === slug)!;

/** Short label for cards and nav, from the page's own name. */
export const shortName: Record<string, string> = {
  'pay-ins': 'Pay-ins',
  payouts: 'Payouts',
  'real-time-payments': 'Real-time payments',
  'currency-management': 'Currency management',
  'smart-routing-and-cascading': 'Smart routing and cascading',
  'authorisation-optimisation': 'Authorisation optimisation',
  'fraud-and-risk-management': 'Fraud and risk management',
  'reconciliation-management': 'Reconciliation management',
  'reporting-and-analytics': 'Reporting and analytics',
  'banking-services': 'Banking services',
  recovery: 'Recovery',
  'e-learning': 'E-learning',
  streaming: 'Streaming',
  'video-gaming': 'Video gaming',
  'travel-agencies': 'Travel agencies',
  'remittance-providers': 'Remittance providers',
  partners: 'Partners',
};

const iconRules: [RegExp, string][] = [
  [/fraud|risk|secur|complian|regulat|kyc|aml|licen/i, 'shield'],
  [/currenc|fx|exchange|rate|settle|convert|price|pricing|fee|cost/i, 'coins'],
  [/real-time|fast|instant|speed|quick|monitor|24\/7|time/i, 'clock'],
  [/routing|route|retry|cascad|pathway|rail|integration|api|connect/i, 'route'],
  [/report|analytic|dashboard|insight|kpi|visib|track|reconcil|data/i, 'chart'],
  [/payout|disburse|transfer|fund|payment|pay-in|checkout|wallet|bank|iban|account/i, 'wallet'],
  [/local|market|region|global|expan|growth|scale|corridor|country|reach/i, 'globe'],
  [/support|team|customer|client|partner|merchant|people/i, 'users'],
  [/approval|optimi|convert|recover|revenue|abandon|a\/b|test/i, 'trend'],
  [/industr|supplier|manufactur|trade|sourcing|logistics|import|export/i, 'store'],
];
export const iconFor = (text: string, fallback = 'check') => iconRules.find(([re]) => re.test(text))?.[1] ?? fallback;
