'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Briefcase, Building2, ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import professions from '@/data/professions.json'

type Role = 'engineer' | 'company' | null

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<Role>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [engineer, setEngineer] = useState({
    full_name: '', headline: '', tn_profession: '',
    years_experience: '', education_level: '', education_field: '',
    linkedin_url: '', github_url: '', portfolio_url: '',
  })
  const [company, setCompany] = useState({
    name: '', industry: '', size: '', location: '',
    careers_url: '', description: '', domain: '', logo_url: '',
  })

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  async function handleSubmit() {
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { data: { user }, error: authErr } = await supabase.auth.getUser()
      if (authErr || !user) { setError('Please sign in to continue.'); setLoading(false); return }

      if (role === 'engineer') {
        const payload = {
          user_id: user.id, role: 'engineer' as const, email: user.email!,
          full_name: engineer.full_name, headline: engineer.headline,
          tn_profession: engineer.tn_profession,
          years_experience: engineer.years_experience ? Number(engineer.years_experience) : undefined,
          education_level: engineer.education_level, education_field: engineer.education_field,
          linkedin_url: engineer.linkedin_url || undefined,
          github_url: engineer.github_url || undefined,
          portfolio_url: engineer.portfolio_url || undefined,
          skills: [], is_public: true,
        }
        const { error: insertErr } = await supabase.from('profiles').insert(payload)
        if (insertErr) throw insertErr
      } else {
        const payload = {
          name: company.name, industry: company.industry, size: company.size,
          location: company.location, careers_url: company.careers_url || undefined,
          description: company.description || undefined, domain: company.domain || undefined,
          logo_url: company.logo_url || undefined, user_id: user.id,
          tn_friendly: true, tn_professions_hired: [], is_verified: false,
        }
        const { error: insertErr } = await supabase.from('companies').insert(payload)
        if (insertErr) throw insertErr
      }
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete onboarding.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="h-2 rounded-full bg-bg-secondary overflow-hidden">
          <div className="h-full accent-fill transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-fg-muted text-sm mt-2">Step {step} of {totalSteps}</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-danger/10 text-danger border border-danger/20">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold mb-2">Welcome! What brings you here?</h1>
          <p className="text-fg-secondary mb-8">Choose your role to get started.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {([
              { id: 'engineer' as const, icon: Briefcase, title: 'Engineer', desc: "I'm looking for TN opportunities" },
              { id: 'company' as const, icon: Building2, title: 'Company', desc: "I'm hiring TN professionals" },
            ]).map(({ id, icon: Icon, title, desc }) => (
              <button key={id} onClick={() => { setRole(id); setStep(2) }}
                className={`card card-interactive p-8 text-left flex flex-col items-center text-center gap-4 ${role === id ? 'border-accent' : ''}`}>
                <Icon className="w-10 h-10 text-accent" />
                <div>
                  <p className="font-semibold text-lg">{title}</p>
                  <p className="text-fg-muted text-sm mt-1">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && role === 'engineer' && (
        <div>
          <h1 className="text-2xl font-bold mb-6">Tell us about yourself</h1>
          <div className="space-y-4">
            <Input label="Full Name" value={engineer.full_name} onChange={v => setEngineer({ ...engineer, full_name: v })} />
            <Input label="Headline" value={engineer.headline} onChange={v => setEngineer({ ...engineer, headline: v })} placeholder="e.g. Senior Software Engineer" />
            <div>
              <label className="block text-sm font-medium mb-1">TN Profession</label>
              <select value={engineer.tn_profession} onChange={e => setEngineer({ ...engineer, tn_profession: e.target.value })}
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg">
                <option value="">Select profession...</option>
                {professions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <Input label="Years of Experience" type="number" value={engineer.years_experience} onChange={v => setEngineer({ ...engineer, years_experience: v })} />
            <div>
              <label className="block text-sm font-medium mb-1">Education Level</label>
              <select value={engineer.education_level} onChange={e => setEngineer({ ...engineer, education_level: e.target.value })}
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg">
                <option value="">Select…</option>
                {["Bachelor's", "Master's", "Doctorate", "Post-secondary Diploma"].map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <Input label="Education Field" value={engineer.education_field} onChange={v => setEngineer({ ...engineer, education_field: v })} placeholder="e.g. Computer Science" />
          </div>
        </div>
      )}

      {step === 2 && role === 'company' && (
        <div>
          <h1 className="text-2xl font-bold mb-6">Tell us about your company</h1>
          <div className="space-y-4">
            <Input label="Company Name" value={company.name} onChange={v => setCompany({ ...company, name: v })} />
            <Input label="Industry" value={company.industry} onChange={v => setCompany({ ...company, industry: v })} />
            <div>
              <label className="block text-sm font-medium mb-1">Company Size</label>
              <select value={company.size} onChange={e => setCompany({ ...company, size: e.target.value })}
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg">
                <option value="">Select…</option>
                {['1-10', '11-50', '51-200', '201-1000', '1000+'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <Input label="Location" value={company.location} onChange={v => setCompany({ ...company, location: v })} placeholder="e.g. San Francisco, CA" />
            <Input label="Careers URL" value={company.careers_url} onChange={v => setCompany({ ...company, careers_url: v })} />
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={company.description} onChange={e => setCompany({ ...company, description: e.target.value })}
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg min-h-[80px]" />
            </div>
          </div>
        </div>
      )}

      {step === 3 && role === 'engineer' && (
        <div>
          <h1 className="text-2xl font-bold mb-6">Add your links</h1>
          <div className="space-y-4">
            <Input label="LinkedIn URL" value={engineer.linkedin_url} onChange={v => setEngineer({ ...engineer, linkedin_url: v })} />
            <Input label="GitHub / Website" value={engineer.github_url} onChange={v => setEngineer({ ...engineer, github_url: v })} />
            <Input label="Portfolio" value={engineer.portfolio_url} onChange={v => setEngineer({ ...engineer, portfolio_url: v })} />
          </div>
        </div>
      )}

      {step === 3 && role === 'company' && (
        <div>
          <h1 className="text-2xl font-bold mb-6">Company details</h1>
          <div className="space-y-4">
            <Input label="Domain" value={company.domain} onChange={v => setCompany({ ...company, domain: v })} placeholder="e.g. example.com" />
            <Input label="Logo URL" value={company.logo_url} onChange={v => setCompany({ ...company, logo_url: v })} placeholder="https://…" />
          </div>
        </div>
      )}

      {step > 1 && (
        <div className="flex justify-between mt-8">
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          {step < totalSteps ? (
            <button onClick={() => setStep(step + 1)} className="flex items-center gap-2 px-4 py-2 rounded-lg accent-fill">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 px-6 py-2 rounded-lg accent-fill disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Complete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function Input({ label, value, onChange, type = 'text', placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg" />
    </div>
  )
}
