// Contact page. Email, socials and offices are from payfuture.net (Contact and Careers pages).
import { footer } from './site';

export const hero = {
  title: 'Get in *touch* with us.',
  text: 'We’re here to assist you. Tell us the corridor and the direction, and we’ll map it with you.',
};

export const info = {
  title: 'Contact info',
  text: 'We are always happy to assist you',
  email: footer.email,
  socials: footer.socials,
};

// `tz` drives the live local-time clock on each card.
export const offices = [
  { city: 'London', country: 'United Kingdom', tz: 'Europe/London', note: 'Headquarters' },
  { city: 'Dubai', country: 'United Arab Emirates', tz: 'Asia/Dubai' },
  { city: 'Valletta', country: 'Malta', tz: 'Europe/Malta' },
  { city: 'Manila', country: 'Philippines', tz: 'Asia/Manila' },
];

export const form = {
  title: 'Send us a message',
  corridorsLabel: 'Which corridors are you interested in?',
  corridors: ['India', 'Pakistan', 'Nigeria', 'Philippines', 'Egypt', 'Somewhere else'],
  directionLabel: 'Direction of money',
  directions: ['Money in', 'Money out', 'Both'],
};

export const newsletter = {
  title: 'Subscribe to our newsletter',
  text: 'Stay informed about the latest company news, product updates, and exciting announcements by subscribing to our newsletter',
};
