'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, XCircle, AlertTriangle, Clock, Plus } from 'lucide-react'
import clsx from 'clsx'
import professions from '@/data/professions.json'

interface Experience {
  id: string
  profession: string
  application_method: string
  port_of_entry: string | null
  outcome: string
  date: string
  wait_time_minutes: number | null
  tips: string | null
  story: string | null
  is_anonymous: boolean
  created_at: string
}

const OUTCOME_CONFIG: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  approved: { label: 'Approved', color: 'text-success', icon: CheckCircle },
  denied: { label: 'Denied', color: 'text-danger', icon: XCircle },
  withdrawn: { label: 'Withdrawn', color: 'text-warning', icon: AlertTriangle },
  rfe: { label: 'RFE', color: 'text-accent', icon: Clock },
}

const METHOD_LABELS: Record<string, string> = {
  poe_land: 'Land Border', poe_airport: 'Airport', i129: 'I-129', consular: 'Consular',
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filters, setFilters] = useState({ profession: '', outcome: '', method: '' })

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('experiences').select('*').order('date', { ascending: false })
      setExperiences(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => experiences.filter(e => {
    if (filters.profession && e.profession !== filters.profession) return false
    if (filters.outcome && e.outcome !== filters.outcome) return false
    if (filters.method && e.application_method !== filters.method) return false
    return true
  }), [experiences, filters])

  const stats = useMemo(() => ({
    total: experiences.length,
    approved: experiences.filter(e => e.outcome === 'approved').length,
    avgWait: experiences.filter(e => e.wait_time_minutes).length
      ? Math.round(experiences.filter(e => e.wait_time_minutes).reduce((s, e) => s + (e.wait_time_minutes || 0), 0) / experiences.filter(e => e.wait_time_minutes).length)
      : null,
  }), [experiences])

  const selectCls = 'px-3 py-2 rounded-lg border border-border bg-bg text-fg text-sm'

  return (
    <div className="section-padding">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-fg mb-2">Community Experiences</h1>
            <p className="text-fg-secondary">Real TN visa application stories from the community</p>
          </div>
          <Link href="/experiences/submit" className="bg-accent text-accent-fg px-4 py-2 rounded text-sm font-medium inline-flex items-center gap-2 w-fit">
            <Plus className="w-4 h-4" /> Share Your Experience
          </Link>
        </div>

        {stats.total > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-fg">{stats.total}</p>
              <p className="text-xs text-fg-muted">Total Reports</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-success">{stats.total ? Math.round((stats.approved / stats.total) * 100) : 0}%</p>
              <p className="text-xs text-fg-muted">Approval Rate</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-fg">{stats.avgWait ? `${stats.avgWait} min` : '—'}</p>
              <p className="text-xs text-fg-muted">Avg Wait Time</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-6">
          <select value={filters.profession} onChange={e => setFilters(f => ({ ...f, profession: e.target.value }))} className={selectCls}>
            <option value="">All Professions</option>
            {professions.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
          <select value={filters.outcome} onChange={e => setFilters(f => ({ ...f, outcome: e.target.value }))} className={selectCls}>
            <option value="">All Outcomes</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
            <option value="withdrawn">Withdrawn</option>
            <option value="rfe">RFE</option>
          </select>
          <select value={filters.method} onChange={e => setFilters(f => ({ ...f, method: e.target.value }))} className={selectCls}>
            <option value="">All Methods</option>
            <option value="poe_land">Land Border</option>
            <option value="poe_airport">Airport</option>
            <option value="i129">I-129</option>
            <option value="consular">Consular</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-pulse text-fg-muted">Loading experiences…</div></div>
        ) : filtered.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-fg-secondary font-medium">No experiences yet</p>
            <p className="text-fg-muted text-sm mt-1">Be the first to share your TN visa story!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(exp => {
              const cfg = OUTCOME_CONFIG[exp.outcome] || OUTCOME_CONFIG.approved
              const Icon = cfg.icon
              const isOpen = expanded === exp.id
              return (
                <div key={exp.id} className="card overflow-hidden">
                  <button onClick={() => setExpanded(isOpen ? null : exp.id)} className="w-full p-4 flex items-center gap-4 text-left hover:bg-bg-secondary transition-colors">
                    <Icon className={clsx('w-5 h-5 shrink-0', cfg.color)} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-fg">{exp.profession}</span>
                        <span className="badge text-xs">{METHOD_LABELS[exp.application_method] || exp.application_method}</span>
                        <span className={clsx('text-xs font-medium', cfg.color)}>{cfg.label}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-fg-muted mt-1">
                        <span>{exp.date}</span>
                        {exp.port_of_entry && <span>{exp.port_of_entry}</span>}
                        {exp.wait_time_minutes && <span>{exp.wait_time_minutes} min wait</span>}
                      </div>
                    </div>
                  </button>
                  {isOpen && (exp.story || exp.tips) && (
                    <div className="px-4 pb-4 border-t border-border pt-3 space-y-2">
                      {exp.story && <p className="text-sm text-fg-secondary">{exp.story}</p>}
                      {exp.tips && <p className="text-sm text-accent"><strong>Tip:</strong> {exp.tips}</p>}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
