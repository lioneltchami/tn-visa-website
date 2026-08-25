-- ============================================
-- AI Chatbot — pgvector for RAG
-- Run AFTER schema-clean.sql
-- ============================================

-- Enable pgvector extension
create extension if not exists vector with schema extensions;

-- Content embeddings table
create table public.content_embeddings (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  embedding extensions.vector(1536),
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- Similarity search function
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
language plpgsql
security definer
set search_path = ''
as $$
begin
  return query
  select
    ce.id,
    ce.content,
    ce.metadata,
    1 - (ce.embedding OPERATOR(extensions.<=>) query_embedding) as similarity
  from public.content_embeddings ce
  where 1 - (ce.embedding OPERATOR(extensions.<=>) query_embedding) > match_threshold
  order by ce.embedding OPERATOR(extensions.<=>) query_embedding
  limit match_count;
end;
$$;

revoke all on function public.match_content(extensions.vector, float, int) from public;
grant execute on function public.match_content(extensions.vector, float, int) to anon, authenticated, service_role;

-- NOTE: Run this AFTER ingesting content (the index needs data to build):
-- create index on public.content_embeddings using ivfflat (embedding extensions.vector_cosine_ops) with (lists = 10);
