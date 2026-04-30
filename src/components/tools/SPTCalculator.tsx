'use client';
import { useState } from 'react';
import { Scale, CheckCircle, Info } from 'lucide-react';
import clsx from 'clsx';

export default function SPTCalculator() {
  const [current, setCurrent] = useState(0);
  const [prior, setPrior] = useState(0);
  const [twoYearsAgo, setTwoYearsAgo] = useState(0);

  const total = Math.round((current + prior / 3 + twoYearsAgo / 6) * 100) / 100;
  const isResident = total >= 183 && current >= 31;
  const hasInput = current > 0 || prior > 0 || twoYearsAgo > 0;

  const inputCls = 'w-full rounded-lg border border-border bg-bg p-3 text-center text-lg font-semibold text-fg focus:outline-none focus:ring-2 ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all';

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="gradient-bg p-2.5 rounded-xl">
          <Scale className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-fg">Substantial Presence Test</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Days in current year', value: current, set: setCurrent },
          { label: 'Days in prior year', value: prior, set: setPrior },
          { label: 'Days 2 years ago', value: twoYearsAgo, set: setTwoYearsAgo },
        ].map(({ label, value, set }) => (
          <div key={label}>
            <label htmlFor={label.replace(/\s+/g, '-').toLowerCase()} className="block text-sm font-medium text-fg-secondary mb-2">{label}</label>
            <input
              id={label.replace(/\s+/g, '-').toLowerCase()}
              type="number"
              min={0}
              max={366}
              value={value || ''}
              onChange={e => set(Math.min(366, Math.max(0, +e.target.value || 0)))}
              placeholder="0"
              className={inputCls}
            />
          </div>
        ))}
      </div>

      {hasInput && (
        <div className="mt-6 space-y-4" aria-live="polite">
          <div className="rounded-lg bg-bg-secondary p-4 text-center">
            <p className="text-sm text-fg-muted mb-1">Formula</p>
            <p className="text-lg font-mono font-semibold text-fg">
              {current} + ({prior} ÷ 3) + ({twoYearsAgo} ÷ 6) = <span className="gradient-text">{total}</span>
            </p>
          </div>

          <div className={clsx(
            'rounded-xl p-5 flex items-start gap-4',
            isResident ? 'bg-[var(--success)]/10 border border-[var(--success)]/20' : 'bg-[var(--accent)]/10 border border-[var(--accent)]/20'
          )}>
            {isResident ? (
              <CheckCircle className="w-6 h-6 text-[var(--success)] shrink-0 mt-0.5" />
            ) : (
              <Info className="w-6 h-6 text-[var(--accent)] shrink-0 mt-0.5" />
            )}
            <div>
              <p className={clsx('font-semibold text-lg', isResident ? 'text-[var(--success)]' : 'text-[var(--accent)]')}>
                {isResident ? 'You ARE a U.S. tax resident' : 'You are NOT a U.S. tax resident'}
              </p>
              <p className="text-sm text-fg-secondary mt-1">
                {isResident ? 'File Form 1040 (worldwide income)' : 'File Form 1040-NR (U.S. income only)'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
