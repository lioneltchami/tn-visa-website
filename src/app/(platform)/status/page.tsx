'use client'

import clsx from 'clsx'
import { AlertCircle, AlertTriangle, CheckCircle, Clock, Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import professions from '@/data/professions.json'
import { createClient } from '@/lib/supabase/client'

interface TnStatus {
  id: string
  profession: string
  employer: string
  start_date: string
  end_date: string
  application_method: string | null
  port_of_entry: string | null
  status: string
  notes: string | null
  created_at: string
}

const METHODS = [
  { value: 'poe_land', label: 'Port of Entry (Land)' },
  { value: 'poe_airport', label: 'Port of Entry (Airport)' },
  { value: 'i129', label: 'I-129 Petition' },
  { value: 'consular', label: 'Consular Processing' },
]

export default function StatusPage() {
  const [statuses, setStatuses] = useState<TnStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    profession: '',
    employer: '',
    start_date: '',
    end_date: '',
    application_method: '',
    port_of_entry: '',
    notes: '',
  })

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          setError('Please sign in.')
          setLoading(false)
          return
        }
        const { data, error: err } = await supabase
          .from('tn_status')
          .select('*')
          .eq('user_id', user.id)
          .order('end_date', { ascending: false })
        if (err) throw err
        setStatuses(data || [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not signed in')
      const { data, error: err } = await supabase
        .from('tn_status')
        .insert({
          user_id: user.id,
          profession: form.profession,
          employer: form.employer,
          start_date: form.start_date,
          end_date: form.end_date,
          application_method: form.application_method || null,
          port_of_entry: form.port_of_entry || null,
          notes: form.notes || null,
        })
        .select()
        .single()
      if (err) throw err
      setStatuses((prev) => [data, ...prev])
      setShowForm(false)
      setForm({
        profession: '',
        employer: '',
        start_date: '',
        end_date: '',
        application_method: '',
        port_of_entry: '',
        notes: '',
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  function getDaysLeft(endDate: string) {
    return Math.ceil((new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  }

  function getStatusColor(days: number) {
    if (days <= 0) return 'text-danger'
    if (days <= 90) return 'text-danger'
    if (days <= 180) return 'text-warning'
    return 'text-success'
  }

  function getStatusIcon(days: number) {
    if (days <= 0) return AlertCircle
    if (days <= 90) return AlertTriangle
    return CheckCircle
  }

  const inputCls =
    'w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30'

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="animate-pulse text-fg-muted">Loading…</div>
      </div>
    )

  const current = statuses.find((s) => getDaysLeft(s.end_date) > 0)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-fg">TN Visa Status</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded bg-accent text-accent-fg text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Status
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-danger/10 text-danger border border-danger/20">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="card p-6 mb-6 space-y-3">
          <div>
            <label className="block text-sm font-medium text-fg-secondary mb-1">
              TN Profession *
            </label>
            <select
              required
              value={form.profession}
              onChange={(e) => setForm((f) => ({ ...f, profession: e.target.value }))}
              className={inputCls}
            >
              <option value="">Select…</option>
              {professions.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-fg-secondary mb-1">Employer *</label>
            <input
              required
              value={form.employer}
              onChange={(e) => setForm((f) => ({ ...f, employer: e.target.value }))}
              className={inputCls}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-fg-secondary mb-1">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={form.start_date}
                onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-fg-secondary mb-1">End Date *</label>
              <input
                type="date"
                required
                value={form.end_date}
                onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))}
                className={inputCls}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-fg-secondary mb-1">
                Application Method
              </label>
              <select
                value={form.application_method}
                onChange={(e) => setForm((f) => ({ ...f, application_method: e.target.value }))}
                className={inputCls}
              >
                <option value="">Select…</option>
                {METHODS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-fg-secondary mb-1">
                Port of Entry
              </label>
              <input
                value={form.port_of_entry}
                onChange={(e) => setForm((f) => ({ ...f, port_of_entry: e.target.value }))}
                placeholder="e.g. YYZ"
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-fg-secondary mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={2}
              className={inputCls}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded bg-accent text-accent-fg text-sm font-medium disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2 rounded border border-border text-fg-secondary text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {current &&
        (() => {
          const days = getDaysLeft(current.end_date)
          const Icon = getStatusIcon(days)
          return (
            <div className="card p-6 mb-6">
              <div className="flex items-start gap-4">
                <Icon className={clsx('w-8 h-8 shrink-0', getStatusColor(days))} />
                <div className="flex-1">
                  <p className="font-bold text-fg text-lg">{current.profession}</p>
                  <p className="text-fg-secondary text-sm">{current.employer}</p>
                  <div className="mt-3">
                    <p className={clsx('text-2xl font-bold', getStatusColor(days))}>
                      {days > 0 ? `${days} days remaining` : 'Expired'}
                    </p>
                    <p className="text-xs text-fg-muted mt-1">
                      {current.start_date} to {current.end_date}
                    </p>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-bg-tertiary overflow-hidden">
                    <div
                      className={clsx(
                        'h-full rounded transition-colors',
                        days <= 90 ? 'bg-danger' : days <= 180 ? 'bg-warning' : 'bg-success'
                      )}
                      style={{
                        width: `${Math.max(0, Math.min(100, (days / 1095) * 100))}%`,
                      }}
                    />
                  </div>
                  {days > 0 && days <= 180 && (
                    <Link
                      href="/renewal"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded bg-accent text-accent-fg text-sm font-medium"
                    >
                      <Clock className="w-4 h-4" /> Start Renewal
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })()}

      {statuses.length === 0 && !showForm && (
        <div className="card p-10 text-center">
          <Clock className="w-12 h-12 mx-auto mb-3 text-fg-muted" />
          <p className="text-fg-secondary font-medium">No TN status tracked yet</p>
          <p className="text-fg-muted text-sm mt-1">
            Add your TN visa details to get renewal reminders.
          </p>
        </div>
      )}

      {statuses.length > 1 && (
        <div className="mt-6">
          <h2 className="font-semibold text-fg mb-3">History</h2>
          <div className="space-y-2">
            {statuses.slice(1).map((s) => (
              <div key={s.id} className="card p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-fg text-sm">
                    {s.profession} at {s.employer}
                  </p>
                  <p className="text-xs text-fg-muted">
                    {s.start_date} to {s.end_date}
                  </p>
                </div>
                <span
                  className={clsx(
                    'text-xs font-medium',
                    getDaysLeft(s.end_date) > 0 ? 'text-success' : 'text-fg-muted'
                  )}
                >
                  {getDaysLeft(s.end_date) > 0 ? 'Active' : 'Expired'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
