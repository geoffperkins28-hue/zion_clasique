-- Zion Classique Care — database schema for the owner dashboard
-- Run this in your new Supabase project: SQL Editor → paste → Run.
-- Safe to re-run (idempotent where practical).

-- =====================================================================
-- Tables
-- =====================================================================

create table if not exists public.gallery_images (
  id          uuid primary key default gen_random_uuid(),
  image_url   text not null,
  alt         text not null,
  category    text not null check (category in
                ('art','music','dance','recreation','community','wellness','events')),
  caption     text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text,
  body          text,                       -- markdown
  cover_url     text,
  published     boolean not null default false,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists posts_published_idx on public.posts (published, published_at desc);
create index if not exists gallery_sort_idx on public.gallery_images (sort_order);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at before update on public.posts
  for each row execute function public.set_updated_at();

-- =====================================================================
-- Row Level Security
-- =====================================================================
alter table public.gallery_images enable row level security;
alter table public.posts          enable row level security;

-- Gallery: anyone can read; only signed-in (owner) can change.
drop policy if exists gallery_public_read on public.gallery_images;
create policy gallery_public_read on public.gallery_images
  for select using (true);

drop policy if exists gallery_auth_write on public.gallery_images;
create policy gallery_auth_write on public.gallery_images
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Posts: public can read only published; owner can read/write everything.
drop policy if exists posts_public_read on public.posts;
create policy posts_public_read on public.posts
  for select using (published = true);

drop policy if exists posts_auth_read on public.posts;
create policy posts_auth_read on public.posts
  for select using (auth.role() = 'authenticated');

drop policy if exists posts_auth_write on public.posts;
create policy posts_auth_write on public.posts
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- =====================================================================
-- Storage buckets (public read) + policies
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('gallery','gallery', true), ('blog','blog', true)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id in ('gallery','blog'));

drop policy if exists "media auth write" on storage.objects;
create policy "media auth write" on storage.objects
  for insert with check (bucket_id in ('gallery','blog') and auth.role() = 'authenticated');

drop policy if exists "media auth update" on storage.objects;
create policy "media auth update" on storage.objects
  for update using (bucket_id in ('gallery','blog') and auth.role() = 'authenticated');

drop policy if exists "media auth delete" on storage.objects;
create policy "media auth delete" on storage.objects
  for delete using (bucket_id in ('gallery','blog') and auth.role() = 'authenticated');

-- =====================================================================
-- Seed: the current gallery (images already live in /public/images/gallery)
-- =====================================================================
insert into public.gallery_images (image_url, alt, category, caption, sort_order) values
  ('/images/gallery/community-1.jpg', 'Two hands reaching toward one another against a warm, dark backdrop', 'community', 'Connection is where healing begins', 1),
  ('/images/gallery/music-1.jpg', 'A resident playing acoustic guitar in a sunlit room', 'music', 'Finding expression and calm through music', 2),
  ('/images/gallery/art-1.jpg', 'Paintbrushes, handmade paper, and a bowl of ink laid out for an art session', 'art', 'Room to create, room to heal', 3),
  ('/images/gallery/wellness-1.jpg', 'A caregiver gently holding a resident''s hands during a supportive conversation', 'wellness', 'Steady, compassionate support', 4),
  ('/images/gallery/wellness-2.jpg', 'A smooth stone beside a small bottle of essential oil, softly lit', 'wellness', 'Calm, restorative wellness practices', 5),
  ('/images/gallery/community-2.jpg', 'Two residents walking together toward the light at the end of a hallway', 'community', 'Walking the path forward, together', 6),
  ('/images/gallery/music-2.jpg', 'An acoustic guitar resting against a softly lit wall', 'music', 'Always an instrument within reach', 7),
  ('/images/gallery/community-3.jpg', 'Three people walking side by side down a warmly lit hallway', 'community', 'No one walks the journey alone', 8)
on conflict do nothing;

-- =====================================================================
-- Seed: one sample blog post so /blog isn't empty
-- =====================================================================
insert into public.posts (slug, title, excerpt, body, published, published_at) values
  ('welcome-to-our-news',
   'Welcome to our news & events',
   'A new place to follow life at Zion Classique Care — milestones, activities, and the moments that make us who we are.',
   E'We are glad you are here.\n\nThis is where we will share updates from our community: new activities, seasonal events, and the everyday moments of healing and connection that happen at Zion Classique Care.\n\nCheck back often — and if you have a question about our care, [reach out any time](/contact). We are here 24/7.',
   true, now())
on conflict (slug) do nothing;
