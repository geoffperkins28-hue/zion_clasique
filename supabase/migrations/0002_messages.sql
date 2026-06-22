-- Contact form submissions (no medical/PHI fields).
-- Anyone can submit (anon insert); only the signed-in owner can read/manage.

create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  email      text,
  regarding  text,
  message    text,
  handled    boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_idx on public.messages (created_at desc);

alter table public.messages enable row level security;

-- Public can submit, but cannot read.
drop policy if exists messages_public_insert on public.messages;
create policy messages_public_insert on public.messages
  for insert with check (true);

-- Owner (signed in) can read, update (mark handled), and delete.
drop policy if exists messages_auth_read on public.messages;
create policy messages_auth_read on public.messages
  for select using (auth.role() = 'authenticated');

drop policy if exists messages_auth_update on public.messages;
create policy messages_auth_update on public.messages
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists messages_auth_delete on public.messages;
create policy messages_auth_delete on public.messages
  for delete using (auth.role() = 'authenticated');
