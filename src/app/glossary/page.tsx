import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import JsonLd from '@/components/JsonLd'
import glossary from '@/data/glossary.json'

export const metadata: Metadata = {
  title: 'TN Visa Glossary — Immigration Terms Explained',
  description: 'Definitions of key immigration terms: USMCA, TN, TD, CBP, USCIS, I-94, I-129, RFE, PERM, dual intent, and more.',
}

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term))
  return (
    <ContentLayout
      title="TN Visa Glossary"
      description="Key immigration terms and acronyms explained in plain language."
      breadcrumbs={[{ label: 'Glossary', href: '/glossary' }]}
      lastUpdated="April 2026"
    >
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: 'TN Visa Immigration Glossary',
        hasDefinedTerm: sorted.map(t => ({ '@type': 'DefinedTerm', name: t.term, description: t.definition })),
      }} />
      <div className="space-y-4">
        {sorted.map(t => (
          <div key={t.term} id={t.term.toLowerCase().replace(/[\s/]+/g, '-')} className="card p-5">
            <h2 className="font-bold text-fg text-lg">{t.term}</h2>
            <p className="text-fg-secondary text-sm mt-1">{t.definition}</p>
            {t.relatedPages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {t.relatedPages.map(p => <Link key={p} href={p} className="text-xs text-accent hover:underline">{p}</Link>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </ContentLayout>
  )
}
