import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
  type: 'data', // JSON entries — one file per review in src/content/reviews/
  schema: z.object({
    name: z.string(),
    relationship: z.string().optional(), // e.g. "Family member", "Former resident"
    rating: z.number().min(1).max(5).default(5),
    quote: z.string(),
    date: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const gallery = defineCollection({
  type: 'data', // JSON entries — one file per image in src/content/gallery/
  schema: z.object({
    // Filename of an image placed in src/assets/gallery/ (e.g. "art-1.jpg").
    image: z.string(),
    alt: z.string(), // required for accessibility
    category: z.enum(['art', 'music', 'dance', 'recreation', 'community', 'wellness', 'events']),
    caption: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { reviews, gallery };
