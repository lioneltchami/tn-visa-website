'use client'
import clsx from 'clsx'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle,
  GraduationCap,
  MapPin,
  Search,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import professions from '@/data/professions.json'
import { trackEvent } from '@/hooks/useAnalytics'

export default function EligibilityChecker() {
  const [step, setStep] = useState(0)
  const [citizenship, setCitizenship] = useState<'canadian' | 'mexican' | 'other' | null>(null)
  const [hasOffer, setHasOffer] = useState<boolean | null>(null)
  const [education, setEducation] = useState('')
  const [search, setSearch] = useState('')
  const [selectedProfession, setSelectedProfession] = useState('')

  const totalSteps = 4
  const showResult = step === totalSteps

  const filtered = search.trim()
    ? professions
        .filter((p) => {
          const q = search.toLowerCase()
          return (
            p.name.toLowerCase().includes(q) ||
            p.commonTitles.some((t) => t.toLowerCase().includes(q))
          )
        })
        .slice(0, 8)
    : []

  const profession = professions.find((p) => p.name === selectedProfession)

  const canNext = () => {
    if (step === 0) return citizenship !== null
    if (step === 1) return hasOffer !== null
    if (step === 2) return education !== ''
    if (step === 3) return selectedProfession !== ''
    return false
  }

  const getResult = () => {
    if (citizenship === 'other') return 'ineligible'
    if (!hasOffer) return 'need-offer'
    if (!profession) return 'no-match'
    if (education === 'High school' && !profession.diplomaAlternative) return 'education-gap'
    if (
      education === '2-year diploma' &&
      !profession.diplomaAlternative &&
      profession.minEducation.includes('Bachelor')
    )
      return 'education-gap'
    return 'eligible'
  }

  const result = showResult ? getResult() : null

  const optionCls = (selected: boolean) =>
    clsx(
      'p-4 rounded-xl border-2 font-medium transition-colors text-left flex items-center gap-3',
      selected
        ? 'border-accent bg-accent/10 text-accent'
        : 'border-border text-fg-secondary hover:border-border-hover'
    )

  return (
    <div className="card p-6 sm:p-8">
      {!showResult && (
        <>
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex-1 flex items-center gap-2">
                <div
                  className={clsx(
                    'w-8 h-8 rounded flex items-center justify-center text-sm font-bold shrink-0',
                    i < step
                      ? 'gradient-bg text-white'
                      : i === step
                        ? 'border-2 border-accent text-accent'
                        : 'border-2 border-border text-fg-muted'
                  )}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={clsx('h-0.5 flex-1 rounded', i < step ? 'bg-accent' : 'bg-border')}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="min-h-[280px]">
            {/* Step 0: Citizenship */}
            {step === 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="text-xl font-bold text-fg">What is your citizenship?</h3>
                </div>
                <p className="text-sm text-fg-muted mb-4">
                  TN visas are available to Canadian and Mexican citizens only.
                </p>
                <div className="space-y-2">
                  {[
                    {
                      value: 'canadian' as const,
                      label: 'Canadian citizen',
                      desc: 'Apply at the border — same-day approval',
                    },
                    {
                      value: 'mexican' as const,
                      label: 'Mexican citizen',
                      desc: 'Apply at a US consulate',
                    },
                    {
                      value: 'other' as const,
                      label: 'Other nationality',
                      desc: 'TN visa is not available',
                    },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setCitizenship(opt.value)}
                      className={optionCls(citizenship === opt.value)}
                    >
                      <div>
                        <p className="font-semibold">{opt.label}</p>
                        <p className="text-xs text-fg-muted font-normal">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Job Offer */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-accent" />
                  <h3 className="text-xl font-bold text-fg">
                    Do you have a job offer from a US employer?
                  </h3>
                </div>
                <p className="text-sm text-fg-muted mb-4">
                  You need a written offer from a US-based company before applying.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => setHasOffer(true)}
                    className={optionCls(hasOffer === true)}
                  >
                    <div>
                      <p className="font-semibold">Yes, I have a job offer</p>
                      <p className="text-xs text-fg-muted font-normal">
                        Written offer from a US employer
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => setHasOffer(false)}
                    className={optionCls(hasOffer === false)}
                  >
                    <div>
                      <p className="font-semibold">Not yet</p>
                      <p className="text-xs text-fg-muted font-normal">
                        Still looking or in discussions
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Education */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-accent" />
                  <h3 className="text-xl font-bold text-fg">What is your highest education?</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'High school', label: 'High School' },
                    { value: '2-year diploma', label: 'College Diploma' },
                    { value: "Bachelor's", label: "Bachelor's Degree" },
                    { value: "Master's", label: "Master's Degree" },
                    { value: 'Doctorate', label: 'Doctorate (PhD)' },
                    {
                      value: 'Professional',
                      label: 'Professional (MD, JD, etc.)',
                    },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setEducation(opt.value)}
                      className={clsx(
                        'p-3 rounded border-2 text-sm font-medium transition-colors text-left',
                        education === opt.value
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border text-fg-secondary hover:border-border-hover'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Profession Search */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-5 h-5 text-accent" />
                  <h3 className="text-xl font-bold text-fg">Find your TN profession</h3>
                </div>
                <p className="text-sm text-fg-muted">
                  Search by job title or profession name. There are 63 eligible professions.
                </p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      setSelectedProfession('')
                    }}
                    placeholder="e.g. Software Engineer, Accountant, Nurse..."
                    aria-label="Search professions"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-bg text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 ring-accent/30 focus:border-accent"
                  />
                </div>
                {filtered.length > 0 && (
                  <div className="space-y-1.5 max-h-64 overflow-y-auto">
                    {filtered.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProfession(p.name)
                          setSearch(p.name)
                        }}
                        className={clsx(
                          'w-full p-3 rounded-lg text-left transition-colors flex items-center justify-between',
                          selectedProfession === p.name
                            ? 'bg-accent/10 border border-accent'
                            : 'bg-bg-secondary hover:bg-bg-tertiary'
                        )}
                      >
                        <div>
                          <p className="font-medium text-fg text-sm">{p.name}</p>
                          <p className="text-xs text-fg-muted">
                            {p.commonTitles.slice(0, 3).join(', ')}
                          </p>
                        </div>
                        {selectedProfession === p.name && (
                          <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
                {search.trim() && filtered.length === 0 && (
                  <p className="text-sm text-fg-muted p-3 bg-bg-secondary rounded-lg">
                    No matching professions found.{' '}
                    <Link href="/professions" className="text-accent hover:underline">
                      Browse all 63 professions
                    </Link>
                  </p>
                )}
                {selectedProfession && profession && (
                  <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 text-sm">
                    <p className="font-medium text-accent">{profession.name}</p>
                    <p className="text-fg-muted text-xs mt-1">
                      Requires: {profession.minEducation}
                      {profession.altCredentials ? ` (or ${profession.altCredentials})` : ''}
                    </p>
                    {profession.juneUpdate && (
                      <p className="text-canadian text-xs mt-1">Affected by June 2025 changes</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-4 border-t border-border">
            <button
              onClick={() => setStep(step - 1)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-fg-secondary hover:text-fg hover:bg-bg-secondary',
                step === 0 && 'opacity-0 pointer-events-none'
              )}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => {
                if (step === totalSteps - 1)
                  trackEvent('eligibility_check_complete', {
                    result: citizenship === 'other' || !hasOffer ? 'not_eligible' : 'eligible',
                  })
                setStep(step + 1)
              }}
              disabled={!canNext()}
              className={clsx(
                'flex items-center gap-2 font-medium transition-colors',
                canNext() ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'
              )}
            >
              {step === totalSteps - 1 ? 'Check Eligibility' : 'Continue'}{' '}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {/* Results */}
      {showResult && (
        <div className="space-y-6" aria-live="polite">
          {result === 'eligible' && (
            <div className="rounded border border-success/30 p-6 bg-success/10 text-left">
              <CheckCircle className="w-8 h-8 text-success mb-3" />
              <p className="text-xl font-bold text-success">You&apos;re Likely Eligible!</p>
              <p className="text-sm text-fg-secondary mt-2 max-w-md">
                Based on your answers, you may qualify for TN status as{' '}
                <strong>{selectedProfession}</strong>.
                {citizenship === 'canadian'
                  ? ' As a Canadian, you can apply at the border for same-day approval.'
                  : " As a Mexican citizen, you'll apply at a US consulate."}
              </p>
            </div>
          )}
          {result === 'ineligible' && (
            <div className="rounded border border-danger/30 p-6 bg-danger/10 text-left">
              <XCircle className="w-8 h-8 text-danger mb-3" />
              <p className="text-xl font-bold text-danger">Not Eligible for TN</p>
              <p className="text-sm text-fg-secondary mt-2">
                TN visas are only available to Canadian and Mexican citizens. Consider H-1B, O-1, or
                other visa options.
              </p>
            </div>
          )}
          {result === 'need-offer' && (
            <div className="rounded border border-warning/30 p-6 bg-warning/10 text-left">
              <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-3" />
              <p className="text-xl font-bold text-warning">You Need a Job Offer First</p>
              <p className="text-sm text-fg-secondary mt-2">
                TN visa requires a written job offer from a US employer. Browse our{' '}
                <Link href="/jobs" className="text-accent hover:underline">
                  job board
                </Link>{' '}
                for TN-eligible positions.
              </p>
            </div>
          )}
          {result === 'education-gap' && (
            <div className="rounded border border-warning/30 p-6 bg-warning/10 text-left">
              <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-3" />
              <p className="text-xl font-bold text-warning">Education Gap</p>
              <p className="text-sm text-fg-secondary mt-2">
                <strong>{selectedProfession}</strong> requires {profession?.minEducation}. Your
                current education may not meet the requirement. Consider credential evaluation or
                alternative professions.
              </p>
            </div>
          )}
          {result === 'no-match' && (
            <div className="rounded border border-warning/30 p-6 bg-warning/10 text-left">
              <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-3" />
              <p className="text-xl font-bold text-warning">No Profession Selected</p>
              <p className="text-sm text-fg-secondary mt-2">
                Go back and search for your profession to get a complete assessment.
              </p>
            </div>
          )}

          {/* Next Steps */}
          {(result === 'eligible' || result === 'education-gap') && (
            <div>
              <p className="font-semibold text-fg mb-3">Your Next Steps</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link
                  href={`/professions/${profession?.slug || ''}`}
                  className="border border-border p-3 text-sm font-medium text-accent text-left rounded block hover:bg-bg-secondary"
                >
                  View {selectedProfession} Details
                </Link>
                <Link
                  href="/employer-letter"
                  className="border border-border p-3 text-sm font-medium text-accent text-left rounded block hover:bg-bg-secondary"
                >
                  Prepare Employer Letter
                </Link>
                <Link
                  href="/border-interview"
                  className="border border-border p-3 text-sm font-medium text-accent text-left rounded block hover:bg-bg-secondary"
                >
                  Border Interview Guide
                </Link>
                <Link
                  href="/fees"
                  className="border border-border p-3 text-sm font-medium text-accent text-left rounded block hover:bg-bg-secondary"
                >
                  Calculate Costs
                </Link>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              setStep(0)
              setCitizenship(null)
              setHasOffer(null)
              setEducation('')
              setSearch('')
              setSelectedProfession('')
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-fg-secondary hover:text-fg hover:bg-bg-secondary"
          >
            <ArrowLeft className="w-4 h-4" /> Start Over
          </button>
        </div>
      )}
    </div>
  )
}
