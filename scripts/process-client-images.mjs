/**
 * One-off: optimize the client's dropped images (Gemini exports + logo) into
 * clean, web-sized filenames under public/images. Source PNGs are 1.6–2.3MB
 * each; this resizes + compresses them so the site stays fast.
 *
 * Safe to re-run only if the source files still exist; it deletes sources after
 * a successful write. Run: node scripts/process-client-images.mjs
 */
import sharp from 'sharp';
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const p = (rel) => path.join(root, rel);

async function jpg(src, dest, width) {
  await sharp(p(src)).resize({ width, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(p(dest) + '.tmp');
  // sharp can't write to the same file it's reading; use a tmp then swap.
  await rm(p(dest), { force: true });
  const fs = await import('node:fs/promises');
  await fs.rename(p(dest) + '.tmp', p(dest));
  console.log('jpg ->', dest);
}

// ---- Hero (living room) ----
await jpg('public/images/hero/Gemini_Generated_Image_rd360ird360ird36.png', 'public/images/hero/hero.jpg', 2000);
await rm(p('public/images/hero/Gemini_Generated_Image_rd360ird360ird36.png'), { force: true });

// ---- Gallery: source -> clean name (category-based) ----
const gallery = [
  ['Gemini_Generated_Image_45pe5545pe5545pe.png', 'community-1.jpg'], // two hands reaching
  ['Gemini_Generated_Image_eriuvperiuvperiu.png', 'community-2.jpg'], // walking toward the light
  ['Gemini_Generated_Image_j4cctcj4cctcj4cc.png', 'community-3.jpg'], // walking together (corridor)
  ['Gemini_Generated_Image_4976b04976b04976.png', 'wellness-1.jpg'],  // hands held / support
  ['Gemini_Generated_Image_uxn4v4uxn4v4uxn4.png', 'wellness-2.jpg'],  // stone + essential oil
  ['Gemini_Generated_Image_lh9j4llh9j4llh9j.png', 'wellness-3.jpg'],  // warm calm light
  ['Gemini_Generated_Image_wdfn61wdfn61wdfn.png', 'music-1.jpg'],     // guitar player
];
for (const [srcName, destName] of gallery) {
  await jpg(`public/images/gallery/${srcName}`, `public/images/gallery/${destName}`, 1400);
  await rm(p(`public/images/gallery/${srcName}`), { force: true });
}

// ---- Logo: trim transparent padding, resize for crisp small display ----
await sharp(p('public/images/logo/2F6C6177-8230-4BBA-9759-1B18CAED99C9 (1).png'))
  .trim()
  .resize({ height: 200, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(p('public/images/logo/logo.png') + '.tmp');
await rm(p('public/images/logo/logo.png'), { force: true });
const fs = await import('node:fs/promises');
await fs.rename(p('public/images/logo/logo.png') + '.tmp', p('public/images/logo/logo.png'));
await rm(p('public/images/logo/2F6C6177-8230-4BBA-9759-1B18CAED99C9 (1).png'), { force: true });
console.log('logo -> public/images/logo/logo.png');

console.log('Done.');
