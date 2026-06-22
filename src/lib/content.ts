import { getCollection } from 'astro:content';
import { createServerClient, supabaseConfigured, type GalleryItem, type Post } from './supabase';
import { getGalleryImageUrl } from './galleryImages';

/**
 * Gallery items, live from Supabase when configured. Falls back to the bundled
 * content collection so the site still renders before keys are set or if the
 * database is briefly unreachable.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (supabaseConfigured) {
    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      if (data && data.length) return data as GalleryItem[];
    } catch (err) {
      console.error('[gallery] Supabase read failed, using content fallback:', err);
    }
  }
  // Fallback: file-based content collection.
  const entries = await getCollection('gallery');
  return entries
    .map((e) => ({
      image_url: getGalleryImageUrl(e.data.image),
      alt: e.data.alt,
      category: e.data.category,
      caption: e.data.caption ?? null,
      sort_order: e.data.order,
    }))
    .sort((a, b) => a.sort_order - b.sort_order);
}

/** Published posts, newest first. Empty array when Supabase isn't configured. */
export async function getPublishedPosts(): Promise<Post[]> {
  if (!supabaseConfigured) return [];
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as Post[];
  } catch (err) {
    console.error('[blog] Supabase read failed:', err);
    return [];
  }
}

/** A single published post by slug, or null. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!supabaseConfigured) return null;
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();
    if (error) throw error;
    return (data as Post) ?? null;
  } catch (err) {
    console.error('[blog] Supabase post read failed:', err);
    return null;
  }
}
