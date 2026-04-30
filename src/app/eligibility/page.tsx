import ContentLayout from '@/components/layout/ContentLayout'
import JsonLd from '@/components/JsonLd'
import { Callout } from '@/components/ui/Callout'
import EligibilityChecker from '@/components/tools/EligibilityChecker'
import Link from 'next/link'
import Image from 'next/image'

export default function EligibilityPage() {
  return (
    <ContentLayout
      title="Am I Eligible for a TN Visa?"
      description="Check if you qualify for TN status as a Canadian citizen."
      breadcrumbs={[{label:'Eligibility', href:'/eligibility'}]}
      lastUpdated="April 2026"
    >
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Who is eligible for a TN visa?", "acceptedAnswer": { "@type": "Answer", "text": "Canadian citizens with a job offer from a U.S. employer in one of the 63 USMCA-listed professions who meet the education/credential requirements." } },
          { "@type": "Question", "name": "Do I need a degree for a TN visa?", "acceptedAnswer": { "@type": "Answer", "text": "Most TN professions require a bachelor's degree or higher. Some accept alternative credentials like professional licenses or post-secondary diplomas with experience." } },
          { "@type": "Question", "name": "How many professions qualify for TN status?", "acceptedAnswer": { "@type": "Answer", "text": "There are 63 designated occupations eligible for TN status under USMCA Chapter 16, Appendix 2." } }
        ]
      }} />

      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=400&fit=crop" alt="Checking eligibility requirements" width={1200} height={400} className="w-full h-48 sm:h-64 object-cover" />
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Core Requirements</h2>
      <ul className="list-disc pl-6 space-y-2 mb-8">
        <li>You are a Canadian citizen</li>
        <li>You have a job offer from a U.S. employer</li>
        <li>Your profession is on the USMCA list</li>
        <li>You meet the education/credential requirements for your profession</li>
        <li>The employment is temporary in nature</li>
      </ul>

      <EligibilityChecker />

      <Callout type="warning" title="June 2025 Changes">
        June 2025 changes narrowed several professions. Some previously qualifying roles may no longer be eligible under the updated USMCA guidelines.
      </Callout>

      <p className="mt-6">
        <Link href="/professions" className="text-accent hover:underline">View the full list of eligible professions →</Link>
        <div className="flex flex-wrap gap-3 mt-3">
          <Link href="/professions/engineer" className="badge hover:bg-bg-tertiary">Engineer</Link>
          <Link href="/professions/computer-systems-analyst" className="badge hover:bg-bg-tertiary">Computer Systems Analyst</Link>
          <Link href="/professions/management-consultant" className="badge hover:bg-bg-tertiary">Management Consultant</Link>
          <Link href="/professions/accountant" className="badge hover:bg-bg-tertiary">Accountant</Link>
        </div>
      </p>
    </ContentLayout>
  )
}
