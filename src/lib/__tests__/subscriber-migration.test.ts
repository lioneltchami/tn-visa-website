import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const migrationPath = path.join(
  process.cwd(),
  'supabase/migrations/20260824173000_secure_subscribers.sql'
)

describe('subscriber privacy migration', () => {
  it('removes public subscriber policies and grants management only to service_role', async () => {
    const sql = await readFile(migrationPath, 'utf8')

    expect(sql).toContain('drop policy if exists "Anyone can read subscribers"')
    expect(sql).toContain('drop policy if exists "Anyone can unsubscribe"')
    expect(sql).toContain('revoke all on table public.subscribers from anon, authenticated')
    expect(sql).toContain('to service_role')
    expect(sql).not.toMatch(/create policy\s+"Anyone can read subscribers"/i)
    expect(sql).not.toMatch(/create policy\s+"Anyone can unsubscribe"/i)
  })
})
