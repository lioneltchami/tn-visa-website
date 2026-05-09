import { NextRequest, NextResponse } from 'next/server'
import { createServiceSupabase } from '@/lib/supabase/admin'
import professions from '@/data/professions.json'

// Allow up to 60s on Vercel Pro (20 queries)
export const maxDuration = 60

// Minimum minutes between syncs (rate limiting)
const MIN_SYNC_INTERVAL_MINUTES = 30

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function safeDate(value: unknown): string {
  if (typeof value !== 'string') return new Date().toISOString()
  const d = new Date(value)
  if (isNaN(d.getTime())) return new Date().toISOString()
  // Clamp future dates to now
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
  { query: 'Software Engineer TN Visa', profession: 'Computer Systems Analyst' },
  { query: 'Registered Nurse TN Visa', profession: 'Registered Nurse' },
  { query: 'Pharmacist TN Visa', profession: 'Pharmacist' },
  { query: 'Mechanical Engineer TN Visa', profession: 'Engineer' },
  { query: 'Accountant TN Visa', profession: 'Accountant' },
  { query: 'Scientist TN Visa', profession: 'Scientist' },
  { query: 'Architect TN Visa', profession: 'Architect' },
  { query: 'Management Consultant TN Visa', profession: 'Management Consultant' },
]

const VALID_PROFESSIONS = new Set(professions.map(p => p.name))

async function fetchJobs(query: string, apiKey: string, apiHost: string) {
  const url = `https://${apiHost}/search?query=${encodeURIComponent(query)}&location=United%20States&page=1&num_pages=1&date_posted=week`

  const res = await fetch(url, {
    headers: { 'X-RapidAPI-Key': apiKey, 'X-RapidAPI-Host': apiHost },
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
  const quals = highlights.find((h: Record<string, unknown>) => h.title === 'Qualifications' || h.title === 'Requirements')
  if (quals && Array.isArray(quals.items)) {
    return (quals.items as string[]).slice(0, 8).map(item => truncate(String(item), 500))
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
  // Auth — accepts SYNC_SECRET (manual) or CRON_SECRET (Vercel Cron)
  const syncSecret = process.env.SYNC_SECRET
  const cronSecret = process.env.CRON_SECRET
  if (!syncSecret && !cronSecret) {
    console.error('[job-sync] Neither SYNC_SECRET nor CRON_SECRET is configured')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
  const authHeader = req.headers.get('authorization')
  const isValidSync = syncSecret && authHeader === `Bearer ${syncSecret}`
  const isValidCron = cronSecret && authHeader === `Bearer ${cronSecret}`
  if (!isValidSync && !isValidCron) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Validate Supabase env vars before creating client
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[job-sync] Supabase credentials not configured')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

  const apiKey = process.env.JSEARCH_API_KEY
  const apiHost = process.env.JSEARCH_API_HOST || 'jsearch.p.rapidapi.com'
  if (!apiKey) {
    console.error('[job-sync] JSEARCH_API_KEY is not configured')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

  const supabase = createServiceSupabase()

  // Rate limiting: check last sync time (wrapped in try/catch for network errors)
  try {
    const { data: recentJob } = await supabase
      .from('jobs')
      .select('last_synced_at')
      .eq('source', 'external')
      .order('last_synced_at', { ascending: false })
      .limit(1)
      .single()

    if (recentJob?.last_synced_at) {
      const lastSync = new Date(recentJob.last_synced_at).getTime()
      const minInterval = MIN_SYNC_INTERVAL_MINUTES * 60 * 1000
      if (Date.now() - lastSync < minInterval) {
        return NextResponse.json({
          error: `Rate limited. Last sync was ${Math.round((Date.now() - lastSync) / 60000)} minutes ago. Minimum interval is ${MIN_SYNC_INTERVAL_MINUTES} minutes.`,
        }, { status: 429 })
      }
    }
  } catch (err) {
    // If rate-limit check fails (e.g., Supabase down), log and proceed with sync
    // This allows the sync to attempt even if the rate-limit query fails
    console.warn('[job-sync] Rate limit check failed, proceeding with sync:', err)
  }

  let inserted = 0
  let skipped = 0
  let failed = 0
  const errors: string[] = []

  console.log(`[job-sync] Starting sync with ${SEARCH_CONFIG.length} queries`)

  for (const { query, profession } of SEARCH_CONFIG) {
    try {
      const jobs = await fetchJobs(query, apiKey, apiHost)

      if (jobs.length === 0) {
        console.warn(`[job-sync] Query "${query}" returned 0 results`)
      }

      for (const job of jobs) {
        const rawJobId = job.job_id
        const jobId = rawJobId != null ? String(rawJobId) : null
        if (!jobId) {
          skipped++
          continue
        }

        // Skip non-US jobs
        const country = (job.job_country as string) || ''
        if (country && country !== 'US' && country !== 'United States') {
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
        const companyName = truncate(stripHtmlTags((job.employer_name as string) || 'Unknown Company'), 200)

        const slugBase = slugify(title) || 'job'
        const slugSuffix = slugify(jobId) || String(Date.now())
        const slug = `${slugBase}-${slugSuffix}`.slice(0, 120)

        const postedAt = safeDate(job.job_posted_at_datetime_utc)
        const expiresAt = new Date(new Date(postedAt).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()

        const city = job.job_city as string | undefined
        const state = job.job_state as string | undefined
        const location = truncate(city ? `${city}${state ? `, ${state}` : ''}` : 'United States', 200)

        const salaryMin = sanitizeSalary(job.job_min_salary)
        const salaryMax = sanitizeSalary(job.job_max_salary)

        const payload = {
          slug,
          title,
          company_name: companyName,
          company_id: null,
          tn_profession: VALID_PROFESSIONS.has(profession) ? profession : 'Computer Systems Analyst',
          description,
          requirements: extractRequirements(job),
          salary_min: salaryMin,
          salary_max: salaryMax,
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

      await new Promise(r => setTimeout(r, 300))
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      errors.push(`Query "${query}": ${msg}`)
      console.error(`[job-sync] Error with "${query}":`, msg)
    }
  }

  // Only run cleanup if we successfully inserted at least one job
  if (inserted > 0) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const { error: deleteError } = await supabase
      .from('jobs')
      .delete()
      .eq('source', 'external')
      .lt('posted_at', thirtyDaysAgo)

    if (deleteError) {
      console.error('[job-sync] Cleanup failed:', deleteError.message)
    }
  }

  const success = inserted > 0 || errors.length === 0
  console.log(`[job-sync] Done: ${inserted} upserted, ${skipped} skipped, ${failed} failed`)

  return NextResponse.json({
    success,
    inserted,
    skipped,
    failed,
    errors: errors.slice(0, 10),
  }, { status: success ? 200 : 207 })
}

export async function POST(req: NextRequest) {
  return handleSync(req)
}

export async function GET(req: NextRequest) {
  return handleSync(req)
}
