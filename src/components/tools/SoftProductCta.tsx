'use client'

import Link from 'next/link'

type CtaKind = 'interview' | 'letter' | 'documents'

const content: Record<CtaKind, { title: string; description: string; productLabel: string }> = {
  interview: {
    title: 'Want a structured practice pack?',
    description:
      'The Border Interview Kit organizes common questions, profession-specific preparation, and emergency scenarios in one PDF.',
    productLabel: 'See the Border Interview Kit',
  },
  letter: {
    title: 'Need a stronger starting point?',
    description:
      'Build a free first draft online, or use the template pack for profession-specific examples and a customization checklist.',
    productLabel: 'See the Letter Template Pack',
  },
  documents: {
    title: 'Prefer one organized preparation plan?',
    description:
      'The Complete Application Guide combines the document checklist, employer-letter templates, and interview preparation in one PDF.',
    productLabel: 'See the Complete Application Guide',
  },
}

export default function SoftProductCta({ kind }: { kind: CtaKind }) {
  const cta = content[kind]

  return (
    <aside className="my-10 border-y border-border bg-bg-secondary/50 px-5 py-6 sm:px-6" aria-label="Preparation resources">
      <h2 className="font-display text-xl font-bold text-fg">{cta.title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-secondary">{cta.description}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {kind === 'letter' && (
          <Link href="/letter-builder" className="btn-primary">
            Try the free Letter Builder
          </Link>
        )}
        <Link href="/products" className={kind === 'letter' ? 'btn-secondary' : 'btn-primary'}>
          {cta.productLabel}
        </Link>
      </div>
    </aside>
  )
}
