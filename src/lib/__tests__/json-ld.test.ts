import { describe, expect, it } from 'vitest'
import { jsonLdHtml } from '@/lib/json-ld'

describe('jsonLdHtml', () => {
  it('escapes U+003C so a description cannot close the script tag', () => {
    const description = '</script><script>alert(1)</script>'
    const html = jsonLdHtml({ description })

    expect(html.includes('<')).toBe(false)
    expect(html).toContain('\\u003c/script>')
    expect(JSON.parse(html).description).toBe(description)
  })
})
