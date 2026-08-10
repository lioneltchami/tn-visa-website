import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import ContentLayout from '@/components/layout/ContentLayout'
import FaqAccordion from '@/components/ui/FaqAccordion'
import FeeSourceLinks from '@/components/ui/FeeSourceLinks'
import { fees, i129TotalRangeLabel, poeLandTotalLabel, premiumLabel, usd } from '@/lib/fees'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/faq', {
  title: 'TN Visa FAQ — Frequently Asked Questions',
  description:
    'Answers to the most common TN visa questions: eligibility, application process, costs, renewal, green card path, taxes, and dependents.',
})

const faqs = [
  {
    q: 'Who is eligible for a TN visa?',
    a: 'Canadian and Mexican citizens who have a job offer from a U.S. employer in one of the 63 USMCA-listed professions and meet the education or credential requirements for that profession.',
  },
  {
    q: 'Do I need a degree for a TN visa?',
    a: "Most TN professions require at least a bachelor's degree. However, 10 professions accept a post-secondary diploma combined with 3 years of relevant experience as an alternative.",
  },
  {
    q: 'Can I get a TN visa with a Computer Science degree?',
    a: 'Not under the Engineer category since June 2025. USCIS now requires an engineering degree for Engineers. CS graduates should apply under Computer Systems Analyst instead, provided their duties involve systems analysis rather than pure programming.',
  },
  {
    q: 'How many professions qualify for TN status?',
    a: 'There are 63 designated occupations eligible for TN status under USMCA Chapter 16, Appendix 2. The list has not changed since the original NAFTA agreement.',
  },
  {
    q: 'Can I be self-employed on a TN visa?',
    a: 'No. USCIS formally banned self-employment on TN visas in June 2025. You must work for a bona fide U.S. employer. Alternatives for entrepreneurs include E-1, E-2, O-1, and L-1 visas.',
  },
  {
    q: 'How do I apply for a TN visa?',
    a: 'Canadians can apply at any U.S. port of entry or Canadian airport preclearance facility for same-day approval. Alternatively, your employer can file Form I-129 with USCIS by mail.',
  },
  {
    q: 'How long does TN visa processing take?',
    a: `At the border: same day (15 minutes to 2 hours). I-129 with USCIS: 3-5 months standard, or 15 business days with premium processing (${premiumLabel()}).`,
  },
  {
    q: 'How much does a TN visa cost?',
    a: `At the border: ${poeLandTotalLabel()} (${usd(fees.poe.processingFee)} processing + ${usd(fees.poe.i94LandBorder)} I-94 fee at land borders). I-129 petition: ${i129TotalRangeLabel()} depending on employer size, plus optional ${premiumLabel()} for premium processing.`,
  },
  {
    q: 'Can I apply during the government shutdown?',
    a: 'Yes. TN visa applications at the border continue during the DHS shutdown — CBP treats inspections as essential. USCIS also remains open for fee-funded filings like I-129.',
  },
  {
    q: 'What documents do I need?',
    a: 'Valid Canadian passport, employer support letter, degree/diploma, transcripts, professional license (if applicable), resume, and previous TN approval notices if renewing.',
  },
  {
    q: 'How long is a TN visa valid?',
    a: 'Up to 3 years per admission. The exact duration is set by the CBP officer or USCIS and noted on your I-94.',
  },
  {
    q: 'Can I renew my TN visa indefinitely?',
    a: 'Yes. There is no limit on the number of renewals. You can renew in 3-year increments indefinitely, as long as you continue to meet the requirements and maintain temporary intent.',
  },
  {
    q: 'Can I change employers on a TN visa?',
    a: 'Yes, but you need a new TN application. Your new employer must provide a support letter, and you must apply at the border or file a new I-129 before starting work with the new employer.',
  },
  {
    q: 'Can I work remotely from Canada on a TN visa?',
    a: 'No. TN status requires you to work for a U.S. employer in the United States. Working remotely from Canada creates tax and immigration complications and is not authorized under TN status.',
  },
  {
    q: 'Can I get a green card while on a TN visa?',
    a: 'Yes, but it requires careful planning. TN does not support dual intent, so filing for a green card can jeopardize your TN status. Common paths include EB-2 NIW (self-petition), employer-sponsored PERM, or switching to H-1B first.',
  },
  {
    q: 'What is the 90-day rule?',
    a: 'USCIS presumes that actions taken within 90 days of entry are preconceived. If you file for a green card within 90 days of entering on TN status, USCIS may conclude you had immigrant intent when you entered, which violates TN requirements.',
  },
  {
    q: 'Should I switch to H-1B before pursuing a green card?',
    a: "It's a common strategy. H-1B allows dual intent (you can openly pursue a green card), while TN does not. The downside: H-1B requires winning the lottery (35.3% selection rate for FY2026) and has a 6-year maximum stay.",
  },
  {
    q: 'Do I pay US taxes on a TN visa?',
    a: "Yes, if you meet the Substantial Presence Test (generally after your first full calendar year in the US). You'll file Form 1040 and report worldwide income. Use the SPT calculator on our taxes page.",
  },
  {
    q: 'Do I still file Canadian taxes?',
    a: 'It depends on your Canadian residency status. If you maintain significant ties to Canada (property, spouse, bank accounts), CRA may still consider you a Canadian tax resident. Consult a cross-border tax specialist.',
  },
  {
    q: 'Can my spouse work in the US?',
    a: 'No. Spouses and children of TN holders receive TD (Trade Dependent) status, which does not include work authorization. TD holders can study but cannot be employed.',
  },
]

