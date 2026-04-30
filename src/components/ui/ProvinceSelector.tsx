'use client'

import { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'

const PROVINCES = ['Ontario', 'British Columbia', 'Quebec', 'Alberta', 'Manitoba', 'Saskatchewan', 'Other'] as const

const RECOMMENDATIONS: Record<string, { airports: string[]; crossings: string[] }> = {
  'Ontario': { airports: ['YYZ', 'YTZ'], crossings: ['Peace Bridge', 'Rainbow Bridge'] },
  'British Columbia': { airports: ['YVR'], crossings: ['Pacific Highway'] },
  'Quebec': { airports: ['YUL'], crossings: ['Lacolle'] },
  'Alberta': { airports: ['YYC', 'YEG'], crossings: [] },
  'Manitoba': { airports: ['YWG'], crossings: ['Emerson'] },
  'Saskatchewan': { airports: ['YYC', 'YWG'], crossings: ['Emerson'] },
}

export default function ProvinceSelector() {
  const [province, setProvince] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('tn-province')
    if (saved) setProvince(saved)
  }, [])

  function handleChange(value: string) {
    setProvince(value)
    if (value) localStorage.setItem('tn-province', value)
    else localStorage.removeItem('tn-province')
  }

  const rec = province && province !== 'Other' ? RECOMMENDATIONS[province] : null

  return (
    <div className="card p-4 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-fg-secondary">
          <MapPin className="w-4 h-4 text-accent" />
          Where are you located?
        </div>
        <select
          value={province}
          onChange={e => handleChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-border bg-bg text-fg text-sm"
        >
          <option value="">Select province...</option>
          {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      {rec && (
        <p className="text-sm text-accent mt-3">
          <strong>Recommended for {province}:</strong>{' '}
          {[...rec.airports.map(a => `${a} (airport)`), ...rec.crossings.map(c => `${c} (land)`)].join(', ')}
        </p>
      )}
    </div>
  )
}
