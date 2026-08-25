-- Safe, versioned content-embedding ingestion.
-- A new version is built while the existing active version continues serving chat requests.
-- The ingest service activates a version only after every expected row is present.

create table if not exists public.content_embedding_versions (
  id uuid primary key default gen_random_uuid(),
  source_sha256 text not null,
  source_path text not null,
  model text not null,
  chunk_count integer not null check (chunk_count > 0),
  status text not null default 'building' check (status in ('building', 'ready', 'active', 'failed', 'archived')),
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  activated_at timestamptz,
  failure_reason text
);

alter table public.content_embeddings
  add column if not exists version_id uuid references public.content_embedding_versions(id) on delete cascade;

-- Preserve an existing index as one active legacy version before enforcing version ownership.
do $$
declare
  legacy_version_id uuid;
begin
  if exists (select 1 from public.content_embeddings where version_id is null) then
    insert into public.content_embedding_versions (
      source_sha256,
      source_path,
      model,
      chunk_count,
      status,
      completed_at,
      activated_at
    )
    select
      'legacy-unversioned-index',
      'legacy content_embeddings rows',
      'unknown',
      count(*)::integer,
      'active',
      now(),
      now()
    from public.content_embeddings
    where version_id is null
    returning id into legacy_version_id;

    update public.content_embeddings
    set version_id = legacy_version_id
    where version_id is null;
  end if;
end;
$$;

alter table public.content_embeddings
  alter column version_id set not null;

create index if not exists content_embeddings_version_id_idx
  on public.content_embeddings(version_id);

create unique index if not exists one_active_content_embedding_version
  on public.content_embedding_versions(status)
  where status = 'active';

-- Restrict retrieval to the one fully activated embedding version.
create or replace function public.match_content(
  query_embedding extensions.vector(1536),
  match_threshold float default 0.7,
  match_count int default 5
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    ce.id,
    ce.content,
    ce.metadata,
    1 - (ce.embedding OPERATOR(extensions.<=>) query_embedding) as similarity
  from public.content_embeddings ce
  join public.content_embedding_versions cev on cev.id = ce.version_id
  where cev.status = 'active'
    and 1 - (ce.embedding OPERATOR(extensions.<=>) query_embedding) > match_threshold
  order by ce.embedding OPERATOR(extensions.<=>) query_embedding
  limit match_count;
$$;

-- Only the server-side ingestion service may activate a fully built version.
create or replace function public.activate_content_embedding_version(target_version_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target public.content_embedding_versions;
  actual_count integer;
begin
  select * into target
  from public.content_embedding_versions
  where id = target_version_id
  for update;

  if not found then
    raise exception 'Unknown content embedding version: %', target_version_id;
  end if;

  if target.status not in ('building', 'ready') then
    raise exception 'Embedding version % cannot be activated from status %', target_version_id, target.status;
  end if;

  select count(*) into actual_count
  from public.content_embeddings
  where version_id = target_version_id;

  if actual_count <> target.chunk_count then
    raise exception 'Embedding version % expected % rows but has %', target_version_id, target.chunk_count, actual_count;
  end if;

  update public.content_embedding_versions
  set status = 'archived'
  where status = 'active';

  update public.content_embedding_versions
  set status = 'active', completed_at = now(), activated_at = now(), failure_reason = null
  where id = target_version_id;
end;
$$;

revoke all on function public.activate_content_embedding_version(uuid) from public, anon, authenticated;
grant execute on function public.activate_content_embedding_version(uuid) to service_role;

revoke all on function public.match_content(extensions.vector, float, int) from public;
grant execute on function public.match_content(extensions.vector, float, int) to anon, authenticated, service_role;

comment on table public.content_embedding_versions is
  'Version ledger for safe chat-index rebuilds. Keep archived versions until a separately reviewed cleanup task removes them.';
