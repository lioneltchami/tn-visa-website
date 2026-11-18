import { describe, expect, it } from 'vitest'
import { httpApplicationUrl } from '@/lib/http-url'

describe('httpApplicationUrl', () => {
  it('allows http and https and rejects other schemes', () => {
    expect(httpApplicationUrl('https://careers.example.com/apply')).toBe(
      'https://careers.example.com/apply'
    )
    expect(httpApplicationUrl('http://example.com/jobs')).toBe('http://example.com/jobs')
    expect(httpApplicationUrl('javascript:alert(1)')).toBeNull()
    expect(httpApplicationUrl('java\tscript:alert(1)')).toBeNull()
    expect(httpApplicationUrl('data:text/html,hi')).toBeNull()
    expect(httpApplicationUrl('//evil.example')).toBeNull()
    expect(httpApplicationUrl('')).toBeNull()
  })
})
