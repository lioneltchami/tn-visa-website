'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, MapPin, Users, ExternalLink, Plus } from 'lucide-react'
import professions from '@/data/professions.json'
import { SEED_COMPANIES } from '@/data/seed-companies'

const INDUSTRIES = ['All', 'Tech', 'Finance', 'Healthcare', 'Consulting', 'Other']

export default function CompaniesPage() {
  const [search, setSearch] = useState('')
  const [industry, setIndustry] = useState('All')
  const [profession, setProfession] = useState('')

  const filtered = useMemo(() => {
    return SEED_COMPANIES.filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
      if (industry !== 'All' && c.industry !== industry) return false
      if (profession && !c.tn_professions_hired.includes(profession)) return false
      return true
    })
  }, [search, industry, profession])

  return (
    <div className="section-padding">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">TN-Friendly Companies</h1>
            <p className="text-[hsl(var(--fg-secondary))]">Companies that actively hire Canadian professionals on TN visas</p>
          </div>
          <Link href="/companies/add" className="bg-accent text-accent-fg px-4 py-2 rounded text-sm font-medium inline-flex items-center gap-2 w-fit">
            <Plus className="w-4 h-4" /> Add Your Company
          </Link>
        </div>

        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--fg-muted))]" />
            <input
              type="text"
              placeholder="Search companies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded border border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--fg))] focus:outline-none focus:border-[hsl(var(--accent))]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map(ind => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${industry === ind ? 'bg-accent text-accent-fg' : 'bg-[hsl(var(--bg-secondary))] text-[hsl(var(--fg-secondary))] hover:text-[hsl(var(--fg))]'}`}
              >
                {ind}
              </button>
            ))}
          </div>

          <select
            value={profession}
            onChange={e => setProfession(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--fg))] text-sm"
          >
            <option value="">All TN Professions</option>
            {professions.map((p: { id: string; name: string }) => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(company => (
            <Link key={company.id} href={`/companies/${company.id}`} className="card card-interactive p-6 block">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-lg font-semibold text-[hsl(var(--fg))]">{company.name}</h2>
                <span className="badge">{company.industry}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[hsl(var(--fg-muted))] mb-3">
                <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{company.location}</span>
                <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" />{company.size}</span>
              </div>
              <p className="text-sm text-[hsl(var(--fg-secondary))] mb-3 line-clamp-2">{company.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {company.tn_professions_hired.map(prof => (
                  <span key={prof} className="text-xs px-2 py-0.5 rounded bg-[hsl(var(--bg-secondary))] text-[hsl(var(--fg-secondary))]">{prof}</span>
                ))}
              </div>
              <span className="text-sm font-medium text-[hsl(var(--accent))] inline-flex items-center gap-1">
                View Careers <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[hsl(var(--fg-muted))] py-12">No companies match your filters.</p>
        )}
      </div>
    </div>
  )
}
