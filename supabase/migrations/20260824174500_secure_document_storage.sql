begin;

-- Preserve the legacy URL column temporarily so existing rows can be audited and
-- backfilled. New application code writes only storage_path.
alter table public.documents add column if not exists storage_path text;
alter table public.documents alter column file_url drop not null;

-- Existing application uploads stored URLs in this exact Supabase public-object
-- shape. Backfill only paths that match the owning user's folder. Rows that do
-- not match stay NULL and require an inventory review before they are exposed.
update public.documents
set storage_path = regexp_replace(
  file_url,
  '^.*/storage/v1/object/public/documents/',
  ''
)
where storage_path is null
  and file_url ~ '^.*/storage/v1/object/public/documents/.+$'
  and regexp_replace(
    file_url,
    '^.*/storage/v1/object/public/documents/',
    ''
  ) like user_id::text || '/%';

alter table public.documents
  drop constraint if exists documents_storage_path_owner;
alter table public.documents
  add constraint documents_storage_path_owner
  check (storage_path is null or storage_path like user_id::text || '/%');

comment on column public.documents.file_url is
  'Legacy public URL retained only for backfill/audit. New code must use storage_path.';
comment on column public.documents.storage_path is
  'Private Supabase Storage object path. Must begin with the owning user UUID and a slash.';

commit;

-- Rollback (run manually only after reviewing affected legacy rows):
-- alter table public.documents drop constraint if exists documents_storage_path_owner;
-- alter table public.documents drop column if exists storage_path;
-- alter table public.documents alter column file_url set not null;
