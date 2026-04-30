'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { MapPin, DollarSign, Clock, Briefcase, Plus, Star } from 'lucide-react'
import clsx from 'clsx'
import professions from '@/data/professions.json'

interface Job {
  id: string; slug: string; title: string; company_name: string; tn_profession: string
  location: string; salary_min: number | null; salary_max: number | null
  remote_policy: string; employment_type: string; is_featured: boolean; posted_at: string
}

const REMOTE = [{ value: '', label: 'Any' }, { value: 'onsite', label: 'On-site' }, { value: 'hybrid', label: 'Hybrid' }, { value: 'remote', label: 'Remote' }]

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ profession: '', location: '', remote: '' })

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data, error } = await supabase.from('jobs').select('id,slug,title,company_name,tn_profession,location,salary_min,salary_max,remote_policy,employment_type,is_featured,posted_at').order('is_featured', { ascending: false }).order('posted_at', { ascending: false })
      if (error) console.error('Failed to load jobs:', error.message)
      setJobs(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => jobs.filter(j => {
    if (filters.profession && j.tn_profession !== filters.profession) return false
    if (filters.location && !j.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    if (filters.remote && j.remote_policy !== filters.remote) return false
    return true
  }), [jobs, filters])

  function formatSalary(min: number | null, max: number | null) {
    if (!min && !max) return null
    if (min && max) return `$${(min/1000).toFixed(0)}K\u2013$${(max/1000).toFixed(0)}K`
    if (min) return `From $${(min/1000).toFixed(0)}K`
    return `Up to $${(max!/1000).toFixed(0)}K`
  }

  function timeAgo(date: string) {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000)
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 30) return `${days}d ago`
    return `${Math.floor(days/30)}mo ago`
  }

  const selectCls = 'px-3 py-2 rounded-lg border border-border bg-bg text-fg text-sm'

  return (
    <div className="section-padding">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">TN Visa Job Board</h1>
            <p className="text-fg-secondary">Every job here is TN-eligible. No guessing, no filtering through irrelevant listings.</p>
          </div>
          <Link href="/post-job" className="gradient-bg text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 w-fit">
            <Plus className="w-4 h-4" /> Post a Job
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <select value={filters.profession} onChange={e => setFilters(f => ({ ...f, profession: e.target.value }))} className={selectCls}>
            <option value="">All Professions</option>
            {professions.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
          <input value={filters.location} onChange={e => setFilters(f => ({ ...f, location: e.target.value }))} placeholder="Filter by location..." className={clsx(selectCls, 'w-48')} />
          <select value={filters.remote} onChange={e => setFilters(f => ({ ...f, remote: e.target.value }))} className={selectCls}>
            {REMOTE.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-pulse text-fg-muted">Loading jobs...</div></div>
        ) : filtered.length === 0 ? (
          <div className="card p-10 text-center">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-fg-muted" />
            <p className="text-fg-secondary font-medium">No jobs posted yet</p>
            <p className="text-fg-muted text-sm mt-1">Know a TN-friendly employer? <Link href="/post-job" className="text-accent hover:underline">Tell them about us</Link>.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(job => (
              <Link key={job.id} href={`/jobs/${job.slug}`} className={clsx('card card-interactive p-5 block', job.is_featured && 'border-accent border-2 relative')}>
                {job.is_featured && <span className="absolute -top-2.5 right-4 gradient-bg text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Star className="w-3 h-3" />Featured</span>}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-fg text-lg">{job.title}</h2>
                    <p className="text-fg-secondary text-sm">{job.company_name}</p>
                  </div>
                  <span className="badge shrink-0">{job.tn_profession}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-fg-muted">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                  {formatSalary(job.salary_min, job.salary_max) && <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{formatSalary(job.salary_min, job.salary_max)}</span>}
                  <span className="capitalize">{job.remote_policy}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{timeAgo(job.posted_at)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
