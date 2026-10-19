// Careers, from payfuture.net/careers. Roles and office photos are the client's own.
import { footer } from './site';
import { offices } from './contact';

export const hero = {
  title: 'Looking for a job? *Think bigger*',
  // First sentence is from the live page. The positioning line replaces "leading payment gateway connector".
  text: 'At Payfuture, you’re embarking on a career where your ideas take centre stage, your voice is valued, and your work shapes the future of payments. We provide compliant fiat and stablecoin rails for money moving into and out of emerging markets, and we’re redefining how it reaches the last mile. Ready to join the payments revolution?',
  cta: { label: 'See open roles', href: '#roles' },
};

export const banner = {
  image: { src: '/img/careers/team-2.webp', alt: 'The Payfuture team gathered in the office' },
  stats: [
    { value: 120, suffix: '+', label: 'people' },
    { value: 20, suffix: '+', label: 'nationalities' },
    { value: 4, suffix: '', label: 'offices' },
  ],
};

export const reel = [
  { src: '/img/careers/team-4.webp', alt: 'The Payfuture team at an industry event stand' },
  { src: '/img/careers/team-1.webp', alt: 'Two colleagues in front of the Payfuture logo wall' },
  { src: '/img/careers/team-3.jpg', alt: 'Colleagues celebrating at the office' },
  { src: '/img/careers/team-2.webp', alt: 'The Payfuture team gathered in the office' },
];

export const life = {
  title: 'Life at Payfuture',
  paragraphs: [
    'Every day is a chance to grow, collaborate, and create something extraordinary. With offices spanning the globe—from dynamic tech hubs to vibrant cultural centres - our diverse team thrives on innovation, teamwork, and the pursuit of excellence.',
    'We believe in working smart and celebrating big. Whether it’s career-defining projects, hands-on learning, or moments of joy with colleagues, life at PayFuture is about making an impact while having fun.',
    'At Payfuture, we believe in working hard and celebrating even harder.  We are big on learning too, with opportunities for professional development and hands-on experience that keeps you ahead of the curve.',
  ],
  image: { src: '/img/careers/team-4.webp', alt: 'The Payfuture team at an industry event stand' },
};

export const culture = {
  title: 'Our culture',
  text: 'Our culture is built on five core values that drive everything we do:',
  closing:
    'We are dreamers, doers, and disruptors, united by a shared mission. Our fast-paced and collaborative culture celebrates diverse perspectives as the fuel for innovation and success.',
  values: [
    { title: 'Belief', text: 'In the company’s vision, the team and yourself to achieve your full potential' },
    { title: 'Positivity', text: 'Always be positive even in the face of adversity' },
    { title: 'Accountability & ownership', text: 'To be invested, committed and accountable for your tasks' },
    { title: 'Speed', text: 'We need speed of execution, process and accountability' },
    { title: 'Execution', text: 'To execute our deliverables against our KPIs.' },
  ],
};

export const hiring = {
  title: 'How we hire',
  text: 'At Payfuture, we care more about finding the perfect match than simply filling a role. Our transparent and engaging hiring process ensures every candidate feels the essence of what it means to be a Payfuturist. Here is how the journey unfolds:',
  steps: [
    {
      title: 'Discovery',
      text: 'Kickstart your journey with an introductory call with our Talent team. Understand what makes Payfuture extraordinary while we learn about your goals and how they align with the opportunity.',
    },
    {
      title: 'Assessments',
      text: 'Depending on the role, you will be invited to complete customised assessments, either virtually or in person. These allow us to appreciate your skills, expertise and unique contributions.',
    },
    {
      title: 'Culture dive',
      text: 'Meet our incredible team and share your professional journey. Explore how our values resonate with yours and discover the cultural fit that sparks mutual growth.',
    },
    {
      title: 'Meet the team',
      text: 'Engage in an inspiring dialogue with a member of our leadership team. Gain deeper insights into our mission and discuss the impact you are poised to make.',
    },
    {
      title: 'Leader insights',
      text: 'Engage in an inspiring dialogue with a member of our leadership team. Gain deeper insights into our mission and discuss the impact you are poised to make.',
    },
  ],
};

export const payfuturist = {
  title: 'Are you the next Payfuturist?',
  text: 'Do you see challenges as opportunities? Do you have the courage to innovate and the grit to see it through? If yes, you will fit right in at Payfuture.',
  items: [
    { icon: 'bolt', title: 'Go-Getters', text: 'Those who take ownership and thrive in a fast-paced environment.' },
    { icon: 'users', title: 'Collaborators', text: 'Team players who bring out the best in others.' },
    { icon: 'eye', title: 'Learners', text: 'Individuals who are constantly curious and eager to grow.' },
    { icon: 'growth', title: 'Game-Changers', text: 'Innovators who are not afraid to disrupt the status quo.' },
  ],
};

export const roles = {
  title: 'Ready to make your mark? Join us today!',
  items: [
    {
      team: 'Product',
      title: 'Product Owner',
      location: 'Dubai, United Arab Emirates',
      href: 'https://apply.workable.com/payfuture/j/EA15881445/',
    },
    {
      team: 'Legal',
      title: 'Head of Legal',
      location: 'Birkirkara, Malta',
      href: 'https://apply.workable.com/payfuture/j/94C0D8DDCB/',
    },
  ],
};

const officePhotos: Record<string, string> = {
  London: '/img/careers/office-london.webp',
  Dubai: '/img/careers/office-dubai.webp',
  Valletta: '/img/careers/office-valletta.png',
  Manila: '/img/careers/office-manila.png',
};

export const locations = {
  title: 'Office locations',
  items: offices.map((o) => ({ ...o, photo: officePhotos[o.city] })),
};

export const pitch = {
  title: 'Don’t see your perfect fit here?',
  text: 'Pitch your dream role to us!',
  cta: { label: 'Email careers@payfuture.net', href: 'mailto:careers@payfuture.net' },
};

export const socials = footer.socials;