const sections = [
  {
    title: 'Eligibility',
    items: faqs.slice(0, 5).map((f) => ({ question: f.q, answer: f.a })),
  },
  {
    title: 'Application',
    items: faqs.slice(5, 10).map((f) => ({ question: f.q, answer: f.a })),
  },
  {
    title: 'Status & Renewal',
    items: faqs.slice(10, 14).map((f) => ({ question: f.q, answer: f.a })),
  },
  {
    title: 'Green Card & Dual Intent',
    items: faqs.slice(14, 17).map((f) => ({ question: f.q, answer: f.a })),
  },
  {
    title: 'Taxes & Living',
    items: faqs.slice(17).map((f) => ({ question: f.q, answer: f.a })),
  },
]

export default function FaqPage() {
  return (
    <ContentLayout
      title="TN Visa FAQ"
      description="Answers to the most frequently asked questions about TN visa eligibility, application, renewal, green cards, taxes, and more."
      breadcrumbs={[{ label: 'FAQ', href: '/faq' }]}
      lastUpdated="April 2026"
    >
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />

      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=400&fit=crop"
          alt="Finding answers"
          width={1200}
          height={400}
          className="w-full h-48 sm:h-64 object-cover"
        />
      </div>

      <FaqAccordion sections={sections} />

      <FeeSourceLinks ids={['uscis-fees', 'uscis-premium', 'cbp-i94', 'uscis-policy-manual']} />

      <p className="text-fg-secondary mt-10">
        Can&apos;t find your answer? Check our detailed guides:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <Link
          href="/eligibility"
          className="card card-interactive p-4 text-center font-medium text-accent"
        >
          Eligibility Checker
        </Link>
        <Link
          href="/professions"
          className="card card-interactive p-4 text-center font-medium text-accent"
        >
          63 TN Professions
        </Link>
        <Link
          href="/apply"
          className="card card-interactive p-4 text-center font-medium text-accent"
        >
          How to Apply
        </Link>
        <Link
          href="/fees"
          className="card card-interactive p-4 text-center font-medium text-accent"
        >
          Fee Calculator
        </Link>
        <Link
          href="/taxes"
          className="card card-interactive p-4 text-center font-medium text-accent"
        >
          Tax Guide
        </Link>
        <Link
          href="/green-card"
          className="card card-interactive p-4 text-center font-medium text-accent"
        >
          Green Card Pathways
        </Link>
      </div>
    </ContentLayout>
  )
}
