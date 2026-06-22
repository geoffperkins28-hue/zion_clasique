# Zion Classique Care & Human Services — Website

Marketing site built with **Astro + Tailwind**, with a **Supabase-powered owner
dashboard**, deployed to **Vercel**. Goal: build trust with families, case
managers, and referring clinicians and drive **calls** and **contact submissions**.
No patient logins, no PHI.

## Stack
- **Astro 5** — static brochure pages + on-demand SSR (Vercel adapter) for dynamic pages
- **Tailwind CSS**, Google Maps embed, Fraunces + Plus Jakarta Sans fonts
- **Supabase** — Postgres + Storage + Auth, powering the gallery, blog, contact messages, and the owner dashboard
- `marked` (markdown → HTML for blog), `@astrojs/sitemap`

### Static vs dynamic
- **Static (prerendered, zero JS):** Home, About, Services, Contact — fast, SEO-friendly. Hero image is static.
- **Dynamic (SSR from Supabase):** `/gallery`, `/blog`, `/blog/[slug]`, `/admin`. The gallery falls back to the bundled content collection if Supabase is unreachable.

## Setup
1. `npm install`
2. Copy `.env.example` → `.env` and fill in `PUBLIC_SUPABASE_URL` + `PUBLIC_SUPABASE_ANON_KEY` (Supabase → Settings → API).
3. In Supabase SQL Editor, run the migrations in order: `supabase/migrations/0001_init.sql` then `0002_messages.sql`.
4. In Supabase → Authentication → Users → **Add user** (Auto Confirm) to create the owner login for `/admin`.
5. `npm run dev` → http://localhost:4321

## Owner dashboard — `/admin`
Log in with the owner account. Three tabs:
- **Gallery** — upload event/activity photos (→ Supabase Storage), set category/caption/order, delete. Shows on `/gallery` instantly.
- **News & events** — create/edit/delete blog posts (title, slug, cover image, summary, body, publish toggle). Shows on `/blog` instantly.
- **Messages** — read contact-form submissions, click-to-call/email, mark handled, delete.

`/admin` is `noindex` and excluded from the sitemap + robots.

## Deploy (Vercel)
1. Push to your GitHub repo, import it in Vercel (Astro is auto-detected via `@astrojs/vercel`).
2. In Vercel → Project → Settings → Environment Variables, add `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.
3. Deploy. Set the production domain in `astro.config.mjs` (`site`), `src/config/site.ts` (`SITE.url`), and `public/robots.txt`.

## Run locally
```bash
npm run dev        # http://localhost:4321
npm run build      # production build (.vercel/output)
```

## Images (drop into `public/images/`)
Images are served straight from `public/` — drop files in and they appear. They
are **not** auto-optimized, so size/compress before adding. Each folder has a
`README.txt` with exact filenames + recommended dimensions.
- **Hero:** `public/images/hero/hero.jpg`
- **Logo:** `public/images/logo/logo.png` (used in header + footer)
- **Gallery:** `public/images/gallery/` + a JSON entry per photo (see below)

Regenerate the placeholder set anytime with `node scripts/gen-placeholders.mjs`
(writes into `public/images/`). Overwrite placeholders using the same filenames.

## Editing content
- **Gallery & blog:** use the `/admin` dashboard (no code).
- **Reviews:** add a JSON file in `src/content/reviews/`. Set `"featured": true` to show it on the homepage. (Schema in `src/content/config.ts`.) The gallery content collection still exists only as an offline fallback.
- **Services:** edit `src/config/services.ts`.
- **Contact info / nav:** edit `src/config/site.ts`.

## ⚠️ Before launch — items the client must provide / confirm
Search the codebase for `TODO[CLIENT` to find each in context.

1. ~~**Brand logo**~~ — ✅ real fleur-de-lis emblem in place at `public/images/logo/logo.png`. (The favicon + divider/watermark still use the simpler inline motif in `src/components/FleurDeLis.astro` — swap if you want them to match the emblem exactly.)
2. ~~**Hero + gallery photos**~~ — ✅ real images wired in (`public/images/hero/hero.jpg` + 7 gallery photos). Still placeholder: `public/og-default.png` (social-share preview image).
3. **Reviews** — replace the three sample reviews with real ones.
4. **Phone numbers** — confirm which of the three is PRIMARY (set in `src/config/site.ts`). The primary number powers the header CTA + floating call button.
5. **Address / email** — verify in `src/config/site.ts`.
6. **Production domain** — set in `astro.config.mjs` (`site`), `src/config/site.ts` (`SITE.url`), and `public/robots.txt`.

## Accessibility & SEO notes
- WCAG AA color contrast (cream body text on dark; gold reserved for headings/accents).
- Keyboard-navigable nav, gallery filters, and lightbox; `prefers-reduced-motion` respected.
- Per-page titles/meta, Open Graph/Twitter tags, `MedicalBusiness`/`LocalBusiness` JSON-LD, sitemap + robots.txt.
