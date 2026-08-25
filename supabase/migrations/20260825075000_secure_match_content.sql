-- Least-privilege public chat retrieval.
-- Browser clients may execute this function but cannot directly read embedding tables.
-- SECURITY DEFINER is required because table-level access remains private.

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
    1 - (ce.embedding <=> query_embedding) as similarity
  from public.content_embeddings ce
  join public.content_embedding_versions cev on cev.id = ce.version_id
  where cev.status = 'active'
    and 1 - (ce.embedding <=> query_embedding) > match_threshold
  order by ce.embedding <=> query_embedding
  limit match_count;
$$;

revoke all on function public.match_content(extensions.vector, float, int) from public;
grant execute on function public.match_content(extensions.vector, float, int) to anon, authenticated, service_role;

comment on function public.match_content(extensions.vector, float, int) is
  'Returns ranked content from only the active embedding version. Public callers receive no direct embedding-table access.';
