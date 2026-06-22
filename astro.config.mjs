// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// TODO[CLIENT]: replace with the real production domain before launch.
const SITE_URL = 'https://zionclassiquecare.com';

// https://astro.build/config
// Output stays "static" (brochure pages prerender + ship zero JS); pages that
// need live Supabase data opt in to on-demand SSR via `export const prerender = false`.
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  adapter: vercel(),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({ filter: (page) => !page.includes('/admin') }),
  ],
  vite: {
    // Pre-bundle the Supabase client so the browser import resolves reliably
    // (avoids intermittent 504s from Vite's on-demand dep optimizer).
    optimizeDeps: { include: ['@supabase/supabase-js'] },
  },
});
