import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import { logger } from '@/lib/logger'
import { createServerSupabase } from '@/lib/supabase/server'
import JobsBoard, { type JobListing } from './JobsBoard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = withCanonical('/jobs', {
  title: 'TN Visa Jobs in the USA for Canadians (2026)',
  description:
    'TN visa sponsorship jobs in the USA for Canadians — every listing checked for USMCA profession eligibility. Updated regularly.',
})

export default async function JobsPage() {
  const supabase = createServerSupabase()
  // Active rows only. The sync route owns external expiry; do not cut off posted_at here.
  const { data, error } = await supabase
    .from('jobs')
    .select(
      'id,slug,title,company_name,tn_profession,location,salary_min,salary_max,remote_policy,employment_type,is_featured,posted_at'
    )
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('posted_at', { ascending: false })

  if (error) logger.error('Failed to load jobs:', error.message)

  return <JobsBoard jobs={(data ?? []) as JobListing[]} />
}
