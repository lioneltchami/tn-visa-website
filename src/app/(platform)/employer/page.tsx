'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Building2, Plus, Briefcase, FileText, Users, ExternalLink, AlertCircle } from 'lucide-react'

interface Company { id: string; name: string; industry: string | null; size: string | null; location: string | null; tn_professions_hired: string[]; careers_url: string | null; is_verified: boolean }
interface Job { id: string; title: string; tn_profession: string; location: string; is_active: boolean; posted_at: string; slug: string }

export default function EmployerDashboard() {
  const router = useRouter()
  const [company, setCompany] = useState<Company | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { router.push('/login?redirect=/employer'); return }

        const { data: co } = await supabase.from('companies').select('*').eq('user_id', user.id).single()
        if (!co) { router.push('/companies/add'); return }
        setCompany(co)

        const { data: jobData } = await supabase.from('jobs').select('id,title,tn_profession,location,is_active,posted_at,slug').eq('company_id', co.id).order('posted_at', { ascending: false })
        setJobs(jobData || [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load.')
      } finally { setLoading(false) }
    }
    load()
  }, [router])

  if (loading) return <div className="flex justify-center py-20"><div className="animate-pulse text-fg-muted">Loading...</div></div>
  if (error) return <div className="flex justify-center py-20"><div className="flex items-center gap-2 text-danger"><AlertCircle className="w-5 h-5" />{error}</div></div>
  if (!company) return null

  const activeJobs = jobs.filter(j => j.is_active)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-fg">Employer Dashboard</h1>
        <Link href="/post-job" className="bg-accent text-accent-fg px-4 py-2 rounded text-sm font-medium inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Post a Job
        </Link>
      </div>

      {/* Company Card */}
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center">
            <Building2 className="w-6 h-6 text-fg-muted" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-fg">{company.name}</h2>
              {company.is_verified && <span className="badge text-xs">Verified</span>}
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-fg-muted mt-1">
              {company.industry && <span>{company.industry}</span>}
              {company.location && <span>{company.location}</span>}
              {company.size && <span>{company.size} employees</span>}
            </div>
            {company.tn_professions_hired.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {company.tn_professions_hired.map(p => <span key={p} className="badge text-xs">{p}</span>)}
              </div>
            )}
          </div>
          {company.careers_url && (
            <a href={company.careers_url} target="_blank" rel="noopener noreferrer" className="text-accent text-sm flex items-center gap-1">
              Careers <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-4 text-center">
          <Briefcase className="w-5 h-5 text-accent mx-auto mb-1" />
          <p className="text-2xl font-bold text-fg">{activeJobs.length}</p>
          <p className="text-xs text-fg-muted">Active Jobs</p>
        </div>
        <div className="card p-4 text-center">
          <FileText className="w-5 h-5 text-accent mx-auto mb-1" />
          <p className="text-2xl font-bold text-fg">{jobs.length}</p>
          <p className="text-xs text-fg-muted">Total Posted</p>
        </div>
        <div className="card p-4 text-center">
          <Users className="w-5 h-5 text-accent mx-auto mb-1" />
          <p className="text-2xl font-bold text-fg">&mdash;</p>
          <p className="text-xs text-fg-muted">Profile Views</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <Link href="/post-job" className="card card-interactive p-4 flex items-center gap-3">
          <Plus className="w-5 h-5 text-accent" />
          <div><p className="font-medium text-fg text-sm">Post a Job</p><p className="text-xs text-fg-muted">List a TN-eligible position</p></div>
        </Link>
        <Link href="/employer-guide" className="card card-interactive p-4 flex items-center gap-3">
          <FileText className="w-5 h-5 text-accent" />
          <div><p className="font-medium text-fg text-sm">TN Sponsorship Guide</p><p className="text-xs text-fg-muted">Learn how to sponsor TN workers</p></div>
        </Link>
      </div>

      {/* Job Listings */}
      <h2 className="font-semibold text-fg mb-3">Your Job Listings</h2>
      {jobs.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-fg-muted">No jobs posted yet.</p>
          <Link href="/post-job" className="text-accent text-sm hover:underline mt-2 inline-block">Post your first job</Link>
        </div>
      ) : (
        <div className="space-y-2">
          {jobs.map(job => (
            <Link key={job.id} href={`/jobs/${job.slug}`} className="card card-interactive p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-fg text-sm">{job.title}</p>
                <p className="text-xs text-fg-muted">{job.tn_profession} &middot; {job.location}</p>
              </div>
              <span className={`text-xs font-medium ${job.is_active ? 'text-success' : 'text-fg-muted'}`}>
                {job.is_active ? 'Active' : 'Expired'}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
