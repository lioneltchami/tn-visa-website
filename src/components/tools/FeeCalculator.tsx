'use client'
import clsx from 'clsx'
import { Calculator } from 'lucide-react'
import { useState } from 'react'
import fees from '@/data/fees.json'
import { trackEvent } from '@/hooks/useAnalytics'
import { formatCAD } from '@/lib/currency'
import { premiumLabel } from '@/lib/fees'

type Method = 'poe-land' | 'poe-airport' | 'i-129'
type EmployerSize = 'large' | 'small' | 'nonprofit'
type DepMethod = 'land' | 'airport'

export default function FeeCalculator() {
  const [method, setMethod] = useState<Method>('poe-land')
  const [employerSize, setEmployerSize] = useState<EmployerSize>('large')
  const [premium, setPremium] = useState(false)
  const [dependents, setDependents] = useState(0)
  const [depMethod, setDepMethod] = useState<DepMethod>('land')

  const items: { label: string; amount: number }[] = []

  if (method === 'poe-land') {
    items.push({ label: 'POE Processing Fee', amount: fees.poe.processingFee })
    items.push({ label: 'I-94 (Land Border)', amount: fees.poe.i94LandBorder })
  } else if (method === 'poe-airport') {
    items.push({ label: 'POE Processing Fee', amount: fees.poe.processingFee })
  } else {
    const i129Totals = {
      large: fees.i129.largeFiling + fees.i129.largeAsylum,
      small: fees.i129.smallFiling + fees.i129.smallAsylum,
      nonprofit: fees.i129.nonprofitFiling + fees.i129.nonprofitAsylum,
    }
    items.push({
      label: `I-129 Filing Fee (${employerSize})`,
      amount: i129Totals[employerSize],
    })
  }
  if (premium) items.push({ label: 'Premium Processing', amount: fees.premiumProcessing })
  if (dependents > 0 && depMethod === 'land') {
    items.push({
      label: `TD Dependents (${dependents} × $${fees.other.tdLandBorder})`,
      amount: dependents * fees.other.tdLandBorder,
    })
  }

  const total = items.reduce((s, i) => s + i.amount, 0)

  const selectCls =
    'rounded-lg border border-border bg-bg p-3 w-full text-fg focus:outline-none focus:ring-2 ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-colors'

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="accent-fill p-2.5 rounded-xl">
          <Calculator className="w-5 h-5 text-accent-fg" />
        </div>
        <h2 className="text-xl font-bold text-fg">Fee Calculator</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="fee-method" className="block text-sm font-medium text-fg-secondary mb-2">
            Application Method
          </label>
          <select
            id="fee-method"
            value={method}
            onChange={(e) => {
              setMethod(e.target.value as Method)
              trackEvent('fee_calculation', { method: e.target.value })
            }}
            className={selectCls}
          >
            <option value="poe-land">POE — Land Border</option>
            <option value="poe-airport">POE — Airport</option>
            <option value="i-129">I-129 Petition</option>
          </select>
        </div>

        <div
          className={clsx(
            'transition-[max-height,opacity] duration-300 overflow-hidden',
            method === 'i-129' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <label
            htmlFor="employer-size"
            className="block text-sm font-medium text-fg-secondary mb-2"
          >
            Employer Size
          </label>
          <select
            id="employer-size"
            value={employerSize}
            onChange={(e) => setEmployerSize(e.target.value as EmployerSize)}
            className={selectCls}
          >
            <option value="large">Large (&gt;25 employees)</option>
            <option value="small">Small (≤25 employees)</option>
            <option value="nonprofit">Nonprofit</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-fg-secondary">
            Premium Processing ({premiumLabel()})
          </label>
          <button
            type="button"
            role="switch"
            aria-checked={premium}
            aria-label="Toggle premium processing"
            onClick={() => setPremium(!premium)}
            className={clsx(
              'relative w-12 h-6 rounded-full transition-colors duration-200',
              premium ? 'bg-[var(--accent)]' : 'bg-bg-tertiary'
            )}
          >
            <span
              className={clsx(
                'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
                premium && 'translate-x-6'
              )}
            />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-fg-secondary mb-2">
            Number of Dependents (TD)
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDependents(Math.max(0, dependents - 1))}
              className="w-10 h-10 rounded-lg border border-border bg-bg-secondary text-fg font-bold hover:border-border-hover transition-colors flex items-center justify-center"
              aria-label="Decrease dependents"
            >
              −
            </button>
            <span className="w-12 text-center text-lg font-semibold text-fg">{dependents}</span>
            <button
              type="button"
              onClick={() => setDependents(Math.min(10, dependents + 1))}
              className="w-10 h-10 rounded-lg border border-border bg-bg-secondary text-fg font-bold hover:border-border-hover transition-colors flex items-center justify-center"
              aria-label="Increase dependents"
            >
              +
            </button>
          </div>
        </div>

        <div
          className={clsx(
            'transition-[max-height,opacity] duration-300 overflow-hidden',
            dependents > 0 ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <label htmlFor="dep-method" className="block text-sm font-medium text-fg-secondary mb-2">
            Dependent Entry Method
          </label>
          <select
            id="dep-method"
            value={depMethod}
            onChange={(e) => setDepMethod(e.target.value as DepMethod)}
            className={selectCls}
          >
            <option value="land">Land Border ($30/person)</option>
            <option value="airport">Airport ($0)</option>
          </select>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-sm text-fg-secondary">{item.label}</span>
              <span className="text-sm font-medium text-fg">${item.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
          <span className="font-semibold text-fg">Total</span>
          <div className="text-right">
            <span className="text-2xl font-bold accent-text">${total.toLocaleString()}</span>
            <p className="text-sm text-fg-muted">{formatCAD(total)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
