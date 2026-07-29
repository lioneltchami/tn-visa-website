import { NextRequest, NextResponse } from 'next/server'
import { authorizeCronRequest, newRunId } from '@/lib/cron-auth'
import { consumeRateLimit } from '@/lib/rate-limit'
import { createServiceSupabase } from '@/lib/supabase/admin'
import professions from '@/data/professions.json'

export const maxDuration = 60

const MIN_SYNC_INTERVAL_SECONDS = 30 * 60
const JSEARCH_TIMEOUT_MS = 10_000

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function safeDate(value: unknown): string {
  if (typeof value !== 'string') return new Date().toISOString()
  const d = new Date(value)
  if (isNaN(d.getTime())) return new Date().toISOString()
  const now = Date.now()
  return d.getTime() > now ? new Date(now).toISOString() : d.toISOString()
}

function mapEmploymentType(raw: unknown): 'full_time' | 'contract' {
  const val = (typeof raw === 'string' ? raw : '').toUpperCase()
  if (val.includes('CONTRACT')) return 'contract'
  return 'full_time'
}

function isValidUrl(url: string): boolean {
  if (!url || url.length > 2048) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

function sanitizeSalary(value: unknown): number | null {
  if (value == null) return null
  const num = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(num) || num < 0 || num > 10_000_000) return null
  return Math.round(num)
}

function stripHtmlTags(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) : text
}

const SEARCH_CONFIG: { query: string; profession: string }[] = [
  { query: 'Registered Nurse visa sponsorship', profession: 'Registered Nurse' },
  { query: 'Pharmacist visa sponsorship', profession: 'Pharmacist' },
  { query: 'Software Engineer visa sponsorship', profession: 'Computer Systems Analyst' },
  { query: 'Accountant visa sponsorship', profession: 'Accountant' },
  { query: 'Engineer visa sponsorship', profession: 'Engineer' },
  { query: 'Scientist visa sponsorship', profession: 'Scientist' },
  { query: 'Management Consultant visa sponsorship', profession: 'Management Consultant' },
  { query: 'Architect visa sponsorship', profession: 'Architect' },
]

const VALID_PROFESSIONS = new Set(professions.map((p) => p.name))

async function fetchJobs(query: string, apiKey: string, apiHost: string) {
  const url = `https://${apiHost}/search?query=${encodeURIComponent(query)}&location=United%20States&page=1&num_pages=1&date_posted=week`

  const res = await fetch(url, {
    headers: { 'X-RapidAPI-Key': apiKey, 'X-RapidAPI-Host': apiHost },
    signal: AbortSignal.timeout(JSEARCH_TIMEOUT_MS),
  })

  if (!res.ok) {
    throw new Error(`JSearch ${res.status}: ${res.statusText}`)
  }

  const json = await res.json()
  return (json.data || []) as Record<string, unknown>[]
}

function extractRequirements(job: Record<string, unknown>): string[] {
  const highlights = job.job_highlights
  if (!highlights || !Array.isArray(highlights)) return []
  const quals = highlights.find(
    (h: Record<string, unknown>) => h.title === 'Qualifications' || h.title === 'Requirements'
  )
  if (quals && Array.isArray(quals.items)) {
    return (quals.items as string[]).slice(0, 8).map((item) => truncate(String(item), 500))
  }
  return []
}

function mapRemotePolicy(job: Record<string, unknown>): 'onsite' | 'hybrid' | 'remote' {
  if (job.job_is_remote === true) return 'remote'
  const title = ((job.job_title as string) || '').toLowerCase()
  if (title.includes('hybrid')) return 'hybrid'
  return 'onsite'
}

