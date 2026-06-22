import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

/** True only when real credentials are present (not the placeholder values). */
export const supabaseConfigured = Boolean(
  url && anon && !url.includes('YOUR-PROJECT-REF') && !anon.includes('YOUR-ANON')
);

/** Anonymous client for server-side reads (SSR / build). No session persistence. */
export function createServerClient(): SupabaseClient {
  return createClient(url!, anon!, { auth: { persistSession: false } });
}

export interface GalleryItem {
  id?: string;
  image_url: string;
  alt: string;
  category: 'art' | 'music' | 'dance' | 'recreation' | 'community' | 'wellness' | 'events';
  caption?: string | null;
  sort_order: number;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  body?: string | null;
  cover_url?: string | null;
  published: boolean;
  published_at?: string | null;
  created_at: string;
}
