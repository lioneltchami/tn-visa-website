-- Revoke paid access on refund/dispute. Safe to re-run.

alter table public.purchases
  add column if not exists revoked_at timestamptz;

create index if not exists idx_purchases_payment_intent
  on public.purchases (stripe_payment_intent)
  where stripe_payment_intent is not null;

-- Block downloads once a purchase is revoked.
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
     and revoked_at is null
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
