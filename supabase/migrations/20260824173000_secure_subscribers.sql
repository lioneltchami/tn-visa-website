begin;

alter table public.subscribers enable row level security;

-- Remove the previous public client policies. Newsletter signup and unsubscribe
-- now go through server routes using the service-role client.
drop policy if exists "Anyone can subscribe" on public.subscribers;
drop policy if exists "Anyone can read subscribers" on public.subscribers;
drop policy if exists "Anyone can unsubscribe" on public.subscribers;
drop policy if exists "Service role manages subscribers" on public.subscribers;

-- Deny anonymous and authenticated browser clients at both the privilege and
-- RLS layers. The service role remains the only application principal allowed
-- to manage subscriber records.
revoke all on table public.subscribers from anon, authenticated;
grant all on table public.subscribers to service_role;

create policy "Service role manages subscribers"
  on public.subscribers
  for all
  to service_role
  using (true)
  with check (true);

commit;

-- Rollback (run manually only after reviewing the security impact):
-- drop policy if exists "Service role manages subscribers" on public.subscribers;
-- revoke all on table public.subscribers from service_role;
-- grant select, insert, update, delete on table public.subscribers to anon, authenticated;
-- Do not recreate the previous public SELECT or UPDATE policies.
