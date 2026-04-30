import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'
import professions from '@/data/professions.json'

type Profession = (typeof professions)[number]

export function generateStaticParams() {
  return professions.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = professions.find((p) => p.slug === params.slug)
  if (!p) return {}
  return {
    title: `${p.name} — TN Visa Profession Guide`,
    description: p.description,
  }
}

export default function ProfessionPage({ params }: { params: { slug: string } }) {
  const p = professions.find((pr) => pr.slug === params.slug) as Profession | undefined
  if (!p) notFound()

  const demandColors = { high: 'text-success', medium: 'text-accent', low: 'text-fg-muted' } as const
  const demandLabels = { high: 'High Demand', medium: 'Medium Demand', low: 'Low Demand' } as const

  return (
    <ContentLayout
      title={p.name}
      description={p.description}
      breadcrumbs={[{ label: 'Professions', href: '/professions' }, { label: p.name, href: `/professions/${p.slug}` }]}
      lastUpdated="April 2026"
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: `What are the requirements for ${p.name} TN visa?`, acceptedAnswer: { '@type': 'Answer', text: `${p.name} requires ${p.minEducation}. ${p.altCredentials ? `Alternative: ${p.altCredentials}.` : ''} Qualifying degrees include ${p.qualifyingDegrees.join(', ')}.` } },
        { '@type': 'Question', name: `What is the salary range for ${p.name} on TN visa?`, acceptedAnswer: { '@type': 'Answer', text: `The typical salary range is $${p.averageSalary.min.toLocaleString()}–$${p.averageSalary.max.toLocaleString()} USD per year.` } },
        { '@type': 'Question', name: `Why do ${p.name} TN visa applications get denied?`, acceptedAnswer: { '@type': 'Answer', text: p.commonDenialReasons.join('. ') + '.' } },
      ] }} />

      {p.juneUpdate && <Callout type="warning" title="June 2025 USCIS Policy Update">{p.juneUpdate}</Callout>}

      <div className="flex flex-wrap gap-3 mb-8">
        <span className="badge">{p.category}</span>
        <span className={`badge ${demandColors[p.demandLevel as keyof typeof demandColors]}`}>{demandLabels[p.demandLevel as keyof typeof demandLabels]}</span>
        <span className="badge">${p.averageSalary.min.toLocaleString()}–${p.averageSalary.max.toLocaleString()}/yr</span>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-8 mb-4">Education &amp; Credentials</h2>
      <p className="mb-2"><strong>Minimum Education:</strong> {p.minEducation}</p>
      {p.altCredentials && <p className="mb-4"><strong>Alternative Credentials:</strong> {p.altCredentials}</p>}
      <h3 className="text-lg font-semibold mt-4 mb-2">Qualifying Degrees</h3>
      <ul className="list-disc pl-6 mb-6 space-y-1">
        {p.qualifyingDegrees.map((d) => <li key={d}>{d}</li>)}
      </ul>

      {p.diplomaAlternative && <Callout type="tip" title="Diploma Alternative Available">This profession accepts a post-secondary diploma combined with 3 years of relevant experience as an alternative to a bachelor&apos;s degree.</Callout>}

      <h2 className="text-2xl font-bold text-fg mt-8 mb-4">Common Job Titles</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {p.commonTitles.map((t) => <span key={t} className="px-3 py-1.5 rounded-lg bg-bg-secondary text-sm text-fg-secondary">{t}</span>)}
      </div>

      <h2 className="text-2xl font-bold text-fg mt-8 mb-4">Common Denial Reasons</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        {p.commonDenialReasons.map((r) => <li key={r} className="text-fg-secondary">{r}</li>)}
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-8 mb-4">Employer Letter Tips</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        {p.employerLetterTips.map((t) => <li key={t} className="text-fg-secondary">{t}</li>)}
      </ul>

      {p.notes && <Callout type="info" title="Important Note">{p.notes}</Callout>}

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Next Steps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/eligibility" className="card card-interactive p-4 text-center font-medium text-accent">Check Your Eligibility</Link>
          <Link href="/apply" className="card card-interactive p-4 text-center font-medium text-accent">How to Apply</Link>
          <Link href="/fees" className="card card-interactive p-4 text-center font-medium text-accent">Fee Calculator</Link>
          <Link href="/documents" className="card card-interactive p-4 text-center font-medium text-accent">Required Documents</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
