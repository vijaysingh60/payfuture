// Payment security, from payfuture.net/payment-security.
// NOTE: this copy is written for the old merchant/gateway positioning and should be reviewed for the B2B story.
import { routes } from './site';

export const hero = {
  eyebrow: 'Smart fraud detection and risk management',
  title: 'Protect your business against *fraud*',
  text: 'PayFuture’s Fraud Risk Management uses AI-driven technology and multi-layered security to monitor transactions, helping businesses operate confidently across diverse regions',
  cta: { label: 'Contact Payfuture today', href: routes.contact },
};

// Illustrative rows for the animated screening panel (not real transactions).
export const screening = {
  title: 'Live screening',
  rows: [
    { to: 'india', route: 'UK → India', amt: 'USD 4,200', status: 'Cleared', kind: '' },
    { to: 'pakistan', route: 'UAE → Pakistan', amt: 'USD 1,150', status: 'Cleared', kind: '' },
    { to: 'nigeria', route: 'UK → Nigeria', amt: 'USD 18,900', status: 'Review', kind: 'review' },
    { to: 'philippines', route: 'US → Philippines', amt: 'USD 760', status: 'Cleared', kind: '' },
    { to: 'egypt', route: 'EU → Egypt', amt: 'USD 2,300', status: 'Cleared', kind: '' },
    { to: 'india', route: 'Unknown → India', amt: 'USD 9,400', status: 'Blocked', kind: 'blocked' },
  ],
};

export const tools = {
  title: 'Advanced risk management tools for emerging markets',
  items: [
    {
      icon: 'chart',
      title: 'Tailored fraud monitoring',
      text: 'PayFuture evaluates merchant risk profiles using real-time data analysis. This aids in spotting odd trends that can indicate increased risk',
    },
    {
      icon: 'repeat',
      title: 'Smart transaction routing of failed payments',
      text: 'We ensure that a failed transaction isn’t a lost transaction. Our system reattempts processing, increasing the chances of successful payments',
    },
    {
      icon: 'shield',
      title: 'Risk evaluation',
      text: 'Emerging markets often have unstable economic and political environments. We asses geopolitical risks, currency fluctuations and regulatory landscape to these regions',
    },
    {
      icon: 'pin',
      title: 'Geolocation and device fingerprinting',
      text: 'Our advanced technology detects anomalies in device usage and user location, adding an extra layer of security to prevent fraudulent access',
    },
  ],
};

export const mitigate = {
  title: 'How do we help merchants mitigate risks in emerging markets?',
  items: [
    {
      icon: 'clock',
      title: 'Real-time monitoring',
      text: 'PayFuture uses a real-time Risk Management System that monitors each transaction and continuously updates risk models once a transaction is initiated',
    },
    {
      icon: 'route',
      title: 'Operational instability',
      text: 'Emerging markets may face infrastructural challenges like unreliable internet connectivity, affecting payment gateways. PayFuture helps mitigate this by providing reliable alternative payment solutions and backup systems',
    },
    {
      icon: 'headset',
      title: 'Customer support at all times',
      text: 'At PayFuture, we offer 24/7 customer support and risk management services to help merchants maintain trust and efficiency. Our dedicated team provides prompt assistance and proactive solutions to tackle challenges and keep your business running smoothly',
    },
  ],
};

export const closing = {
  title: 'Ready to elevate your payment experience in emerging markets?',
  cta: { label: 'Contact Payfuture today', href: routes.contact },
};
