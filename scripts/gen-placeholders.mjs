/**
 * Generates branded placeholder images directly into public/images so the site
 * looks complete before the client supplies real photography + logo.
 *
 * TODO[CLIENT]: overwrite these files with your real images, keeping the same
 * filenames (or update the references noted in each README.txt under
 * public/images).
 *
 * Run:  node scripts/gen-placeholders.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const galleryDir = path.join(publicDir, 'images/gallery');
const heroDir = path.join(publicDir, 'images/hero');
const logoDir = path.join(publicDir, 'images/logo');

for (const d of [galleryDir, heroDir, logoDir]) {
  await mkdir(d, { recursive: true });
}

const INK = '#1A1714';
const CHARCOAL = '#262019';
const GOLD = '#C9A24B';
const CREAM = '#F5EFE2';

const fleur = `
  <g fill="${GOLD}" opacity="0.9" transform="translate(%CX%,%CY%) scale(%SC%)">
    <path d="M32 4c-2.8 4.2-2.8 8.4 0 11.6 2.8-3.2 2.8-7.4 0-11.6z"/>
    <path d="M32 15c-3.6 2.3-5.6 5.9-5.6 9.8 0 4.3 2.5 7.6 5.6 10.1 3.1-2.5 5.6-5.8 5.6-10.1 0-3.9-2-7.5-5.6-9.8z"/>
    <path d="M19 23.5c-4.2 1.4-6.8 5.2-6.8 9.7 0 5.7 4.9 9.9 10.9 11.6-2.6-3.2-3.9-7-3.9-11 0-3.9 0-7.2-.2-10.3z"/>
    <path d="M45 23.5c4.2 1.4 6.8 5.2 6.8 9.7 0 5.7-4.9 9.9-10.9 11.6 2.6-3.2 3.9-7 3.9-11 0-3.9 0-7.2.2-10.3z"/>
    <rect x="19.5" y="38.2" width="25" height="3.6" rx="1.8"/>
    <path d="M32 40c-3.2 4.3-4.9 9.6-4.9 14.9 0 1.8 1.5 2.7 4.9 2.7s4.9-.9 4.9-2.7c0-5.3-1.7-10.6-4.9-14.9z"/>
  </g>`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function tile(rawLabel, w, h, bg) {
  const label = esc(rawLabel);
  const cx = w / 2 - 32 * 1.4;
  const cy = h / 2 - 60 * 1.4;
  const f = fleur.replaceAll('%CX%', cx).replaceAll('%CY%', cy).replaceAll('%SC%', '1.4');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${bg}"/>
        <stop offset="1" stop-color="${INK}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <rect x="8" y="8" width="${w - 16}" height="${h - 16}" fill="none" stroke="${GOLD}" stroke-opacity="0.25" stroke-width="2" rx="14"/>
    ${f}
    <text x="50%" y="${h / 2 + 70}" fill="${CREAM}" font-family="Georgia, serif" font-size="34" text-anchor="middle">${label}</text>
    <text x="50%" y="${h / 2 + 108}" fill="${GOLD}" font-family="Arial, sans-serif" font-size="16" letter-spacing="3" text-anchor="middle">PLACEHOLDER</text>
  </svg>`;
}

const items = [
  ['art-1.jpg', 'Art Therapy', CHARCOAL],
  ['music-1.jpg', 'Music Therapy', '#2A2118'],
  ['dance-1.jpg', 'Dance & Movement', CHARCOAL],
  ['recreation-1.jpg', 'Recreation', '#2A2118'],
  ['community-1.jpg', 'Community', CHARCOAL],
  ['wellness-1.jpg', 'Health & Wellness', '#2A2118'],
  ['events-1.jpg', 'Events', CHARCOAL],
  ['art-2.jpg', 'Creative Studio', '#2A2118'],
];

for (const [file, label, bg] of items) {
  await sharp(Buffer.from(tile(label, 1200, 900, bg)))
    .jpeg({ quality: 80 })
    .toFile(path.join(galleryDir, file));
  console.log('gallery:', file);
}

// Hero background placeholder (wide)
await sharp(Buffer.from(tile('Zion Classique Care', 2000, 1200, CHARCOAL)))
  .jpeg({ quality: 82 })
  .toFile(path.join(heroDir, 'hero.jpg'));
console.log('hero: hero.jpg');

// Logo placeholder — fleur-de-lis mark on transparent background.
await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
  ${fleur.replaceAll('%CX%', 16).replaceAll('%CY%', 14).replaceAll('%SC%', '2')}
</svg>`)).png().toFile(path.join(logoDir, 'logo.png'));
console.log('logo: logo.png');

// OG image (1200x630) into public/ root
await sharp(Buffer.from(tile('Care Like No Other', 1200, 630, CHARCOAL)))
  .png()
  .toFile(path.join(publicDir, 'og-default.png'));
console.log('public: og-default.png');

// Apple touch icon (180x180)
await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
  <rect width="180" height="180" rx="36" fill="${INK}"/>
  ${fleur.replaceAll('%CX%', 26).replaceAll('%CY%', 24).replaceAll('%SC%', '2')}
</svg>`)).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
console.log('public: apple-touch-icon.png');

console.log('Done.');
