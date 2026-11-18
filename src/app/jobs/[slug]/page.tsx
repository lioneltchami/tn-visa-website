import { cache } from 'react'
import type { Metadata } from 'next'
import clsx from 'clsx'
import { ArrowLeft, Clock, DollarSign, ExternalLink, MapPin, Star } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JobDescription } from '@/components/JobDescription'
import { JobPostingSchema } from '@/components/StructuredData'
import professions from '@/data/professions.json'
import { httpApplicationUrl } from '@/lib/http-url'
import { logger } from '@/lib/logger'
import { withCanonical } from '@/lib/seo'
import { createServerSupabase } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

interface Job {
  id: string
  slug: string
  title: string
  company_id: string
  company_name: string
  tn_profession: string
  description: string
  requirements: string[]
  salary_min: number | null
  salary_max: number | null
  location: string
  remote_policy: string
  employment_type: string
  application_url: string
  is_featured: boolean
  posted_at: string
  expires_at: string
}

const getJob = cache(async (slug: string): Promise<Job | null> => {
  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('jobs')
    .select(
      'id, slug, title, company_id, company_name, tn_profession, description, requirements, salary_min, salary_max, location, remote_policy, employment_type, application_url, is_featured, posted_at, expires_at'
    )
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()

  if (error) {
    logger.error('Failed to load job:', error.message)
    throw new Error('Failed to load job')
  }

  return (data as Job | null) ?? null
})

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const job = await getJob(params.slug)
  if (!job) notFound()

  return withCanonical(`/jobs/${job.slug}`, {
    title: `${job.title} at ${job.company_name}`,
    description: `${job.title} at ${job.company_name} in ${job.location}. ${job.tn_profession} TN visa job for Canadian professionals.`,
  })
}

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await getJob(params.slug)
  if (!job) notFound()

  const salary =
    job.salary_min && job.salary_max
      ? `$${(job.salary_min / 1000).toFixed(0)}K\u2013$${(job.salary_max / 1000).toFixed(0)}K/year`
      : job.salary_min
        ? `From $${(job.salary_min / 1000).toFixed(0)}K/year`
        : job.salary_max
          ? `Up to $${(job.salary_max / 1000).toFixed(0)}K/year`
          : null

  const applyHref = httpApplicationUrl(job.application_url)

  const professionSlug =
    professions.find((p) => p.name === job.tn_profession)?.slug ||
    job.tn_profession.toLowerCase().replace(/[\s/]+/g, '-')

  return (
    <>
      <JobPostingSchema job={job} />
      <div className="section-padding">
        <div className="container-tight">
          <Link href="/jobs" className="inline-flex items-center gap-1 text-sm text-accent mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to jobs
          </Link>

          <div className={clsx('card p-8', job.is_featured && 'border-accent border-2')}>
            {job.is_featured && (
              <span className="inline-flex items-center gap-1 bg-accent text-accent-fg text-xs font-bold px-2.5 py-1 rounded mb-4">
                <Star className="w-3 h-3" />
                Featured
              </span>
            )}
            <h1 className="text-2xl font-bold text-fg mb-1">{job.title}</h1>
            <p className="text-fg-secondary text-lg mb-4">{job.company_name}</p>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="badge">{job.tn_profession}</span>
              <span className="flex items-center gap-1 text-sm text-fg-muted">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </span>
              {salary && (
                <span className="flex items-center gap-1 text-sm text-fg-muted">
                  <DollarSign className="w-3.5 h-3.5" />
                  {salary}
                </span>
              )}
              <span className="text-sm text-fg-muted capitalize">{job.remote_policy}</span>
              <span className="text-sm text-fg-muted capitalize">
                {job.employment_type.replace('_', ' ')}
              </span>
            </div>

            {applyHref && (
              <a
                href={applyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-accent-fg px-6 py-3 rounded font-medium mb-8"
              >
                Apply Now <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <h2 className="text-lg font-semibold text-fg mb-3">Description</h2>
            <JobDescription
              text={job.description}
              hideSections={job.requirements.length > 0 ? ['qualifications', 'requirements'] : []}
            />
            {job.description.length < 500 && applyHref && (
              <a
                href={applyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent text-sm mt-3 hover:underline"
              >
                Read full description on employer site <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {job.requirements.length > 0 && (
              <>
                <h2 className="text-lg font-semibold text-fg mb-3">Requirements</h2>
                <ul className="list-disc pl-6 space-y-1 text-fg-secondary mb-6">
                  {job.requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </>
            )}

            <div className="pt-4 border-t border-border text-xs text-fg-muted flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Posted {new Date(job.posted_at).toLocaleDateString()}
              </span>
              <span>Expires {new Date(job.expires_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-6 card p-5">
            <p className="text-sm text-fg-secondary">
              This job requires{' '}
              <Link href={`/professions/${professionSlug}`} className="text-accent hover:underline">
                {job.tn_profession}
              </Link>{' '}
              TN visa classification.{' '}
              <Link href="/eligibility" className="text-accent hover:underline">
                Check your eligibility
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
