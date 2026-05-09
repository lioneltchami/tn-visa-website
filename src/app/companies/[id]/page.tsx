'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Company } from '@/types/database'
import { SEED_COMPANIES } from '@/data/seed-companies'
import { MapPin, Users, ExternalLink, ArrowLeft, Building2 } from 'lucide-react'

export default function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data, error: fetchErr } = await supabase.from('companies').select('*').eq('id', id).single()
        if (fetchErr && fetchErr.code !== 'PGRST116') throw fetchErr
        if (data) { setCompany(data); setLoading(false); return }
      } catch (err) {
        // Fall through to mock data if Supabase fails
        logger.error('Failed to load from Supabase:', err instanceof Error ? err.message : err)
      }
      setCompany(SEED_COMPANIES.find(c => c.id === id) || null)
      if (!SEED_COMPANIES.find(c => c.id === id)) setError('Company not found.')
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <div className="section-padding"><div className="container-tight"><p className="text-[hsl(var(--fg-muted))]">Loading...</p></div></div>
  if (!company) return <div className="section-padding"><div className="container-tight"><p className="text-[hsl(var(--fg-muted))]">{error || 'Company not found.'}</p></div></div>

  return (
    <div className="section-padding">
      <div className="container-tight">
        <Link href="/companies" className="inline-flex items-center gap-1 text-sm text-[hsl(var(--accent))] mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to directory
        </Link>

        <div className="card p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-[hsl(var(--bg-secondary))] flex items-center justify-center">
              <Building2 className="w-7 h-7 text-[hsl(var(--fg-muted))]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[hsl(var(--fg))]">{company.name}</h1>
              <div className="flex items-center gap-3 text-sm text-[hsl(var(--fg-muted))] mt-1">
                {company.industry && <span className="badge">{company.industry}</span>}
                {company.location && <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{company.location}</span>}
                {company.size && <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" />{company.size}</span>}
              </div>
            </div>
          </div>

          {company.description && <p className="text-[hsl(var(--fg-secondary))] mb-6">{company.description}</p>}

          {company.tn_professions_hired.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-[hsl(var(--fg))] mb-2">TN Professions Hired</h2>
              <div className="flex flex-wrap gap-2">
                {company.tn_professions_hired.map(p => <span key={p} className="badge">{p}</span>)}
              </div>
            </div>
          )}

          {company.careers_url && (
            <a href={company.careers_url} target="_blank" rel="noopener noreferrer" className="gradient-bg text-[hsl(var(--accent-fg))] px-5 py-2.5 rounded-full font-medium inline-flex items-center gap-2">
              Visit Careers Page <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
