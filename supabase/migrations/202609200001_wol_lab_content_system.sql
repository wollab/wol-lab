create extension if not exists pgcrypto;

create type public.app_role as enum ('owner', 'editor', 'viewer');
create type public.content_status as enum ('draft', 'published', 'archived');
create type public.resource_visibility as enum ('public', 'private');

create table public.allowed_users (
  email text primary key check (email = lower(email)),
  role public.app_role not null default 'viewer',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.resources (
  id text primary key,
  title text not null,
  summary text not null default '',
  category text not null,
  status text not null default 'pilot',
  visibility public.resource_visibility not null default 'public',
  canonical_url text not null,
  cover_url text,
  social_links jsonb not null default '[]'::jsonb,
  tags text[] not null default '{}',
  featured boolean not null default false,
  category_label text not null default '',
  milestone text not null default '',
  next_step text not null default '',
  needs text not null default '',
  update_status text not null default 'needs-input',
  reviewed_at date,
  owner_email text,
  last_verified_at date,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create table public.site_settings (
  id text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  site_id text not null,
  content_type text not null,
  slug text not null,
  title text not null,
  fields jsonb not null default '{}'::jsonb,
  evidence jsonb not null default '[]'::jsonb,
  claim_boundary text not null default '',
  status public.content_status not null default 'draft',
  draft_version integer not null default 1,
  published_version integer,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id),
  unique (site_id, content_type, slug)
);

create table public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references public.content_items(id) on delete cascade,
  version integer not null,
  snapshot jsonb not null,
  change_note text,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  unique (content_item_id, version)
);

create table public.social_channels (
  id text primary key,
  name text not null,
  platform text not null default 'facebook',
  canonical_url text,
  share_url text,
  mapped_resource_ids text[] not null default '{}',
  coverage_start date,
  coverage_end date,
  coverage_status text not null default 'not_started',
  last_audited_at timestamptz
);

create table public.social_posts (
  id uuid primary key default gen_random_uuid(),
  channel_id text not null references public.social_channels(id),
  platform_post_id text,
  permalink text,
  published_at timestamptz,
  caption text not null default '',
  normalized_text text not null default '',
  core_idea text,
  claim_summary text,
  cta text,
  promoted_urls text[] not null default '{}',
  concept_tags text[] not null default '{}',
  media_hashes text[] not null default '{}',
  source_method text not null default 'manual_browser_audit',
  captured_at timestamptz not null default now(),
  unique (channel_id, platform_post_id)
);

create or replace function public.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.allowed_users
  where email = lower(coalesce(auth.jwt() ->> 'email', '')) and active = true
$$;

create or replace function public.can_edit()
returns boolean
language sql
stable
security definer
set search_path = public
as $$ select coalesce(public.current_user_role() in ('owner', 'editor'), false) $$;

alter table public.allowed_users enable row level security;
alter table public.resources enable row level security;
alter table public.content_items enable row level security;
alter table public.content_revisions enable row level security;
alter table public.social_channels enable row level security;
alter table public.social_posts enable row level security;
alter table public.site_settings enable row level security;

create policy "public resources are readable" on public.resources for select using (visibility = 'public' or public.current_user_role() is not null);
create policy "editors manage resources" on public.resources for all using (public.can_edit()) with check (public.can_edit());
create policy "published content is public" on public.content_items for select using (status = 'published' or public.current_user_role() is not null);
create policy "editors manage content" on public.content_items for all using (public.can_edit()) with check (public.can_edit());
create policy "team reads revisions" on public.content_revisions for select using (public.current_user_role() is not null);
create policy "editors manage revisions" on public.content_revisions for all using (public.can_edit()) with check (public.can_edit());
create policy "team reads social channels" on public.social_channels for select using (public.current_user_role() is not null);
create policy "editors manage social channels" on public.social_channels for all using (public.can_edit()) with check (public.can_edit());
create policy "team reads social posts" on public.social_posts for select using (public.current_user_role() is not null);
create policy "editors manage social posts" on public.social_posts for all using (public.can_edit()) with check (public.can_edit());
create policy "users read own allowlist row" on public.allowed_users for select using (email = lower(coalesce(auth.jwt() ->> 'email', '')));
create policy "site settings are readable" on public.site_settings for select using (true);
create policy "editors manage site settings" on public.site_settings for all using (public.can_edit()) with check (public.can_edit());

insert into public.allowed_users (email, role)
values ('contact@wizardsoflearning.com', 'owner')
on conflict (email) do update set role = excluded.role, active = true;

insert into public.site_settings (id, value)
values ('directory-layout', '{"categoryOrder":["knowledge","games","products","cases","systems"],"categoryLabels":{},"hiddenCategories":[],"showWorkTypes":true,"showAbout":true}'::jsonb)
on conflict (id) do nothing;

create or replace function public.save_content_revision()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.fields is distinct from new.fields
     or old.title is distinct from new.title
     or old.evidence is distinct from new.evidence
     or old.claim_boundary is distinct from new.claim_boundary then
    new.draft_version := old.draft_version + 1;
    insert into public.content_revisions (content_item_id, version, snapshot, created_by)
    values (old.id, old.draft_version, to_jsonb(old), auth.uid());
  end if;
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end
$$;

