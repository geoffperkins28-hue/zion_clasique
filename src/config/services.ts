/** Service data shared by the Home preview and the Services page. */
export interface Service {
  icon: string;
  title: string;
  description: string;
  /** Surfaced on the homepage preview when true. */
  featured?: boolean;
}

export const CORE_SERVICES: Service[] = [
  {
    icon: 'network',
    title: 'Comprehensive care coordination',
    description:
      'We connect the dots between tribal services, primary care physicians, and local providers so nothing falls through the cracks — one team working toward one plan.',
    featured: true,
  },
  {
    icon: 'brain',
    title: 'Psychological evaluation & assessment',
    description:
      'Thorough mental health assessments help us truly understand each person, so care is built around who they are — not a one-size-fits-all program.',
    featured: true,
  },
  {
    icon: 'steps',
    title: 'Progressive phase program',
    description:
      'A step-by-step path grounded in evidence-based practices, meeting people where they are and helping them move forward at a pace that lasts.',
    featured: true,
  },
  {
    icon: 'users',
    title: 'Community engagement activities',
    description:
      'Meaningful connection is part of healing. We create real opportunities to belong, contribute, and rebuild confidence alongside others.',
  },
  {
    icon: 'talk',
    title: 'Group & individual counselling',
    description:
      'Compassionate, professional counselling — one-on-one and in groups — that gives people space to be heard and tools to keep growing.',
    featured: true,
  },
  {
    icon: 'sprout',
    title: 'Life skills training',
    description:
      'Practical, everyday skills that restore independence and dignity, from daily routines to managing a household with confidence.',
  },
  {
    icon: 'briefcase',
    title: 'Vocational & job readiness',
    description:
      'Support to prepare for work and re-enter the community — building the habits, skills, and confidence that lead to lasting stability.',
  },
];

export const NON_TRADITIONAL_THERAPIES: Service[] = [
  {
    icon: 'palette',
    title: 'Art therapy',
    description: 'Creative expression that opens doors when words are hard to find.',
  },
  {
    icon: 'music',
    title: 'Music therapy',
    description: 'Rhythm and song that soothe, connect, and lift the spirit.',
  },
  {
    icon: 'globe',
    title: 'Cultural competency therapy',
    description: 'Care that honors each person’s background, identity, and story.',
  },
  {
    icon: 'heart',
    title: 'Health & wellness groups',
    description: 'Group activities that nurture the whole person, body and mind.',
  },
  {
    icon: 'activity',
    title: 'Dance & movement',
    description: 'Joyful movement that releases tension and restores energy.',
  },
  {
    icon: 'sun',
    title: 'Recreational activities',
    description: 'Time to play, relax, and simply enjoy being part of a community.',
  },
];
