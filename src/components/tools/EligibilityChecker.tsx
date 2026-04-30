'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';
import professions from '@/data/professions.json';
import { trackEvent } from '@/hooks/useAnalytics';

const educationLevels = ['High school', '2-year diploma', "Bachelor's", "Master's", 'Doctorate', 'Professional degree'];

export default function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ canadian: null as boolean | null, jobOffer: null as boolean | null, education: '', field: '', title: '' });

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;
  const showResult = step === totalSteps;

  const canNext = () => {
    if (step === 0) return answers.canadian !== null;
    if (step === 1) return answers.jobOffer !== null;
    if (step === 2) return answers.education !== '';
    if (step === 3) return answers.field.trim() !== '';
    if (step === 4) return answers.title.trim() !== '';
    return false;
  };

  const matchingProfessions = professions.filter(p => {
    const q = (answers.field + ' ' + answers.title).toLowerCase();
    return p.name.toLowerCase().includes(q) ||
      p.commonTitles.some(t => t.toLowerCase().includes(answers.title.toLowerCase())) ||
      p.commonTitles.some(t => t.toLowerCase().includes(answers.field.toLowerCase()));
  });

  const isDiploma = answers.education === '2-year diploma';
  const diplomaProfessions = matchingProfessions.filter(p => p.diplomaAlternative);

  const notEligible = answers.canadian === false || answers.jobOffer === false;

  return (
    <div className="card p-6 sm:p-8">
      {!showResult && (
        <>
          <div className="mb-6">
            <div className="h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full gradient-bg rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className={clsx('w-2 h-2 rounded-full transition-colors', i <= step ? 'bg-[var(--accent)]' : 'bg-[var(--bg-tertiary)]')} />
              ))}
            </div>
          </div>

          <div className="min-h-[200px]">
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--fg)]">Are you a Canadian citizen?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[true, false].map(val => (
                    <button key={String(val)} onClick={() => setAnswers({ ...answers, canadian: val })}
                      className={clsx('p-4 rounded-xl border-2 font-medium transition-all text-center',
                        answers.canadian === val ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[var(--border)] text-[var(--fg-secondary)] hover:border-[var(--border-hover)]'
                      )}>{val ? 'Yes' : 'No'}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--fg)]">Do you have a job offer from a U.S. employer?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[true, false].map(val => (
                    <button key={String(val)} onClick={() => setAnswers({ ...answers, jobOffer: val })}
                      className={clsx('p-4 rounded-xl border-2 font-medium transition-all text-center',
                        answers.jobOffer === val ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[var(--border)] text-[var(--fg-secondary)] hover:border-[var(--border-hover)]'
                      )}>{val ? 'Yes' : 'No'}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--fg)]">What is your highest education level?</h3>
                <div className="grid gap-2">
                  {educationLevels.map(level => (
                    <button key={level} onClick={() => setAnswers({ ...answers, education: level })}
                      className={clsx('p-3 rounded-xl border-2 font-medium transition-all text-left',
                        answers.education === level ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[var(--border)] text-[var(--fg-secondary)] hover:border-[var(--border-hover)]'
                      )}>{level}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--fg)]">What field is your degree in?</h3>
                <input type="text" value={answers.field} onChange={e => setAnswers({ ...answers, field: e.target.value })}
                  aria-label="Degree field"
                  placeholder="e.g. Computer Science, Engineering, Accounting..."
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 text-lg text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:ring-2 ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all" />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--fg)]">What job title are you being offered?</h3>
                <input type="text" value={answers.title} onChange={e => setAnswers({ ...answers, title: e.target.value })}
                  aria-label="Job title"
                  placeholder="e.g. Software Engineer, Accountant, Graphic Designer..."
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 text-lg text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:ring-2 ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all" />
              </div>
            )}
          </div>

          <div className="flex justify-between mt-6 pt-4 border-t border-[var(--border)]">
            <button onClick={() => setStep(step - 1)} disabled={step === 0}
              className={clsx('flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all', step === 0 ? 'opacity-0 pointer-events-none' : 'text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)]')}>
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => { if (step === totalSteps - 1) trackEvent('eligibility_check_complete', { result: answers.canadian === false || answers.jobOffer === false ? 'not_eligible' : 'eligible' }); setStep(step + 1) }} disabled={!canNext()}
              className={clsx('flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all', canNext() ? 'gradient-bg text-white hover:scale-105' : 'bg-[var(--bg-tertiary)] text-[var(--fg-muted)] cursor-not-allowed')}>
              {step === totalSteps - 1 ? 'See Results' : 'Next'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {showResult && (
        <div className="space-y-4" aria-live="polite">
          {notEligible ? (
            <div className="rounded-xl p-6 bg-[var(--danger)]/10 border border-[var(--danger)]/20 flex items-start gap-4">
              <XCircle className="w-7 h-7 text-[var(--danger)] shrink-0" />
              <div>
                <p className="text-lg font-semibold text-[var(--danger)]">Not Eligible</p>
                <p className="text-sm text-[var(--fg-secondary)] mt-1">
                  {answers.canadian === false ? 'TN visa is only available to Canadian and Mexican citizens.' : 'A job offer from a U.S. employer is required for TN visa status.'}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="rounded-xl p-6 bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-start gap-4">
                <CheckCircle className="w-7 h-7 text-[var(--success)] shrink-0" />
                <div>
                  <p className="text-lg font-semibold text-[var(--success)]">Potentially Eligible!</p>
                  <p className="text-sm text-[var(--fg-secondary)] mt-1">Based on your answers, you may qualify for TN visa status.</p>
                </div>
              </div>
              {matchingProfessions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[var(--fg-secondary)]">Matching TN professions:</p>
                  {matchingProfessions.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-secondary)]">
                      <span className="font-medium text-[var(--fg)]">{p.name}</span>
                      <span className="badge">{p.minEducation}</span>
                    </div>
                  ))}
                </div>
              )}
              {isDiploma && diplomaProfessions.length > 0 && (
                <div className="rounded-xl p-4 bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                  <p className="text-sm font-medium text-[var(--accent)]">These professions accept a diploma + 3 years experience:</p>
                  <p className="text-sm text-[var(--fg-secondary)] mt-1">{diplomaProfessions.map(p => p.name).join(', ')}</p>
                </div>
              )}
            </>
          )}
          <button onClick={() => { setStep(0); setAnswers({ canadian: null, jobOffer: null, education: '', field: '', title: '' }); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all">
            <ArrowLeft className="w-4 h-4" /> Start Over
          </button>
        </div>
      )}
    </div>
  );
}

