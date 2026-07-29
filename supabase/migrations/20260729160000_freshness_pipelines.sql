-- ============================================
-- Freshness pipelines — reminder ledger + job sync index
-- Safe to re-run (idempotent).
-- ============================================

-- Faster rate-gate lookups for external job sync
create index if not exists idx_jobs_source_last_synced
  on public.jobs (source, last_synced_at desc nulls last);

-- Faster daily reminder scans
create index if not exists idx_tn_status_active_end_date
  on public.tn_status (status, end_date)
  where status = 'active';

-- Idempotent send ledger (cron can double-fire; Vercel never retries misses)
create table if not exists public.renewal_reminder_sends (
  id uuid default gen_random_uuid() primary key,
  tn_status_id uuid not null references public.tn_status(id) on delete cascade,
  days_before integer not null check (days_before in (90, 60, 30)),
  email text not null,
  sent_at timestamptz,
  provider_id text,
  created_at timestamptz default now(),
  unique (tn_status_id, days_before)
);

create index if not exists idx_renewal_reminder_sends_sent_at
  on public.renewal_reminder_sends (sent_at);

alter table public.renewal_reminder_sends enable row level security;

-- Service role only (no policies for anon/authenticated)
revoke all on public.renewal_reminder_sends from public;
grant all on public.renewal_reminder_sends to service_role;
