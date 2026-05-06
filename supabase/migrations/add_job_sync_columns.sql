-- Migration: Add external job sync columns to jobs table
-- Run this in Supabase SQL Editor

-- Add new columns for external job tracking
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'user';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS external_id text;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS last_synced_at timestamptz;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS raw_data jsonb;

-- Unique constraint on external_id for upsert via PostgREST
-- NULLs don't conflict in PostgreSQL UNIQUE constraints, so user-posted jobs (NULL external_id) are fine
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'jobs_external_id_unique') THEN
    ALTER TABLE jobs ADD CONSTRAINT jobs_external_id_unique UNIQUE (external_id);
  END IF;
END $$;

-- CHECK constraint on source column for DB-level validation
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'jobs_source_check') THEN
    ALTER TABLE jobs ADD CONSTRAINT jobs_source_check CHECK (source IN ('user', 'external'));
  END IF;
END $$;

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_jobs_source ON jobs(source);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_at ON jobs(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_expires_at ON jobs(expires_at);
