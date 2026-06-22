/**
 * Single source of truth for site-wide constants: contact data, nav, SEO.
 *
 * Contact data is from the client brochure.
 * TODO[CLIENT TO CONFIRM]: the brochure lists three phone numbers — confirm
 * which is PRIMARY (currently the first) and which should be featured in the
 * header CTA / floating button. Verify address + email before launch.
 */

export const SITE = {
  name: 'Zion Classique Care & Human Services',
  shortName: 'Zion Classique Care',
  tagline: 'Care Like No Other',
  // TODO[CLIENT]: replace with the real production domain.
  url: 'https://zionclassiquecare.com',
  description:
    'A warm, dignified behavioral health and substance-abuse residential facility in Chandler, Arizona. Individualized, evidence-based care that helps people heal and return to home, work, and community.',
} as const;

export const CONTACT = {
  address: {
    street: '3306 E Bluejay Drive',
    city: 'Chandler',
    region: 'AZ',
    postalCode: '85286',
    country: 'US',
  },
  // First number is treated as PRIMARY for the header CTA + floating button.
  phones: [
    { label: '(480) 590-0357', tel: '+14805900357', primary: true },
    { label: '(347) 603-5168', tel: '+13476035168', primary: false },
    { label: '(480) 474-4540', tel: '+14804744540', primary: false },
  ],
  email: 'zionpalace01@gmail.com',
  hours: "We're here 24/7 — help is only one call away.",
  // Approx geo for Chandler AZ 85286 — refine if exact rooftop coords are provided.
  geo: { latitude: 33.2828, longitude: -111.8043 },
} as const;

export const PRIMARY_PHONE = CONTACT.phones.find((p) => p.primary) ?? CONTACT.phones[0];

export const FULL_ADDRESS = `${CONTACT.address.street}, ${CONTACT.address.city}, ${CONTACT.address.region} ${CONTACT.address.postalCode}`;

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'News', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;
