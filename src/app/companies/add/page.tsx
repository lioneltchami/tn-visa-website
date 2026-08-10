'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, AlertCircle } from 'lucide-react'

const TOP_PROFESSIONS = [
  'Engineer', 'Computer Systems Analyst', 'Accountant', 'Management Consultant',
  'Economist', 'Graphic Designer', 'Architect', 'Lawyer', 'Mathematician',
  'Technical Publications Writer', 'Pharmacist', 'Physician', 'Registered Nurse',
  'Dentist', 'Social Worker',
]

const INDUSTRIES = ['Tech', 'Finance', 'Healthcare', 'Consulting', 'Education', 'Other']
const SIZES = ['1-10', '11-50', '51-200', '201-500', '500+']

export default function AddCompanyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '', domain: '', industry: '', size: '', location: '', description: '', careers_url: '', tn_professions_hired: [] as string[],
  })

  const toggleProfession = (p: string) => {
    setForm(f => ({
      ...f,
      tn_professions_hired: f.tn_professions_hired.includes(p)
        ? f.tn_professions_hired.filter(x => x !== p)
        : [...f.tn_professions_hired, p],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (form.name.trim().length < 2) {
      setError('Company name must be at least 2 characters.')
      return
    }
    if (form.domain && !/^[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,}$/.test(form.domain)) {
      setError('Please enter a valid domain (e.g. company.com).')
      return
    }
    if (form.careers_url && !/^https?:\/\/.+/.test(form.careers_url)) {
      setError('Careers URL must start with http:// or https://.')
      return
    }

    try {
      const supabase = createClient()
      const { error: insertErr } = await supabase.from('companies').insert({
        name: form.name,
        domain: form.domain || null,
        industry: form.industry,
        size: form.size,
        location: form.location,
        description: form.description,
        careers_url: form.careers_url || null,
        tn_professions_hired: form.tn_professions_hired,
        tn_friendly: true,
        is_verified: false,
      })
      if (insertErr) throw insertErr
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit company. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="section-padding">
        <div className="container-tight text-center py-16">
          <CheckCircle className="w-12 h-12 text-[hsl(var(--success))] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Company Submitted!</h2>
          <p className="text-[hsl(var(--fg-secondary))]">Thank you for adding your company. It will appear in the directory after review.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding">
      <div className="container-tight">
        <h1 className="text-3xl font-bold gradient-text mb-2">Add Your Company</h1>
        <p className="text-[hsl(var(--fg-secondary))] mb-8">List your company as TN-friendly to attract Canadian talent.</p>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-danger/10 text-danger border border-danger/20">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="card p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-[hsl(var(--fg))]">Company Name *</span>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1 w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--fg))]" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[hsl(var(--fg))]">Domain</span>
              <input value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))} placeholder="company.com" className="mt-1 w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--fg))]" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[hsl(var(--fg))]">Industry *</span>
              <select required value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))} className="mt-1 w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--fg))]">
                <option value="">Select...</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[hsl(var(--fg))]">Size *</span>
              <select required value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))} className="mt-1 w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--fg))]">
                <option value="">Select...</option>
                {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[hsl(var(--fg))]">Location *</span>
              <input required value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="mt-1 w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--fg))]" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[hsl(var(--fg))]">Careers URL</span>
              <input value={form.careers_url} onChange={e => setForm(f => ({ ...f, careers_url: e.target.value }))} placeholder="https://..." className="mt-1 w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--fg))]" />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-[hsl(var(--fg))]">Description</span>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="mt-1 w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--fg))]" />
          </label>

          <fieldset>
            <legend className="text-sm font-medium text-[hsl(var(--fg))] mb-2">TN Professions Hired</legend>
            <div className="flex flex-wrap gap-2">
              {TOP_PROFESSIONS.map(p => (
                <button type="button" key={p} onClick={() => toggleProfession(p)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${form.tn_professions_hired.includes(p) ? 'bg-accent text-accent-fg' : 'bg-[hsl(var(--bg-secondary))] text-[hsl(var(--fg-secondary))]'}`}
                >{p}</button>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="bg-accent text-accent-fg px-6 py-2.5 rounded font-medium">
            Submit Company
          </button>
        </form>
      </div>
    </div>
  )
}