create trigger content_item_revision_before_update
before update on public.content_items
for each row execute function public.save_content_revision();

create or replace function public.publish_content_item(item_id uuid)
returns public.content_items
language plpgsql
security definer
set search_path = public
as $$
declare result public.content_items;
begin
  if not public.can_edit() then raise exception 'not authorized'; end if;
  update public.content_items
  set status = 'published', published_version = draft_version, published_at = now(), updated_by = auth.uid()
  where id = item_id
  returning * into result;
  if result.id is null then raise exception 'content item not found'; end if;
  return result;
end
$$;

revoke all on function public.publish_content_item(uuid) from public;
grant execute on function public.publish_content_item(uuid) to authenticated;

insert into public.social_channels (id, name, canonical_url, share_url, coverage_status) values
  ('wol-facebook', 'Wizards of Learning', 'https://www.facebook.com/WizardsofLearning/', 'https://www.facebook.com/share/1EnjGCsmAy/', 'partial'),
  ('meta-learning-facebook', 'Meta Learning', 'https://www.facebook.com/MetaLearningTH', 'https://www.facebook.com/share/19RGsPMmhy/', 'partial'),
  ('thai-people-history-facebook', 'ประวัติศาสตร์ประชาชนไทย 2460 - 2560', 'https://www.facebook.com/profile.php?id=61592474347395', 'https://www.facebook.com/share/1DWxGJxJU9/', 'partial'),
  ('headline-next-facebook', 'ต่อจากพาดหัว', 'https://www.facebook.com/profile.php?id=61593728935297', 'https://www.facebook.com/share/1JtS86jKY3/', 'partial'),
  ('magic-casters-group', 'Magic Casters', 'https://www.facebook.com/groups/1783004235304546/', 'https://www.facebook.com/share/g/1EUNiWCvVV/', 'partial')
on conflict (id) do nothing;

insert into public.social_posts
  (channel_id, platform_post_id, permalink, published_at, caption, core_idea, concept_tags)
values
  ('meta-learning-facebook', '122093632731281247', 'https://www.facebook.com/permalink.php?story_fbid=122093632731281247&id=61588437412843&substory_index=1232619385251700', null, 'อัปเดตรูปโปรไฟล์', 'Profile photo update; no editorial post found in the visible feed.', array['profile-update']),
  ('thai-people-history-facebook', 'pfbid02obG2Zmq2jCgYv6bv5Y7mPJns2NfnKCFGyWAGQ36iSSNHSH8XgmHC4CF3AeJjbfNNl', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02obG2Zmq2jCgYv6bv5Y7mPJns2NfnKCFGyWAGQ36iSSNHSH8XgmHC4CF3AeJjbfNNl&id=61592474347395', null, 'ถ้าอยากเริ่มอ่านประวัติศาสตร์ 100 ปี แต่ไม่รู้จะเริ่มจากตรงไหน', 'Four ways to explore the history archive.', array['how-to','archive']),
  ('thai-people-history-facebook', 'pfbid0VD3RiMFWV81yN4PRppbt4kFgDWfTYERCuxZxv5MbevXZHcAJAkDpqSRdhTuM8KJUl', 'https://www.facebook.com/permalink.php?story_fbid=pfbid0VD3RiMFWV81yN4PRppbt4kFgDWfTYERCuxZxv5MbevXZHcAJAkDpqSRdhTuM8KJUl&id=61592474347395', null, 'ประวัติศาสตร์อยู่ในค่าจ้าง ถนน โรงเรียน และวิกฤต', 'Channel launch through the everyday effects of history.', array['launch','everyday-history']),
  ('headline-next-facebook', 'pfbid02XvJbUyAouZ4eVFJwGER3VMD8RoKddeHjR9WUqkULZsn13i1DJnU83W1zuD5x467bl', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02XvJbUyAouZ4eVFJwGER3VMD8RoKddeHjR9WUqkULZsn13i1DJnU83W1zuD5x467bl&id=61593728935297', null, 'ลองค้นคดีในคลังได้แล้ว', 'Invite readers to search the case archive.', array['how-to','case-search']),
  ('headline-next-facebook', 'pfbid0NTxhtbYZzdn3G8xmKMSQVoxLp89JgRcHUT4Gkb2GXPyx94s8Z6RhncfNB9xMy3jdl', 'https://www.facebook.com/permalink.php?story_fbid=pfbid0NTxhtbYZzdn3G8xmKMSQVoxLp89JgRcHUT4Gkb2GXPyx94s8Z6RhncfNB9xMy3jdl&id=61593728935297', null, 'ข่าวมีวันลง แต่เรื่องไม่ได้จบในวันนั้น', 'Channel launch and the idea of following a case beyond the headline.', array['launch','justice-memory']),
  ('magic-casters-group', '4533143170290625', 'https://www.facebook.com/groups/1783004235304546/posts/4533143170290625/', '2026-08-14 00:00:00+07', 'กลุ่มนี้เงียบมานาน ผมขอเริ่มใหม่ครับ', 'Relaunch the group for people who use games for learning.', array['relaunch','community'])
on conflict (channel_id, platform_post_id) do nothing;
