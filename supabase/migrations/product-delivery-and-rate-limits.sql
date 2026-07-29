-- ============================================
-- TN Visa Guide — paid product delivery + API rate limiting
-- Run in Supabase SQL Editor AFTER schema-clean.sql
-- Safe to re-run (idempotent).
-- ============================================

-- ============================================
-- 1. PURCHASES
-- ============================================

create table if not exists public.purchases (
  id uuid default gen_random_uuid() primary key,
  stripe_session_id text not null unique,
  stripe_payment_intent text,
  product_id text not null,
  email text,
  amount_total integer,
  currency text default 'usd',
  download_count integer not null default 0,
  max_downloads integer not null default 50,
  fulfilled_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists idx_purchases_email on public.purchases (lower(email));
create index if not exists idx_purchases_created_at on public.purchases (created_at desc);

-- RLS enabled with zero policies: the table is only reachable with the
-- service role key (server-side routes), never from the browser.
alter table public.purchases enable row level security;

-- Atomically consume one download slot. Returns is_allowed = false when the
-- purchase is missing or the download cap has been reached.
create or replace function public.consume_download(p_purchase_id uuid)
returns table (is_allowed boolean, downloads_used integer, downloads_max integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_used integer;
  v_max integer;
  v_ok boolean := false;
begin
  update public.purchases
     set download_count = download_count + 1
   where id = p_purchase_id
     and download_count < max_downloads
  returning download_count, max_downloads into v_used, v_max;

  if found then
    v_ok := true;
  else
    select download_count, max_downloads into v_used, v_max
      from public.purchases
     where id = p_purchase_id;
  end if;

  return query select v_ok, coalesce(v_used, 0), coalesce(v_max, 0);
end;
$$;

-- ============================================
-- 2. RATE LIMITS
-- ============================================

create table if not exists public.rate_limits (
  key text primary key,
  window_started_at timestamptz not null default now(),
  count integer not null default 0
);

alter table public.rate_limits enable row level security;

-- Fixed-window counter consumed in a single round trip so concurrent
-- requests cannot race past the limit.
create or replace function public.consume_rate_limit(
  p_key text,
  p_limit integer,
  p_window_seconds integer
)
returns table (is_allowed boolean, remaining integer, reset_seconds integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_window interval := make_interval(secs => p_window_seconds);
  v_count integer;
  v_started timestamptz;
begin
  insert into public.rate_limits as rl (key, window_started_at, count)
  values (p_key, v_now, 1)
  on conflict (key) do update
     set window_started_at = case
           when rl.window_started_at < v_now - v_window then v_now
           else rl.window_started_at
         end,
         count = case
           when rl.window_started_at < v_now - v_window then 1
           else rl.count + 1
         end
  returning rl.count, rl.window_started_at into v_count, v_started;

  return query
    select v_count <= p_limit,
           greatest(p_limit - v_count, 0),
           greatest(ceil(extract(epoch from ((v_started + v_window) - v_now)))::integer, 0);
end;
$$;

-- Housekeeping: drop windows that can no longer be active.
create or replace function public.purge_rate_limits(p_older_than_hours integer default 48)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted integer;
begin
  delete from public.rate_limits
   where window_started_at < now() - make_interval(hours => p_older_than_hours);
  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

revoke all on function public.consume_download(uuid) from public;
revoke all on function public.consume_rate_limit(text, integer, integer) from public;
revoke all on function public.purge_rate_limits(integer) from public;

grant execute on function public.consume_download(uuid) to service_role;
grant execute on function public.consume_rate_limit(text, integer, integer) to service_role;
grant execute on function public.purge_rate_limits(integer) to service_role;

-- ============================================
-- 3. STORAGE — private bucket for paid PDFs
-- ============================================

-- No storage policies are added on purpose: objects are written by the build
-- script and read through short-lived signed URLs, both using the service role.
insert into storage.buckets (id, name, public)
values ('product-files', 'product-files', false)
on conflict (id) do nothing;
