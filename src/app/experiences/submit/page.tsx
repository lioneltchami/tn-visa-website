'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, AlertCircle } from 'lucide-react'
import professions from '@/data/professions.json'

const METHODS = [
  { value: 'poe_land', label: 'Port of Entry (Land Border)' },
  { value: 'poe_airport', label: 'Port of Entry (Airport)' },
  { value: 'i129', label: 'I-129 Petition (USCIS)' },
  { value: 'consular', label: 'Consular Processing' },
]
const OUTCOMES = [
  { value: 'approved', label: 'Approved' },
  { value: 'denied', label: 'Denied' },
  { value: 'withdrawn', label: 'Withdrawn' },
  { value: 'rfe', label: 'Request for Evidence (RFE)' },
]

export default function SubmitExperiencePage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    profession: '', application_method: '', port_of_entry: '', outcome: '',
    date: '', wait_time_minutes: '', questions_asked: '', tips: '', story: '', is_anonymous: false,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setError('Please sign in to submit.'); setSaving(false); return }
      const { error: err } = await supabase.from('experiences').insert({
        user_id: user.id,
        profession: form.profession,
        application_method: form.application_method,
        port_of_entry: form.port_of_entry || null,
        outcome: form.outcome,
        date: form.date,
        wait_time_minutes: form.wait_time_minutes ? parseInt(form.wait_time_minutes) : null,
        questions_asked: form.questions_asked ? form.questions_asked.split('\n').filter(Boolean) : [],
        tips: form.tips || null,
        story: form.story || null,
        is_anonymous: form.is_anonymous,
      })
      if (err) throw err
      setSubmitted(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to submit.')
    } finally { setSaving(false) }
  }

  const inputCls = 'w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30'

  if (submitted) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4">
      <CheckCircle className="w-16 h-16 text-success" />
      <h1 className="text-2xl font-bold text-fg">Thank You!</h1>
      <p className="text-fg-secondary">Your experience has been submitted for review. It will appear on the site after moderation.</p>
      <button onClick={() => router.push('/experiences')} className="px-5 py-2.5 rounded bg-accent text-accent-fg font-medium text-sm">Back to Experiences</button>
    </div>
  )

  return (
    <div className="section-padding">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-fg mb-2">Share Your TN Visa Experience</h1>
        <p className="text-fg-secondary mb-6">Help other applicants by sharing what happened during your application.</p>

        {error && <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-danger/10 text-danger border border-danger/20"><AlertCircle className="w-5 h-5 shrink-0" /><p className="text-sm">{error}</p></div>}

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div><label className="block text-sm font-medium text-fg-secondary mb-1">TN Profession *</label>
            <select required value={form.profession} onChange={e => setForm(f => ({ ...f, profession: e.target.value }))} className={inputCls}>
              <option value="">Select…</option>
              {professions.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-fg-secondary mb-1">Method *</label>
              <select required value={form.application_method} onChange={e => setForm(f => ({ ...f, application_method: e.target.value }))} className={inputCls}>
                <option value="">Select…</option>
                {METHODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-medium text-fg-secondary mb-1">Outcome *</label>
              <select required value={form.outcome} onChange={e => setForm(f => ({ ...f, outcome: e.target.value }))} className={inputCls}>
                <option value="">Select…</option>
                {OUTCOMES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-fg-secondary mb-1">Date *</label>
              <input type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className={inputCls} />
            </div>
            <div><label className="block text-sm font-medium text-fg-secondary mb-1">Wait Time (minutes)</label>
              <input type="number" min="0" value={form.wait_time_minutes} onChange={e => setForm(f => ({ ...f, wait_time_minutes: e.target.value }))} placeholder="e.g. 45" className={inputCls} />
            </div>
          </div>
          <div><label className="block text-sm font-medium text-fg-secondary mb-1">Port of Entry</label>
            <input value={form.port_of_entry} onChange={e => setForm(f => ({ ...f, port_of_entry: e.target.value }))} placeholder="e.g. Toronto Pearson (YYZ)" className={inputCls} />
          </div>
          <div><label className="block text-sm font-medium text-fg-secondary mb-1">Questions Asked (one per line)</label>
            <textarea value={form.questions_asked} onChange={e => setForm(f => ({ ...f, questions_asked: e.target.value }))} rows={3} placeholder="What will you be doing?\nHow long will you stay?" className={inputCls} />
          </div>
          <div><label className="block text-sm font-medium text-fg-secondary mb-1">Tips for Others</label>
            <textarea value={form.tips} onChange={e => setForm(f => ({ ...f, tips: e.target.value }))} rows={2} placeholder="What advice would you give?" className={inputCls} />
          </div>
          <div><label className="block text-sm font-medium text-fg-secondary mb-1">Full Story</label>
            <textarea value={form.story} onChange={e => setForm(f => ({ ...f, story: e.target.value }))} rows={4} placeholder="Describe your experience…" className={inputCls} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_anonymous} onChange={e => setForm(f => ({ ...f, is_anonymous: e.target.checked }))} className="rounded border-border" />
            <span className="text-sm text-fg-secondary">Submit anonymously</span>
          </label>
          <button type="submit" disabled={saving} className="w-full py-2.5 rounded bg-accent text-accent-fg font-medium disabled:opacity-50">
            {saving ? 'Submitting…' : 'Submit Experience'}
          </button>
        </form>
      </div>
    </div>
  )
}
