/**
 * Gallery images live in public/images/gallery/ and are referenced by bare
 * filename in the content-collection entries (e.g. "art-1.jpg"). This builds
 * the public URL. Files in public/ are served as-is (no build-time
 * optimization), so size/compress source images before adding them.
 */
export function getGalleryImageUrl(filename: string): string {
  return `/images/gallery/${filename}`;
}
