'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AlertCircle, CheckCircle } from 'lucide-react'
import professions from '@/data/professions.json'

const REMOTE = [{ value: 'onsite', label: 'On-site' }, { value: 'hybrid', label: 'Hybrid' }, { value: 'remote', label: 'Remote' }]

export default function PostJobPage() {
  const router = useRouter()
  const [company, setCompany] = useState<{ id: string; name: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '', tn_profession: '', description: '', requirements: '',
    salary_min: '', salary_max: '', location: '', remote_policy: 'onsite',
    employment_type: 'full_time', application_url: '',
  })

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login?redirect=/post-job'); return }
      const { data } = await supabase.from('companies').select('id, name').eq('user_id', user.id).limit(1).single()
      if (!data) { router.push('/companies/add'); return }
      setCompany(data)
      setLoading(false)
    }
    load()
  }, [router])

  function makeSlug(title: string, company: string) {
    const base = `${title}-at-${company}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70)
    return `${base}-${Date.now().toString(36)}`
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!company) return
    setSaving(true)
    setError(null)
    if (form.salary_min && parseInt(form.salary_min) < 0) { setError('Salary cannot be negative.'); setSaving(false); return }
    if (form.salary_max && parseInt(form.salary_max) < 0) { setError('Salary cannot be negative.'); setSaving(false); return }
    if (form.salary_min && form.salary_max && parseInt(form.salary_min) > parseInt(form.salary_max)) { setError('Min salary cannot exceed max salary.'); setSaving(false); return }
    try {
      const supabase = createClient()
      const { error: err } = await supabase.from('jobs').insert({
        company_id: company.id,
        company_name: company.name,
        title: form.title,
        slug: makeSlug(form.title, company.name),
        tn_profession: form.tn_profession,
        description: form.description,
        requirements: form.requirements.split('\n').filter(Boolean),
        salary_min: form.salary_min ? parseInt(form.salary_min) : null,
        salary_max: form.salary_max ? parseInt(form.salary_max) : null,
        location: form.location,
        remote_policy: form.remote_policy,
        employment_type: form.employment_type,
        application_url: form.application_url,
      })
      if (err) throw err
      setSubmitted(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to post job.')
    } finally { setSaving(false) }
  }

  const inputCls = 'w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30'

  if (loading) return <div className="flex justify-center py-20"><div className="animate-pulse text-fg-muted">Loading…</div></div>

  if (submitted) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
      <CheckCircle className="w-16 h-16 text-success" />
      <h1 className="text-2xl font-bold text-fg">Job Posted!</h1>
      <p className="text-fg-secondary">Your job listing is now live on the TN Visa Job Board.</p>
      <button onClick={() => router.push('/jobs')} className="px-5 py-2.5 rounded bg-accent text-accent-fg font-medium text-sm">View Job Board</button>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-fg mb-2">Post a TN-Eligible Job</h1>
      <p className="text-fg-secondary mb-6">Posting as <strong>{company?.name}</strong></p>

      {error && <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-danger/10 text-danger border border-danger/20"><AlertCircle className="w-5 h-5 shrink-0" /><p className="text-sm">{error}</p></div>}

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div><label className="block text-sm font-medium text-fg-secondary mb-1">Job Title *</label>
          <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Senior Software Engineer" className={inputCls} />
        </div>
        <div><label className="block text-sm font-medium text-fg-secondary mb-1">TN Profession *</label>
          <select required value={form.tn_profession} onChange={e => setForm(f => ({ ...f, tn_profession: e.target.value }))} className={inputCls}>
            <option value="">Select the USMCA profession…</option>
            {professions.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
        </div>
        <div><label className="block text-sm font-medium text-fg-secondary mb-1">Description *</label>
          <textarea required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={5} className={inputCls} />
        </div>
        <div><label className="block text-sm font-medium text-fg-secondary mb-1">Requirements (one per line)</label>
          <textarea value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} rows={3} placeholder="Bachelor's degree in Engineering\n3+ years experience" className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-sm font-medium text-fg-secondary mb-1">Min Salary (USD/year)</label>
            <input type="number" min="0" value={form.salary_min} onChange={e => setForm(f => ({ ...f, salary_min: e.target.value }))} placeholder="80000" className={inputCls} />
          </div>
          <div><label className="block text-sm font-medium text-fg-secondary mb-1">Max Salary (USD/year)</label>
            <input type="number" min="0" value={form.salary_max} onChange={e => setForm(f => ({ ...f, salary_max: e.target.value }))} placeholder="150000" className={inputCls} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-sm font-medium text-fg-secondary mb-1">Location *</label>
            <input required value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="San Francisco, CA" className={inputCls} />
          </div>
          <div><label className="block text-sm font-medium text-fg-secondary mb-1">Remote Policy</label>
            <select value={form.remote_policy} onChange={e => setForm(f => ({ ...f, remote_policy: e.target.value }))} className={inputCls}>
              {REMOTE.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
        </div>
        <div><label className="block text-sm font-medium text-fg-secondary mb-1">Application URL *</label>
          <input required type="url" value={form.application_url} onChange={e => setForm(f => ({ ...f, application_url: e.target.value }))} placeholder="https://careers.company.com/apply" className={inputCls} />
        </div>
        <button type="submit" disabled={saving} className="w-full py-2.5 rounded bg-accent text-accent-fg font-medium disabled:opacity-50">
          {saving ? 'Posting…' : 'Post Job (Free)'}
        </button>
      </form>
    </div>
  )
}
