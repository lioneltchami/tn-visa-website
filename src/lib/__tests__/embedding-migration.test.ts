import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, expect, it } from 'vitest'

const migrationPath = resolve(
  __dirname,
  '../../../supabase/migrations/20260825003000_versioned_content_embeddings.sql'
)
const ingestScriptPath = resolve(__dirname, '../../../scripts/ingest-content.ts')

describe('versioned embedding ingestion migration', () => {
  it('keeps a single active version and restricts retrieval to that version', () => {
    const migration = readFileSync(migrationPath, 'utf8')
    expect(migration).toContain('content_embedding_versions')
    expect(migration).toContain('one_active_content_embedding_version')
    expect(migration).toContain("where status = 'active'")
    expect(migration).toContain('activate_content_embedding_version')
    expect(migration).toContain("cev.status = 'active'")
  })

  it('does not delete the live index before building a replacement', () => {
    const script = readFileSync(ingestScriptPath, 'utf8')
    expect(script).not.toContain("from('content_embeddings').delete()")
    expect(script).toContain("from('content_embedding_versions')")
    expect(script).toContain('.insert({')
    expect(script).toContain("rpc('activate_content_embedding_version'")
  })
})
