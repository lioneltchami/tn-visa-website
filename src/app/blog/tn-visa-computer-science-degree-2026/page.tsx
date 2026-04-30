import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Can You Get a TN Visa with a Computer Science Degree in 2026?',
  description: 'Since June 2025, CS degrees no longer qualify for the Engineer TN category. Here are your options: Computer Systems Analyst, Mathematician, and more.',
}

export default function CSDegreeBlogPost() {
  return (
    <ContentLayout
      title="Can You Get a TN Visa with a Computer Science Degree in 2026?"
      description="The June 2025 USCIS policy change disqualified CS degrees from the Engineer category. Here's what you need to know."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'CS Degree & TN Visa', href: '/blog/tn-visa-computer-science-degree-2026' }]}
      lastUpdated="April 2026"
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: 'Can You Get a TN Visa with a Computer Science Degree in 2026?', datePublished: '2026-04-28', dateModified: '2026-04-28', author: { '@type': 'Organization', name: 'TN Visa Guide' } }} />

      <Callout type="danger" title="Key Change: CS ≠ Engineering">
        As of June 2025, USCIS no longer accepts Computer Science degrees for the Engineer TN category. This affects thousands of Canadian tech workers.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What Changed</h2>
      <p className="text-fg-secondary mb-4">
        For over 20 years, Canadian software developers with Computer Science degrees routinely obtained TN visas under the <strong>Engineer</strong> category with the job title &quot;Software Engineer.&quot; It almost always worked.
      </p>
      <p className="text-fg-secondary mb-4">
        In June 2025, USCIS issued a policy memo explicitly stating that <strong>Computer Science is not an engineering discipline</strong>. The Engineer category now requires credentials in a recognized engineering field — Mechanical, Civil, Electrical, Chemical, etc. — or a PE/P.Eng license.
      </p>
      <p className="text-fg-secondary mb-8">
        This means if your degree says &quot;Bachelor of Science in Computer Science&quot; (not &quot;Computer Engineering&quot; or &quot;Software Engineering&quot;), you can no longer use the Engineer category.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Your Options</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">Option 1: Computer Systems Analyst (Best Alternative)</h3>
      <p className="text-fg-secondary mb-4">
        This is the primary alternative for CS graduates. The <Link href="/professions/computer-systems-analyst" className="text-accent hover:underline">Computer Systems Analyst</Link> category covers professionals who design and implement computer systems to meet business needs.
      </p>
      <p className="text-fg-secondary mb-4"><strong>Key requirements:</strong></p>
      <ul className="list-disc pl-6 space-y-1 text-fg-secondary mb-4">
        <li>Your job duties must involve <strong>systems analysis and design</strong>, not pure programming</li>
        <li>You must evaluate business requirements and design technology solutions</li>
        <li>Pure coding or software development roles may not qualify</li>
        <li>CS degrees are accepted for this category</li>
      </ul>
      <Callout type="warning" title="CSA Is Not a Free Pass">
        USCIS is scrutinizing CSA applications more closely since June 2025. Your employer letter must clearly describe systems analysis duties — not just programming. See our <Link href="/employer-letter" className="text-accent hover:underline font-medium">letter guide</Link>.
      </Callout>

      <h3 className="text-xl font-semibold mt-8 mb-3">Option 2: Mathematician/Statistician</h3>
      <p className="text-fg-secondary mb-4">
        If your role involves data science, machine learning, or statistical analysis, the <Link href="/professions/mathematician" className="text-accent hover:underline">Mathematician</Link> category (which includes Statistician) may work. CS degrees with a strong math component can qualify.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Option 3: Get an Engineering Degree or License</h3>
      <p className="text-fg-secondary mb-8">
        If you specifically need the Engineer category, you&apos;d need either a degree in a recognized engineering discipline or a PE/P.Eng license. Some Canadian provinces offer P.Eng to CS graduates with sufficient engineering coursework and experience.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Canadian CS Programmes and TN Eligibility</h2>
      <p className="text-fg-secondary mb-4">Here&apos;s how degrees from top Canadian universities map to TN categories:</p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse border border-border">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Programme</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Engineer?</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">CSA?</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-border px-4 py-2 text-fg-secondary">UofT — B.Sc. Computer Science</td><td className="border border-border px-4 py-2 text-danger font-medium">No</td><td className="border border-border px-4 py-2 text-success font-medium">Yes</td></tr>
            <tr><td className="border border-border px-4 py-2 text-fg-secondary">Waterloo — B.CS Computer Science</td><td className="border border-border px-4 py-2 text-danger font-medium">No</td><td className="border border-border px-4 py-2 text-success font-medium">Yes</td></tr>
            <tr><td className="border border-border px-4 py-2 text-fg-secondary">UBC — B.Sc. Computer Science</td><td className="border border-border px-4 py-2 text-danger font-medium">No</td><td className="border border-border px-4 py-2 text-success font-medium">Yes</td></tr>
            <tr><td className="border border-border px-4 py-2 text-fg-secondary">McGill — B.Sc. Computer Science</td><td className="border border-border px-4 py-2 text-danger font-medium">No</td><td className="border border-border px-4 py-2 text-success font-medium">Yes</td></tr>
            <tr><td className="border border-border px-4 py-2 text-fg-secondary">Waterloo — B.SE Software Engineering</td><td className="border border-border px-4 py-2 text-warning font-medium">Maybe*</td><td className="border border-border px-4 py-2 text-success font-medium">Yes</td></tr>
            <tr><td className="border border-border px-4 py-2 text-fg-secondary">UofT — B.A.Sc. Engineering Science</td><td className="border border-border px-4 py-2 text-success font-medium">Yes</td><td className="border border-border px-4 py-2 text-success font-medium">Yes</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-fg-muted mb-8">*Waterloo Software Engineering is CEAB-accredited and may qualify for Engineer, but USCIS adjudicators are inconsistent. Having a P.Eng strengthens the case.</p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What About &quot;Software Engineering&quot; Degrees?</h2>
      <p className="text-fg-secondary mb-8">
        This is a gray area. If your degree is specifically in &quot;Software Engineering&quot; (not &quot;Computer Science&quot;) from an ABET-accredited or CEAB-accredited program, it <strong>may</strong> still qualify under Engineer. However, USCIS adjudicators are inconsistent on this. Having a P.Eng or PE license strengthens your case significantly.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What to Do Right Now</h2>
      <ol className="list-decimal pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Check your eligibility</strong> under <Link href="/professions/computer-systems-analyst" className="text-accent hover:underline">Computer Systems Analyst</Link> — this is the most common path</li>
        <li><strong>Review your job duties</strong> — ensure they emphasize systems analysis, not just coding</li>
        <li><strong>Update your employer letter</strong> — use our <Link href="/letter-builder" className="text-accent hover:underline">letter builder</Link> to generate a CSA-specific template</li>
        <li><strong>Consult an immigration lawyer</strong> if your case is complex or you&apos;ve been denied</li>
        <li><strong>Consider the long term</strong> — if you want stability, explore <Link href="/green-card" className="text-accent hover:underline">green card pathways</Link></li>
      </ol>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/professions/engineer" className="card card-interactive p-4 text-center font-medium text-accent">Engineer Requirements</Link>
          <Link href="/professions/computer-systems-analyst" className="card card-interactive p-4 text-center font-medium text-accent">CSA Requirements</Link>
          <Link href="/eligibility" className="card card-interactive p-4 text-center font-medium text-accent">Eligibility Checker</Link>
          <Link href="/employer-letter" className="card card-interactive p-4 text-center font-medium text-accent">Employer Letter Guide</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