async function handleSync(req: NextRequest) {
  const unauthorized = authorizeCronRequest(req)
  if (unauthorized) return unauthorized

  const runId = newRunId()
  const startedAt = Date.now()

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[job-sync] Supabase credentials not configured', { runId })
    return NextResponse.json({ error: 'Internal server error', runId }, { status: 500 })
  }

  const apiKey = process.env.JSEARCH_API_KEY
  const apiHost = process.env.JSEARCH_API_HOST || 'jsearch.p.rapidapi.com'
  if (!apiKey) {
    console.error('[job-sync] JSEARCH_API_KEY is not configured', { runId })
    return NextResponse.json({ error: 'Internal server error', runId }, { status: 500 })
  }

  // Fail-closed lock across serverless instances (Vercel has no overlap guard).
  const lock = await consumeRateLimit('job-sync', 1, MIN_SYNC_INTERVAL_SECONDS)
  if (!lock.allowed) {
    console.warn('[job-sync] rate limited', { runId, resetSeconds: lock.resetSeconds })
    return NextResponse.json(
      {
        error: `Rate limited. Retry in ~${lock.resetSeconds}s.`,
        runId,
      },
      { status: 429 }
    )
  }

  const supabase = createServiceSupabase()
  let inserted = 0
  let skipped = 0
  let failed = 0
  const errors: string[] = []

  console.log(
    JSON.stringify({
      event: 'job-sync.start',
      runId,
      queries: SEARCH_CONFIG.length,
    })
  )

  for (const { query, profession } of SEARCH_CONFIG) {
    try {
      const jobs = await fetchJobs(query, apiKey, apiHost)

      if (jobs.length === 0) {
        console.warn(`[job-sync] Query "${query}" returned 0 results`, { runId })
      }

      for (const job of jobs) {
        const rawJobId = job.job_id
        const jobId = rawJobId != null ? String(rawJobId) : null
        if (!jobId) {
          skipped++
          continue
        }

        const country = (job.job_country as string) || ''
        const jobState = (job.job_state as string) || ''
        const canadianProvinces = [
          'Ontario',
          'Quebec',
          'British Columbia',
          'Alberta',
          'Manitoba',
          'Saskatchewan',
          'Nova Scotia',
          'New Brunswick',
          'Newfoundland',
          'PEI',
        ]
        const isCanadian =
          country === 'CA' ||
          country === 'Canada' ||
          canadianProvinces.some((p) => jobState.includes(p))
        if (isCanadian) {
          skipped++
          continue
        }

        const rawTitle = (job.job_title as string) || ''
        const rawDescription = (job.job_description as string) || ''
        const applyUrl = (job.job_apply_link as string) || (job.job_google_link as string) || ''

        if (!rawDescription || !isValidUrl(applyUrl)) {
          skipped++
          continue
        }

        const title = truncate(stripHtmlTags(rawTitle) || 'Untitled Position', 500)
        const description = truncate(stripHtmlTags(rawDescription), 50000)
        const companyName = truncate(
          stripHtmlTags((job.employer_name as string) || 'Unknown Company'),
          200
        )

        const slugBase = slugify(title) || 'job'
        const slugSuffix = slugify(jobId) || String(Date.now())
        const slug = `${slugBase}-${slugSuffix}`.slice(0, 120)

        const postedAt = safeDate(job.job_posted_at_datetime_utc)
        const expiresAt = new Date(
          new Date(postedAt).getTime() + 30 * 24 * 60 * 60 * 1000
        ).toISOString()

        const city = job.job_city as string | undefined
        const state = job.job_state as string | undefined
        const location = truncate(
          city ? `${city}${state ? `, ${state}` : ''}` : 'United States',
          200
        )

        const payload = {
          slug,
          title,
          company_name: companyName,
          company_id: null,
          tn_profession: VALID_PROFESSIONS.has(profession)
            ? profession
            : 'Computer Systems Analyst',
          description,
          requirements: extractRequirements(job),
          salary_min: sanitizeSalary(job.job_min_salary),
          salary_max: sanitizeSalary(job.job_max_salary),
          location,
          remote_policy: mapRemotePolicy(job),
          employment_type: mapEmploymentType(job.job_employment_type),
          application_url: truncate(applyUrl, 2048),
          is_featured: false,
          is_active: true,
          posted_at: postedAt,
          expires_at: expiresAt,
          source: 'external',
          external_id: jobId,
          last_synced_at: new Date().toISOString(),
          raw_data: job,
        }

        const { error } = await supabase.from('jobs').upsert(payload, { onConflict: 'external_id' })

        if (error) {
          failed++
          errors.push(`${title.slice(0, 50)}: ${error.message}`)
        } else {
          inserted++
        }
      }

      await new Promise((r) => setTimeout(r, 300))
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      errors.push(`Query "${query}": ${msg}`)
      console.error(`[job-sync] Error with "${query}":`, msg, { runId })
    }
  }

  if (inserted > 0) {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const { error: deleteError } = await supabase
      .from('jobs')
      .delete()
      .eq('source', 'external')
      .lt('posted_at', sevenDaysAgo)

    if (deleteError) {
      console.error('[job-sync] Cleanup failed:', deleteError.message, { runId })
      errors.push(`Cleanup: ${deleteError.message}`)
    }
  }

  const durationMs = Date.now() - startedAt
  const success = inserted > 0 && failed === 0 && errors.length === 0
  const status = success ? 200 : inserted > 0 ? 207 : 500

  console.log(
    JSON.stringify({
      event: 'job-sync.end',
      runId,
      durationMs,
      inserted,
      skipped,
      failed,
      errorCount: errors.length,
      status,
    })
  )

  return NextResponse.json(
    {
      success,
      runId,
      durationMs,
      inserted,
      skipped,
      failed,
      errors: errors.slice(0, 10),
    },
    { status }
  )
}

export async function POST(req: NextRequest) {
  return handleSync(req)
}

export async function GET(req: NextRequest) {
  return handleSync(req)
}
