import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import { StepList } from '@/components/ui/StepList'
import fees from '@/data/fees.json'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/employer-guide', {
  title: 'TN Visa Sponsorship Guide for Employers',
  description:
    'Step-by-step guide for US employers sponsoring Canadian professionals on TN visas. Support letter requirements, fees, timelines, and compliance.',
})

export default function EmployerGuidePage() {
  return (
    <ContentLayout
      title="TN Visa Sponsorship Guide for Employers"
      description="Everything your HR department needs to know about hiring Canadian professionals on TN visas."
      breadcrumbs={[{ label: 'Employer Guide', href: '/employer-guide' }]}
      lastUpdated="April 2026"
    >
      <Callout type="info" title="Good News for Employers">
        TN visas have no annual cap, no lottery, and can be approved same-day at the border.
        It&apos;s one of the fastest and cheapest ways to hire international talent.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The Process at a Glance</h2>
      <StepList
        steps={[
          {
            title: 'Confirm the role qualifies',
            description:
              'The position must fall under one of the 63 USMCA professions. Check the full list at /professions.',
          },
          {
            title: 'Write the employer support letter',
            description:
              'This is the most critical document. It must detail the job duties, qualifications, and temporary nature of the position.',
          },
          {
            title: 'Candidate applies at the border',
            description:
              'For Canadians: they present the letter and credentials at a US port of entry or airport preclearance. Approval is typically same-day.',
          },
          {
            title: 'Alternative: File I-129 with USCIS',
            description:
              'For complex cases or risk-averse applicants, you can file Form I-129 by mail. Takes 3-5 months (15 days with premium processing).',
          },
          {
            title: 'Candidate starts work',
            description:
              'Once approved, the candidate receives an I-94 authorizing work for up to 3 years. Renewable indefinitely.',
          },
        ]}
      />

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Your Responsibilities as Employer</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>
          <strong>Write the support letter</strong> — this is the employer&apos;s primary
          obligation. See our{' '}
          <Link href="/employer-letter" className="text-accent hover:underline">
            detailed letter guide
          </Link>
          .
        </li>
        <li>
          <strong>Ensure the role matches a TN profession</strong> — the job title and duties must
          align with a{' '}
          <Link href="/professions" className="text-accent hover:underline">
            USMCA profession
          </Link>
          .
        </li>
        <li>
          <strong>Pay filing fees</strong> (if using I-129) — the employer typically pays the
          petition fees.
        </li>
        <li>
          <strong>Maintain records</strong> — keep copies of the support letter, I-94, and approval
          notices.
        </li>
        <li>
          <strong>File a new petition for changes</strong> — if the employee changes roles,
          locations, or if you&apos;re a new employer, a new TN application is required.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Costs</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse border border-border">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="border border-border px-4 py-3 text-left font-semibold text-fg">
                Method
              </th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-fg">
                Cost to Employer
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-fg-secondary">
                Port of Entry (candidate pays)
              </td>
              <td className="border border-border px-4 py-3 text-fg-secondary">
                ${fees.poe.processingFee + fees.poe.i94LandBorder} (land) or $
                {fees.poe.processingFee} (airport)
              </td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-fg-secondary">
                I-129 (large employer, 26+ FTE)
              </td>
              <td className="border border-border px-4 py-3 text-fg-secondary">
                ${(fees.i129.largeFiling + fees.i129.largeAsylum).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-fg-secondary">
                I-129 (small employer, ≤25 FTE)
              </td>
              <td className="border border-border px-4 py-3 text-fg-secondary">
                ${(fees.i129.smallFiling + fees.i129.smallAsylum).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-fg-secondary">
                Premium processing (optional)
              </td>
              <td className="border border-border px-4 py-3 text-fg-secondary">
                +${fees.premiumProcessing.toLocaleString()} (15 business day guarantee)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-fg-muted mb-8">
        See the full{' '}
        <Link href="/fees" className="text-accent hover:underline">
          fee breakdown
        </Link>{' '}
        for details.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The Support Letter</h2>
      <p className="text-fg-secondary mb-4">
        The employer support letter is the single most important document. A weak letter is the #1
        reason for TN visa denials. Your letter must include:
      </p>
      <ul className="list-disc pl-6 space-y-1 text-fg-secondary mb-4">
        <li>Company letterhead with full contact information</li>
        <li>The exact USMCA profession name</li>
        <li>5-7 detailed job duties tied to the profession</li>
        <li>Candidate&apos;s qualifications and how they meet requirements</li>
        <li>Employment terms: start date, end date, salary, location</li>
        <li>Temporary nature statement</li>
      </ul>
      <p className="text-fg-secondary mb-8">
        Read our{' '}
        <Link href="/employer-letter" className="text-accent hover:underline">
          complete letter guide
        </Link>{' '}
        or use the{' '}
        <Link href="/letter-builder" className="text-accent hover:underline">
          interactive letter builder
        </Link>
        .
      </p>

      <Callout type="warning" title="2026: Stricter Requirements">
        Since June 2025, USCIS has significantly tightened documentation requirements. Vague support
        letters that previously worked are now being denied. Invest time in a detailed,
        profession-specific letter.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Timeline</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>
          <strong>Port of Entry:</strong> Same day. Candidate can start work immediately after
          approval.
        </li>
        <li>
          <strong>I-129 (standard):</strong> 3-5 months. Candidate cannot start until approved.
        </li>
        <li>
          <strong>I-129 (premium):</strong> 15 business days. Add $
          {fees.premiumProcessing.toLocaleString()} to filing fees.
        </li>
        <li>
          <strong>Renewal:</strong> Same process, same timelines. Can be done up to 3 years at a
          time, indefinitely.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Compliance</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>
          TN workers are authorized to work <strong>only</strong> for the sponsoring employer in the
          specified role.
        </li>
        <li>
          Any material change (new role, new location, new employer) requires a{' '}
          <strong>new TN application</strong>.
        </li>
        <li>
          TN workers <strong>cannot be self-employed</strong> — the employer must be an independent
          entity.
        </li>
        <li>
          Complete an <strong>I-9 form</strong> within 3 days of the employee&apos;s start date.
        </li>
        <li>The I-94 serves as proof of work authorization for I-9 purposes.</li>
      </ul>

      <Callout type="tip" title="Ready to Hire?">
        <Link href="/post-job" className="text-accent hover:underline font-medium">
          Post a TN-eligible job
        </Link>{' '}
        on our job board to reach qualified Canadian professionals. It&apos;s free.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/employer-letter"
            className="card card-interactive p-4 text-center font-medium text-accent"
          >
            Letter Guide & Template
          </Link>
          <Link
            href="/letter-builder"
            className="card card-interactive p-4 text-center font-medium text-accent"
          >
            Interactive Letter Builder
          </Link>
          <Link
            href="/professions"
            className="card card-interactive p-4 text-center font-medium text-accent"
          >
            63 TN Professions
          </Link>
          <Link
            href="/fees"
            className="card card-interactive p-4 text-center font-medium text-accent"
          >
            Fee Calculator
          </Link>
        </div>
      </div>
    </ContentLayout>
  )
}
