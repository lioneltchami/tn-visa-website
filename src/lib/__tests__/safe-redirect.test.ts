import { describe, expect, it } from 'vitest'
import { safeInternalPath } from '@/lib/safe-redirect'

describe('safeInternalPath', () => {
  it('allows a same-site path and rejects open redirects', () => {
    expect(safeInternalPath('/dashboard')).toBe('/dashboard')
    expect(safeInternalPath('/post-job')).toBe('/post-job')
    expect(safeInternalPath('/jobs/senior-engineer')).toBe('/jobs/senior-engineer')
    expect(safeInternalPath(null)).toBe('/dashboard')
    expect(safeInternalPath(undefined)).toBe('/dashboard')
    expect(safeInternalPath('')).toBe('/dashboard')

    for (const bad of [
      "//evil.example",
      "/\\evil.example",
      "/\\\\evil.example",
      "/foo\\bar",
      "https://evil.example",
      "http://evil.example",
      "javascript:alert(1)",
      "///evil.example",
      " //evil.example",
      "/\t/evil.example",
      "/dashboard?next=https://evil.example",
    ]) {
      expect(safeInternalPath(bad)).toBe('/dashboard')
    }
  })
})
