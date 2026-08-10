import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'
import { blogArticleSchema } from '@/lib/article-schema'

export const metadata: Metadata = withCanonical('/blog/tn-visa-denied-what-to-do', {
  title: 'TN Visa Denied? What To Do Next (2026 Guide)',
  description: 'Your TN visa was denied at the border. Learn why denials happen, your options for reapplying, and how to fix common issues.',
})

export default function TNVisaDenied2026() {
  return (
    <ContentLayout
      title="TN Visa Denied? Here's What To Do Next"
      description="A denial isn't the end. Most issues can be fixed and you can reapply."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'TN Visa Denied', href: '/blog/tn-visa-denied-what-to-do' }]}
      lastUpdated="May 2026"
    >
      <JsonLd data={blogArticleSchema({ headline: 'TN Visa Denied? What To Do Next (2026 Guide)', datePublished: '2026-05-09', dateModified: '2026-05-09', path: '/blog/tn-visa-denied-what-to-do' })} />

      <Callout type="info" title="Important">
        A TN denial at the border is NOT the same as a visa ban. You can usually reapply immediately after fixing the issue.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Common Denial Reasons</h2>
      <div className="space-y-4 mb-8">
        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">1. Job doesn&apos;t match TN profession</h3>
          <p className="text-fg-secondary text-sm">Your job title or duties don&apos;t clearly fit a TN category. &quot;Project Manager&quot; or &quot;Consultant&quot; without specifics often gets denied.</p>
          <p className="text-accent text-sm mt-2"><strong>Fix:</strong> Get a revised offer letter with clearer job title and duties that match a TN profession.</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">2. Degree doesn&apos;t match profession</h3>
          <p className="text-fg-secondary text-sm">Your degree field doesn&apos;t align with the TN category. A business degree for an Engineer position, for example.</p>
          <p className="text-accent text-sm mt-2"><strong>Fix:</strong> Apply under a different TN category that matches your degree, or get a credential evaluation.</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">3. Incomplete or unclear offer letter</h3>
          <p className="text-fg-secondary text-sm">Missing required information: job duties, salary, start date, work location, or company details.</p>
          <p className="text-accent text-sm mt-2"><strong>Fix:</strong> Use our <Link href="/employer-letter" className="underline">offer letter template</Link> to ensure all required elements are included.</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">4. Immigrant intent suspected</h3>
          <p className="text-fg-secondary text-sm">You mentioned green card plans, said you want to stay permanently, or have a pending immigrant petition.</p>
          <p className="text-accent text-sm mt-2"><strong>Fix:</strong> Emphasize temporary intent. Bring evidence of ties to Canada (property, family, return plans).</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">5. Previous immigration violations</h3>
          <p className="text-fg-secondary text-sm">Past overstays, unauthorized work, or misrepresentation on previous applications.</p>
          <p className="text-accent text-sm mt-2"><strong>Fix:</strong> Consult an immigration lawyer. This may require a waiver or waiting period.</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">6. Self-employment or contractor arrangement</h3>
          <p className="text-fg-secondary text-sm">TN requires an employer-employee relationship. Independent contractors and self-employed individuals don&apos;t qualify.</p>
          <p className="text-accent text-sm mt-2"><strong>Fix:</strong> Structure the role as W-2 employment, not 1099 contracting.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What Happens After Denial</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>You return to Canada</strong> — You cannot enter the US on that trip</li>
        <li><strong>No formal record</strong> — Border denials aren&apos;t recorded the same as visa revocations</li>
        <li><strong>You can reapply immediately</strong> — There&apos;s no waiting period for most denials</li>
        <li><strong>Get the denial reason in writing</strong> — Ask the officer to document why</li>
      </ul>

      <Callout type="warning" title="Get It In Writing">
        Always ask for the specific reason for denial. This helps you fix the issue before reapplying.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Your Options After Denial</h2>

      <h3 className="text-lg font-semibold text-fg mt-6 mb-3">Option 1: Fix and Reapply at Border</h3>
      <p className="text-fg-secondary mb-4">
        If the issue is fixable (unclear offer letter, wrong job title), get corrected documents and try again. You can reapply the same day at a different port of entry, though waiting a few days is often wiser.
      </p>

      <h3 className="text-lg font-semibold text-fg mt-6 mb-3">Option 2: Apply at US Consulate</h3>
      <p className="text-fg-secondary mb-4">
        Consulate officers may give more detailed feedback and have more time to review complex cases. Schedule an appointment at a US consulate in Canada.
      </p>

      <h3 className="text-lg font-semibold text-fg mt-6 mb-3">Option 3: Employer Files I-129 with USCIS</h3>
      <p className="text-fg-secondary mb-4">
        Your employer can file Form I-129 directly with USCIS. This takes longer (3–6 months) but provides a formal adjudication. If approved, you enter with the approval notice.
      </p>

      <h3 className="text-lg font-semibold text-fg mt-6 mb-3">Option 4: Consult an Immigration Lawyer</h3>
      <p className="text-fg-secondary mb-8">
        For complex cases (previous violations, unclear profession match, immigrant intent issues), professional help is worth the cost.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">How to Strengthen Your Reapplication</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Get a detailed offer letter</strong> — More detail is better. Include specific job duties.</li>
        <li><strong>Bring supporting documents</strong> — Job descriptions, org charts, company info</li>
        <li><strong>Prepare a cover letter</strong> — Explain how you qualify and address the previous denial</li>
        <li><strong>Practice your answers</strong> — Be ready to explain your qualifications clearly</li>
        <li><strong>Try a different port of entry</strong> — Different officers may interpret things differently</li>
        <li><strong>Consider a lawyer letter</strong> — A legal opinion letter can help borderline cases</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">When to Worry</h2>
      <p className="text-fg-secondary mb-4">Most denials are fixable, but some situations are more serious:</p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Fraud finding</strong> — If the officer believes you lied, this can result in a ban</li>
        <li><strong>Multiple denials</strong> — Pattern of denials may trigger closer scrutiny</li>
        <li><strong>Expedited removal</strong> — Rare, but serious. You&apos;ll receive formal paperwork.</li>
        <li><strong>Criminal issues</strong> — May require waivers or be permanently disqualifying</li>
      </ul>

      <Callout type="tip" title="Most Denials Are Fixable">
        The vast majority of TN denials are due to documentation issues, not fundamental ineligibility. Fix the paperwork and try again.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/denied" className="card card-interactive p-4 text-center font-medium text-accent">Full Denial Guide</Link>
          <Link href="/employer-letter" className="card card-interactive p-4 text-center font-medium text-accent">Offer Letter Template</Link>
          <Link href="/eligibility" className="card card-interactive p-4 text-center font-medium text-accent">Check Eligibility</Link>
          <Link href="/border-interview" className="card card-interactive p-4 text-center font-medium text-accent">Interview Preparation</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
