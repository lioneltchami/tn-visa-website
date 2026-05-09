import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'TN Visa for Nurses 2026: Complete Guide for Canadian RNs',
  description: 'Everything Canadian nurses need to know about getting a TN visa in 2026. Requirements, CGFNS, state licensing, salary expectations, and step-by-step process.',
}

export default function TNVisaNurses2026() {
  return (
    <ContentLayout
      title="TN Visa for Nurses 2026: Complete Guide for Canadian RNs"
      description="Canadian nurses are in high demand in the US. Here's exactly how to get your TN visa and start working."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'TN Visa for Nurses 2026', href: '/blog/tn-visa-nurses-2026' }]}
      lastUpdated="May 2026"
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: 'TN Visa for Nurses 2026: Complete Guide for Canadian RNs', datePublished: '2026-05-09', dateModified: '2026-05-09', author: { '@type': 'Organization', name: 'TN Visa Guide' } }} />

      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&h=400&fit=crop" alt="Nurse in hospital" width={1200} height={400} className="w-full h-48 sm:h-64 object-cover" />
      </div>

      <Callout type="tip" title="High Demand in 2026">
        The US nursing shortage continues. Many hospitals offer sign-on bonuses of $10,000–$30,000 and TN visa sponsorship for Canadian RNs.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Requirements for Nurse TN Visa</h2>
      <p className="text-fg-secondary mb-4">To qualify as a Registered Nurse under TN status, you need:</p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Canadian citizenship</strong> (not just permanent residency)</li>
        <li><strong>Nursing degree</strong> from an accredited Canadian program (BScN, BN, or diploma RN)</li>
        <li><strong>Provincial RN license</strong> in good standing</li>
        <li><strong>US state nursing license</strong> for the state where you&apos;ll work</li>
        <li><strong>VisaScreen Certificate</strong> from CGFNS (required for all healthcare workers)</li>
        <li><strong>Job offer</strong> from a US employer</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The CGFNS VisaScreen Process</h2>
      <p className="text-fg-secondary mb-4">
        This is the biggest hurdle for nurses. The VisaScreen certificate verifies your education, license, and English proficiency. Here&apos;s the timeline:
      </p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">Step</th><th className="p-3 text-left font-semibold text-fg">Timeline</th><th className="p-3 text-left font-semibold text-fg">Cost</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3">Create CGFNS account & apply</td><td className="p-3">1 day</td><td className="p-3">$540</td></tr>
            <tr className="border-t border-border"><td className="p-3">Request transcripts from nursing school</td><td className="p-3">2–4 weeks</td><td className="p-3">$50–100</td></tr>
            <tr className="border-t border-border"><td className="p-3">English proficiency test (if required)</td><td className="p-3">1–2 weeks</td><td className="p-3">$200–300</td></tr>
            <tr className="border-t border-border"><td className="p-3">CGFNS review & certificate issued</td><td className="p-3">8–12 weeks</td><td className="p-3">Included</td></tr>
          </tbody>
        </table>
      </div>

      <Callout type="info" title="English Proficiency Exemption">
        Canadians educated in English are often exempt from the English test requirement. CGFNS will confirm based on your transcripts.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Getting Your US State License</h2>
      <p className="text-fg-secondary mb-4">
        You need a license in the specific state where you&apos;ll work. Most states require:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>NCLEX-RN exam</strong> — The US nursing licensure exam. You can take it in Canada at Pearson VUE centers.</li>
        <li><strong>Application to state board</strong> — Each state has different requirements and fees ($100–$400)</li>
        <li><strong>Background check</strong> — Fingerprinting required in most states</li>
      </ul>
      <p className="text-fg-secondary mb-8">
        <strong>Pro tip:</strong> Apply to a Nurse Licensure Compact (NLC) state like Texas, Arizona, or Colorado. A compact license lets you work in 40+ states.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Salary Expectations in 2026</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">Location</th><th className="p-3 text-left font-semibold text-fg">Average RN Salary</th><th className="p-3 text-left font-semibold text-fg">Notes</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3">California</td><td className="p-3">$120,000–$150,000</td><td className="p-3">Highest pay, high cost of living</td></tr>
            <tr className="border-t border-border"><td className="p-3">Texas</td><td className="p-3">$75,000–$95,000</td><td className="p-3">No state income tax</td></tr>
            <tr className="border-t border-border"><td className="p-3">New York</td><td className="p-3">$90,000–$120,000</td><td className="p-3">NYC pays premium</td></tr>
            <tr className="border-t border-border"><td className="p-3">Florida</td><td className="p-3">$65,000–$85,000</td><td className="p-3">No state income tax</td></tr>
            <tr className="border-t border-border"><td className="p-3">Midwest (OH, MI, MN)</td><td className="p-3">$65,000–$80,000</td><td className="p-3">Lower cost of living</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Step-by-Step Timeline</h2>
      <ol className="list-decimal pl-6 space-y-3 text-fg-secondary mb-8">
        <li><strong>Start CGFNS VisaScreen</strong> (3–4 months before target start date)</li>
        <li><strong>Register for NCLEX-RN</strong> and schedule exam</li>
        <li><strong>Apply for state license</strong> once NCLEX passed</li>
        <li><strong>Job search</strong> — Many hospitals recruit Canadian nurses directly</li>
        <li><strong>Get job offer letter</strong> with TN-specific language</li>
        <li><strong>Apply at border or US consulate</strong> with all documents</li>
        <li><strong>Start working!</strong></li>
      </ol>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Documents for TN Application</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>Canadian passport (valid 6+ months)</li>
        <li>VisaScreen certificate from CGFNS</li>
        <li>US state nursing license</li>
        <li>Job offer letter (see our <Link href="/employer-letter" className="text-accent hover:underline">letter template</Link>)</li>
        <li>Nursing degree/diploma</li>
        <li>Canadian nursing license</li>
        <li>$80 fee (land border) (cash or card at border)</li>
      </ul>

      <Callout type="warning" title="Common Mistake">
        Don&apos;t go to the border without your VisaScreen certificate. It&apos;s legally required for nurses and you will be denied entry without it.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Finding TN-Sponsoring Employers</h2>
      <p className="text-fg-secondary mb-4">Many US hospitals actively recruit Canadian nurses:</p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>HCA Healthcare</strong> — Largest hospital system, locations nationwide</li>
        <li><strong>Kaiser Permanente</strong> — California-focused, excellent benefits</li>
        <li><strong>Mayo Clinic</strong> — Minnesota, Arizona, Florida</li>
        <li><strong>Cleveland Clinic</strong> — Ohio and Florida</li>
        <li><strong>Travel nursing agencies</strong> — Aya Healthcare, Cross Country, AMN Healthcare</li>
      </ul>
      <p className="text-fg-secondary mb-8">
        Check our <Link href="/jobs" className="text-accent hover:underline">TN visa job board</Link> for current nursing positions.
      </p>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/professions/registered-nurse" className="card card-interactive p-4 text-center font-medium text-accent">Nurse Profession Details</Link>
          <Link href="/jobs" className="card card-interactive p-4 text-center font-medium text-accent">TN Visa Job Board</Link>
          <Link href="/employer-letter" className="card card-interactive p-4 text-center font-medium text-accent">Offer Letter Template</Link>
          <Link href="/border-interview" className="card card-interactive p-4 text-center font-medium text-accent">Border Interview Tips</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
