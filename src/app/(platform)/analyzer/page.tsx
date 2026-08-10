'use client'

import { useState } from 'react'
import { Search, CheckCircle, AlertTriangle, XCircle, ArrowRight } from 'lucide-react'
import professions from '@/data/professions.json'

interface Result {
  score: 'high' | 'medium' | 'low' | 'ineligible'
  matches: string[]
  requirements: string[]
  warnings: string[]
  recommendations: string[]
}

const DISQUALIFIERS = [
  /\bus\s*citizen(ship)?\s*(required|only)\b/i,
  /\bsecurity\s*clearance\s*(required|needed)\b/i,
  /\bmust\s*be\s*(a\s*)?us\s*citizen\b/i,
  /\bgreen\s*card\s*(required|holder)\b/i,
]

const DEGREE_PATTERNS = [
  /\b(bachelor'?s?|b\.?s\.?|b\.?a\.?|baccalaureate)\b/i,
  /\b(master'?s?|m\.?s\.?|m\.?a\.?|mba)\b/i,
  /\b(ph\.?d|doctorate|doctoral)\b/i,
]

function analyze(text: string): Result {
  const lower = text.toLowerCase()
  const warnings: string[] = []
  const requirements: string[] = []

  for (const pattern of DISQUALIFIERS) {
    if (pattern.test(text)) {
      return { score: 'ineligible', matches: [], requirements: [], warnings: ['Job requires U.S. citizenship or security clearance — TN visa holders are not eligible.'], recommendations: ['Look for positions that accept work authorization or visa sponsorship.'] }
    }
  }

  for (const pattern of DEGREE_PATTERNS) {
    if (pattern.test(text)) requirements.push('Degree requirement found — aligns with TN requirements')
  }

  const matches: string[] = []
  for (const p of professions) {
    const nameMatch = lower.includes(p.name.toLowerCase())
    const titleMatch = p.commonTitles?.some((t: string) => lower.includes(t.toLowerCase()))
    if (nameMatch || titleMatch) matches.push(p.name)
  }

  if (lower.includes('self-employ') || lower.includes('freelance') || lower.includes('1099'))
    warnings.push('Self-employment or contractor language detected — TN requires W-2 employment')
  if (!lower.includes('visa') && !lower.includes('sponsor') && !lower.includes('authorization'))
    warnings.push('No mention of visa sponsorship — confirm with employer they will provide TN support letter')
  if (lower.includes('engineer') && !lower.includes('engineering degree'))
    warnings.push('Engineer category narrowed in June 2025 — must have engineering degree, not just CS')

  const recommendations: string[] = []
  if (matches.length > 0) recommendations.push(`Your best TN category: ${matches[0]}`)
  if (requirements.length === 0) recommendations.push('Ensure you can document your degree credentials')
  recommendations.push('Request a detailed employer support letter matching TN profession duties')

  const score = matches.length > 0 && requirements.length > 0 ? 'high' : matches.length > 0 ? 'medium' : 'low'

  return { score, matches, requirements, warnings, recommendations }
}

const SCORE_CONFIG = {
  high: { label: 'High Fit', color: 'text-success', bg: 'bg-green-50 dark:bg-green-950/20 border-success', icon: CheckCircle },
  medium: { label: 'Medium Fit', color: 'text-warning', bg: 'bg-amber-50 dark:bg-amber-950/20 border-warning', icon: AlertTriangle },
  low: { label: 'Low Fit', color: 'text-fg-muted', bg: 'bg-bg-secondary border-border', icon: AlertTriangle },
  ineligible: { label: 'Not Eligible', color: 'text-danger', bg: 'bg-red-50 dark:bg-red-950/20 border-danger', icon: XCircle },
}

export default function AnalyzerPage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  const handleAnalyze = () => { if (text.trim().length > 20) setResult(analyze(text)) }

  return (
    <div className="section-padding">
      <div className="container-tight">
        <h1 className="gradient-text text-3xl sm:text-4xl font-bold mb-2">Job Posting Analyzer</h1>
        <p className="text-fg-secondary mb-8">Paste a job posting to check TN visa eligibility and profession fit.</p>

        <div className="card p-6 mb-6">
          <textarea value={text} onChange={e => setText(e.target.value)} rows={10} placeholder="Paste the full job posting here..."
            className="w-full rounded-lg border border-border bg-bg p-4 text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent/30 resize-y" />
          <button onClick={handleAnalyze} disabled={text.trim().length < 20}
            className="mt-4 flex items-center gap-2 px-6 py-3 rounded bg-accent text-accent-fg font-medium hover:opacity-90 transition-opacity disabled:opacity-40">
            <Search size={18} /> Analyze Job Posting
          </button>
        </div>

        {result && (() => {
          const cfg = SCORE_CONFIG[result.score]
          const Icon = cfg.icon
          return (
            <div className="space-y-4">
              <div className={`card border-l-4 p-6 ${cfg.bg}`}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-6 h-6 ${cfg.color}`} />
                  <span className={`text-xl font-bold ${cfg.color}`}>{cfg.label}</span>
                </div>
                {result.matches.length > 0 && (
                  <p className="text-fg-secondary">Matching TN professions: {result.matches.map(m => (
                    <span key={m} className="badge ml-1">{m}</span>
                  ))}</p>
                )}
              </div>

              {result.requirements.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-fg mb-2">Requirements Found</h3>
                  <ul className="space-y-1">{result.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-fg-secondary">
                      <CheckCircle size={14} className="text-success mt-0.5 shrink-0" />{r}
                    </li>
                  ))}</ul>
                </div>
              )}

              {result.warnings.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-fg mb-2">Warnings</h3>
                  <ul className="space-y-1">{result.warnings.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-fg-secondary">
                      <AlertTriangle size={14} className="text-warning mt-0.5 shrink-0" />{w}
                    </li>
                  ))}</ul>
                </div>
              )}

              <div className="card p-5">
                <h3 className="font-semibold text-fg mb-2">Recommendations</h3>
                <ul className="space-y-1">{result.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-fg-secondary">
                    <ArrowRight size={14} className="text-accent mt-0.5 shrink-0" />{r}
                  </li>
                ))}</ul>
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}
