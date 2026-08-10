'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Copy, Check, FileText } from 'lucide-react'
import clsx from 'clsx'
import professions from '@/data/professions.json'
import { trackEvent } from '@/hooks/useAnalytics'

interface FormData {
  profession: string
  companyName: string
  companyAddress: string
  companyPhone: string
  companyWebsite: string
  signatoryName: string
  signatoryTitle: string
  signatoryEmail: string
  companyDescription: string
  applicantName: string
  citizenship: 'Canadian' | 'Mexican'
  degree: string
  institution: string
  yearsExperience: string
  jobTitle: string
  startDate: string
  endDate: string
  salary: string
  workLocation: string
  duties: string[]
}

const INITIAL: FormData = {
  profession: '', companyName: '', companyAddress: '', companyPhone: '', companyWebsite: '',
  signatoryName: '', signatoryTitle: '', signatoryEmail: '', companyDescription: '',
  applicantName: '', citizenship: 'Canadian', degree: '', institution: '', yearsExperience: '',
  jobTitle: '', startDate: '', endDate: '', salary: '', workLocation: '', duties: ['', '', '', '', '', '', ''],
}

const STEPS = ['Profession', 'Company', 'Applicant', 'Position', 'Preview']

export default function LetterBuilder() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(INITIAL)
  const [copied, setCopied] = useState(false)

  const prof = professions.find(p => p.name === form.profession)
  const titleMismatch = form.jobTitle && form.profession && !form.jobTitle.toLowerCase().includes(form.profession.toLowerCase()) && form.jobTitle !== form.profession

  const set = (field: keyof FormData, value: string) => setForm(f => ({ ...f, [field]: value }))
  const setDuty = (i: number, v: string) => setForm(f => ({ ...f, duties: f.duties.map((d, j) => j === i ? v : d) }))

  const canNext = () => {
    if (step === 0) return !!form.profession
    if (step === 1) return !!(form.companyName && form.signatoryName && form.signatoryTitle)
    if (step === 2) return !!(form.applicantName && form.degree && form.institution)
    if (step === 3) return !!(form.jobTitle && form.startDate && form.endDate && form.salary && form.workLocation && form.duties.filter(Boolean).length >= 3)
    return true
  }

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const letterText = `${form.companyName}
${form.companyAddress}
${form.companyPhone}${form.companyWebsite ? '\n' + form.companyWebsite : ''}

${today}

U.S. Customs and Border Protection
Port of Entry

RE: TN Visa Application for ${form.applicantName} — ${form.profession}

Dear Officer:

${form.companyName} is ${form.companyDescription || 'a company'}. We are writing to support the TN visa application of ${form.applicantName}, a citizen of ${form.citizenship === 'Canadian' ? 'Canada' : 'Mexico'}, for the position of ${form.jobTitle} under the USMCA ${form.profession} classification.

Position and Duties:
${form.applicantName} will serve as ${form.jobTitle} and will be responsible for:
${form.duties.filter(Boolean).map(d => '• ' + d).join('\n')}

Qualifications:
${form.applicantName} holds a ${form.degree} from ${form.institution}.${form.yearsExperience ? ` ${form.applicantName.split(' ')[0]} has ${form.yearsExperience} years of relevant professional experience.` : ''}

Terms of Employment:
Start date: ${form.startDate}
End date: ${form.endDate}
Salary: $${form.salary} per year
Location: ${form.workLocation}

Temporary Nature:
This position is temporary in nature. ${form.applicantName} will depart the United States upon completion of employment or expiration of authorized stay.

Sincerely,


${form.signatoryName}
${form.signatoryTitle}
${form.companyPhone}${form.signatoryEmail ? ' | ' + form.signatoryEmail : ''}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(letterText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleProfessionChange = (name: string) => {
    const p = professions.find(pr => pr.name === name)
    setForm(f => ({
      ...f,
      profession: name,
      duties: p?.employerLetterTips ? [...p.employerLetterTips.slice(0, 4).map(() => ''), '', '', ''] : ['', '', '', '', '', '', ''],
    }))
  }

  const inputCls = 'w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent'
  const labelCls = 'block text-sm font-medium text-fg-secondary mb-1'

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="gradient-bg p-2.5 rounded-xl"><FileText className="w-5 h-5 text-white" /></div>
        <h2 className="text-xl font-bold text-fg">Employer Letter Builder</h2>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1">
            <div className={clsx('h-1.5 rounded-full transition-colors', i <= step ? 'gradient-bg' : 'bg-bg-tertiary')} />
            <p className={clsx('text-xs mt-1 text-center', i <= step ? 'text-accent font-medium' : 'text-fg-muted')}>{s}</p>
          </div>
        ))}
      </div>

      <div className="min-h-[300px]">
        {/* Step 0: Profession */}
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-fg">Select TN Profession</h3>
            <p className="text-sm text-fg-muted">The profession name must match the USMCA list exactly.</p>
            <select value={form.profession} onChange={e => handleProfessionChange(e.target.value)} className={inputCls}>
              <option value="">Select a profession...</option>
              {professions.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
            {prof && (
              <div className="text-sm text-fg-secondary space-y-2">
                <p><strong>USMCA Name:</strong> {prof.name}</p>
                <p><strong>Min. Education:</strong> {prof.minEducation}</p>
                {prof.juneUpdate && <p className="text-warning"><strong>Warning:</strong> {prof.juneUpdate}</p>}
              </div>
            )}
          </div>
        )}

        {/* Step 1: Company */}
        {step === 1 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-fg">Company Information</h3>
            <div><label className={labelCls}>Company Name *</label><input value={form.companyName} onChange={e => set('companyName', e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Company Address</label><input value={form.companyAddress} onChange={e => set('companyAddress', e.target.value)} placeholder="123 Main St, City, State ZIP" className={inputCls} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Phone</label><input value={form.companyPhone} onChange={e => set('companyPhone', e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>Website</label><input value={form.companyWebsite} onChange={e => set('companyWebsite', e.target.value)} className={inputCls} /></div>
            </div>
            <div><label className={labelCls}>Signatory Name *</label><input value={form.signatoryName} onChange={e => set('signatoryName', e.target.value)} placeholder="HR Director or VP" className={inputCls} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Signatory Title *</label><input value={form.signatoryTitle} onChange={e => set('signatoryTitle', e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>Signatory Email</label><input value={form.signatoryEmail} onChange={e => set('signatoryEmail', e.target.value)} className={inputCls} /></div>
            </div>
            <div><label className={labelCls}>Company Description (1-2 sentences)</label><textarea value={form.companyDescription} onChange={e => set('companyDescription', e.target.value)} rows={2} placeholder="a technology company specializing in..." className={inputCls} /></div>
          </div>
        )}

        {/* Step 2: Applicant */}
        {step === 2 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-fg">Applicant Information</h3>
            <div><label className={labelCls}>Full Legal Name *</label><input value={form.applicantName} onChange={e => set('applicantName', e.target.value)} className={inputCls} /></div>
            <div>
              <label className={labelCls}>Citizenship *</label>
              <select value={form.citizenship} onChange={e => set('citizenship', e.target.value)} className={inputCls}>
                <option value="Canadian">Canadian</option>
                <option value="Mexican">Mexican</option>
              </select>
            </div>
            <div><label className={labelCls}>Degree *</label><input value={form.degree} onChange={e => set('degree', e.target.value)} placeholder="Bachelor of Science in Computer Science" className={inputCls} /></div>
            <div><label className={labelCls}>Institution *</label><input value={form.institution} onChange={e => set('institution', e.target.value)} placeholder="e.g. University of Toronto, UBC, McGill, Waterloo" className={inputCls} /></div>
            <div><label className={labelCls}>Years of Relevant Experience</label><input value={form.yearsExperience} onChange={e => set('yearsExperience', e.target.value)} type="number" min="0" className={inputCls} /></div>
          </div>
        )}

        {/* Step 3: Position */}
        {step === 3 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-fg">Position Details</h3>
            <div>
              <label className={labelCls}>Job Title *</label>
              <input value={form.jobTitle} onChange={e => set('jobTitle', e.target.value)} className={inputCls} />
              {titleMismatch && <p className="text-warning text-xs mt-1">Warning: Job title doesn&apos;t match the TN profession &quot;{form.profession}&quot;. Ensure duties align with the USMCA category.</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Start Date *</label><input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>End Date *</label><input type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} className={inputCls} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Annual Salary (USD) *</label><input value={form.salary} onChange={e => set('salary', e.target.value)} placeholder="100000" className={inputCls} /></div>
              <div><label className={labelCls}>Work Location *</label><input value={form.workLocation} onChange={e => set('workLocation', e.target.value)} placeholder="San Francisco, CA" className={inputCls} /></div>
            </div>
            <div>
              <label className={labelCls}>Job Duties (minimum 3) *</label>
              {prof?.employerLetterTips && <p className="text-xs text-fg-muted mb-2">Tips: {prof.employerLetterTips.join('. ')}</p>}
              <div className="space-y-2">
                {form.duties.map((d, i) => (
                  <input key={i} value={d} onChange={e => setDuty(i, e.target.value)} placeholder={`Duty ${i + 1}${i < 3 ? ' *' : ' (optional)'}`} className={inputCls} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Preview */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-fg">Letter Preview</h3>
            <div className="bg-bg-secondary rounded-lg p-5 font-mono text-xs text-fg-secondary whitespace-pre-wrap max-h-[400px] overflow-y-auto border border-border">
              {letterText}
            </div>
            <div className="flex gap-3">
              <button onClick={handleCopy} className="btn-primary flex items-center gap-2 text-sm">
                {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy to Clipboard</>}
              </button>
            </div>
            <p className="text-xs text-fg-muted">This generates a template for informational purposes only. It is not legal advice. Have an immigration attorney review your letter before submitting.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6 pt-4 border-t border-border">
        <button onClick={() => setStep(step - 1)} className={clsx('flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-fg-secondary hover:text-fg hover:bg-bg-secondary', step === 0 && 'opacity-0 pointer-events-none')}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        {step < 4 && (
          <button onClick={() => { if (step === 3) trackEvent('letter_generated', { profession: form.profession }); setStep(step + 1) }} disabled={!canNext()} className={clsx('flex items-center gap-2 font-medium', canNext() ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed')}>
            {step === 3 ? 'Generate Letter' : 'Next'} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
