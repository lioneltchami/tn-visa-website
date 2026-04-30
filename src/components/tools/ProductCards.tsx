'use client'

import { useState } from 'react'
import { FileText, MessageCircle, Package, Loader2, Check } from 'lucide-react'
import clsx from 'clsx'

const PRODUCTS = [
  {
    id: 'letter-templates',
    name: 'Employer Letter Template Pack',
    price: 29,
    icon: FileText,
    features: [
      'Templates for 10 TN professions',
      'Pre-written duty descriptions',
      'Qualification & temporary intent language',
      'Customization guide',
    ],
  },
  {
    id: 'interview-kit',
    name: 'Border Interview Kit',
    price: 49,
    icon: MessageCircle,
    popular: true,
    features: [
      '30+ CBP officer questions with answers',
      'Profession-specific question sets',
      'Body language & behavior tips',
      'Emergency scenarios guide',
      '2026 enhanced vetting prep',
    ],
  },
  {
    id: 'complete-guide',
    name: 'Complete Application Guide',
    price: 69,
    icon: Package,
    features: [
      'Everything in Interview Kit',
      'Everything in Letter Templates',
      'Step-by-step application walkthrough',
      'Document preparation checklist',
      'Post-approval guide (SSN, banking, taxes)',
      'Renewal preparation guide',
    ],
  },
]

export default function ProductCards() {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleBuy(productId: string) {
    setLoading(productId)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else throw new Error(data.error)
    } catch (err) {
      console.error(err)
      setLoading(null)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {PRODUCTS.map(p => (
        <div key={p.id} className={clsx('card p-6 flex flex-col relative', p.popular && 'border-accent border-2')}>
          {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>}
          <p.icon className="w-8 h-8 text-accent mb-3" />
          <h3 className="text-lg font-bold text-fg mb-1">{p.name}</h3>
          <p className="text-3xl font-bold gradient-text mb-4">${p.price}</p>
          <ul className="space-y-2 mb-6 flex-1">
            {p.features.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-fg-secondary">
                <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />{f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleBuy(p.id)}
            disabled={loading === p.id}
            className={clsx('w-full py-2.5 rounded-full font-medium text-sm transition-all', p.popular ? 'gradient-bg text-white' : 'border border-border hover:bg-bg-secondary text-fg')}
          >
            {loading === p.id ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : `Buy for $${p.price}`}
          </button>
        </div>
      ))}
    </div>
  )
}
