import { describe, expect, it } from 'vitest'
import {
  extractJobRequirements,
  normalizeJobDescriptionText,
  parseJobDescription,
} from '@/lib/job-description'

const RN_BLOB = `SNF Staffing Solutions - We are currently sponsoring TN Visa's for eligible nurses to work here in the United States. English proficiency is a must. Job Type: Full-time. Setting: Skilled Nursing Center (Long-term care) Population Type: Geriatric. Duration: 3 years (Renewable). Location: Taos, New Mexico (Spanish and English speaking). • Benefits available for Full-time employees* Benefits: • 401 (k) • Dental Insurance • Health Insurance • Life Insurance • Vision Insurance About the Role: Are you lookin to relocate to the United States? We operate the best performing nursing centers throughout New Mexico. Many of our patients are spanish speaking! We would love to take this adventure with you. We will assist you in relocation, housing, and acquiring your TN visa for a guaranteed stay of up to three years with renewable extensions! As a Registered Nurse you will render nursing care within the scope of practice to ensure patient’s needs are met in accordance with standards of practice, physician orders, center policies as well as state, federal and local guidelines. For immediate consideration please email Dylan@opcoca.com with your resume to be called back within 24 hours. QUALIFICATIONS • Must have license has an RN in home country. • Have grauated from an accredited Registered nursing program. • Must be proficient in English. RESPONSIBILITIES • Follows established procedure for charting and incident reporting. • Follows company procedures for narcotic counting, pharmacy orders, and restraint reduction. • Documents any change in patient's conditions including but not limited to nutritional problems, infections, skin conditions, weight loss or any other noticeable changes. • Utilizes the Quality Life Manual for identification, placement, and monitoring of patients in the appropriate programs. • Document and notify applicable departments of any patient's room changes, LOA, new admits, or discharges. • Makes rounds with physicians when necessary.`

describe('normalizeJobDescriptionText', () => {
  it('breaks bullets onto their own lines', () => {
    const out = normalizeJobDescriptionText('Intro text. • First • Second')
    expect(out).toContain('\n• First')
    expect(out).toContain('\n• Second')
  })

  it('isolates ALL-CAPS section headers', () => {
    const out = normalizeJobDescriptionText(
      'Done. QUALIFICATIONS Must be licensed. RESPONSIBILITIES Chart patients.'
    )
    expect(out.toLowerCase()).toContain('qualifications')
    expect(out.toLowerCase()).toContain('responsibilities')
  })
})

describe('parseJobDescription', () => {
  it('returns empty for blank input', () => {
    expect(parseJobDescription('')).toEqual({ blocks: [], requirements: [] })
    expect(parseJobDescription('   ')).toEqual({
      blocks: [],
      requirements: [],
    })
  })

  it('structures the RN employer blob into facts, sections, and requirements', () => {
    const parsed = parseJobDescription(RN_BLOB)

    const facts = parsed.blocks.find((b) => b.type === 'facts')
    expect(facts?.type).toBe('facts')
    if (facts?.type === 'facts') {
      const labels = facts.facts.map((f) => f.label.toLowerCase())
      expect(labels).toEqual(
        expect.arrayContaining(['job type', 'setting', 'population type', 'duration', 'location'])
      )
      expect(facts.facts.find((f) => f.label.toLowerCase() === 'job type')?.value).toMatch(
        /full-time/i
      )
      expect(facts.facts.find((f) => f.label.toLowerCase() === 'location')?.value).toMatch(/taos/i)
    }

    const titles = parsed.blocks
      .map((b) => ('title' in b ? b.title?.toLowerCase() : undefined))
      .filter(Boolean)

    expect(titles).toEqual(
      expect.arrayContaining(['benefits', 'about the role', 'qualifications', 'responsibilities'])
    )

    const benefits = parsed.blocks.find(
      (b) => b.type === 'list' && b.title?.toLowerCase() === 'benefits'
    )
    expect(benefits?.type).toBe('list')
    if (benefits?.type === 'list') {
      expect(benefits.items.length).toBeGreaterThanOrEqual(4)
      expect(benefits.items.some((i) => /dental/i.test(i))).toBe(true)
    }

    const responsibilities = parsed.blocks.find(
      (b) => b.type === 'list' && b.title?.toLowerCase() === 'responsibilities'
    )
    expect(responsibilities?.type).toBe('list')
    if (responsibilities?.type === 'list') {
      expect(responsibilities.items.length).toBeGreaterThanOrEqual(4)
    }

    expect(parsed.requirements.length).toBeGreaterThanOrEqual(3)
    expect(parsed.requirements.some((r) => /english/i.test(r))).toBe(true)
    expect(parsed.requirements.some((r) => /rn|nursing/i.test(r))).toBe(true)
  })

  it('keeps short clean descriptions as paragraphs', () => {
    const parsed = parseJobDescription(
      'We need a TN-eligible software engineer.\n\nRemote OK. Strong TypeScript preferred.'
    )
    expect(parsed.blocks.every((b) => b.type === 'paragraph' || b.type === 'facts')).toBe(true)
    expect(parsed.blocks.length).toBeGreaterThanOrEqual(1)
  })

  it('keeps qualification bullets when a lead sentence comes first', () => {
    const reqs = extractJobRequirements(
      'Requirements: The ideal candidate has the below. • Bachelors degree • 3 years experience • RN license'
    )
    expect(reqs).toEqual(
      expect.arrayContaining(['Bachelors degree', '3 years experience', 'RN license'])
    )
    expect(reqs.some((r) => /ideal candidate/i.test(r))).toBe(false)

    const parsed = parseJobDescription(
      'Requirements: The ideal candidate has the below. • Bachelors degree • 3 years experience'
    )
    const list = parsed.blocks.find((b) => b.type === 'list')
    expect(list?.type).toBe('list')
    if (list?.type === 'list') {
      expect(list.title?.toLowerCase()).toBe('requirements')
      expect(list.items.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('does not split mid-sentence "benefits:" into a fake section', () => {
    const parsed = parseJobDescription(
      'We pay well and offer strong benefits: medical, dental, and vision.'
    )
    const titles = parsed.blocks
      .map((b) => ('title' in b ? b.title?.toLowerCase() : undefined))
      .filter(Boolean)
    expect(titles).not.toContain('benefits')
  })
})

describe('extractJobRequirements', () => {
  it('prefers highlight items when present', () => {
    expect(extractJobRequirements(RN_BLOB, ['Active RN license', 'BLS certification'])).toEqual([
      'Active RN license',
      'BLS certification',
    ])
  })

  it('falls back to parsed qualifications from the body', () => {
    const reqs = extractJobRequirements(RN_BLOB)
    expect(reqs.length).toBeGreaterThanOrEqual(3)
    expect(reqs.every((r) => r.length > 0 && r.length <= 500)).toBe(true)
  })
})
