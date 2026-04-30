import type { Metadata } from 'next';
import ContentLayout from '@/components/layout/ContentLayout';
import { Callout } from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'Common TN Visa Mistakes & Pitfalls',
  description: 'Avoid the most common TN visa application mistakes that lead to denials and complications.',
};

export default function MistakesPage() {
  return (
    <ContentLayout
      title="Common Mistakes & Pitfalls"
      description="Avoid these errors that can get your TN visa denied or jeopardize your status."
      breadcrumbs={[{label:'Common Mistakes', href:'/mistakes'}]}
      lastUpdated="April 2026"
    >
      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Top 8 Reasons for Denial</h2>
        <ol className="list-decimal pl-6 space-y-3 mb-4">
          <li><strong>Weak employer letter</strong> — Vague duties, missing required details, or boilerplate language</li>
          <li><strong>Duties don&apos;t match the TN category</strong> — Job description includes duties outside the profession&apos;s scope</li>
          <li><strong>Insufficient qualifications</strong> — Degree field doesn&apos;t match the TN category requirements</li>
          <li><strong>Wrong TN category</strong> — Applying under a category that doesn&apos;t fit your actual role</li>
          <li><strong>No evidence of temporary intent</strong> — No Canadian ties, open-ended employment</li>
          <li><strong>Incomplete documentation</strong> — Missing degree evaluation, transcripts, or credentials</li>
          <li><strong>Document mismatch</strong> — Inconsistencies between employer letter, resume, and degree</li>
          <li><strong>Self-employment indicators</strong> — Ownership stake in petitioning company, LLC formation, or 1099 arrangement</li>
        </ol>
      </section>

      <Callout type="info" title="Denial Rate Context">
        The FY 2024 denial rate spiked to 42.63% — a historic high driven by increased scrutiny of certain categories.
        By Q2 2025, the approval rate recovered to 94.6% as applicants adapted to stricter standards.
      </Callout>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Red Flags CBP Officers Look For</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Vague or generic job descriptions that could apply to any role</li>
          <li>Job title that doesn&apos;t match the TN profession category</li>
          <li>Salary significantly below market rate for the position</li>
          <li>Shell company or newly formed company with no employees</li>
          <li>Degree field unrelated to the TN category claimed</li>
          <li>Signs of permanent intent (house purchase, family relocation, no return ties)</li>
          <li>Inconsistencies between verbal answers and written documents</li>
          <li>Multiple TN renewals without clear temporary purpose</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Things That Jeopardize Your Status</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Working for unauthorized employer</strong> — TN is employer-specific; you cannot work for anyone else</li>
          <li><strong>Changed job duties</strong> — If your actual work differs materially from what was approved</li>
          <li><strong>1099 contract work</strong> — Independent contractor arrangements violate TN requirements</li>
          <li><strong>Self-employment</strong> — Running your own business, freelancing, or consulting independently</li>
          <li><strong>Overstaying</strong> — Remaining past your I-94 expiration without renewal</li>
          <li><strong>Foreign employer remote work</strong> — Working remotely for a non-U.S. employer while in the U.S.</li>
          <li><strong>Freelancing or side gigs</strong> — Any paid work outside your TN employer is unauthorized</li>
          <li><strong>Premature green card filing</strong> — Filing I-485 while on TN without proper strategy</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Common Misconceptions</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border mb-4">
            <thead>
              <tr className="bg-bg-secondary">
                <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Myth</th>
                <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Reality</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">Being a tax resident means I have permanent intent</td>
                <td className="border border-border px-4 py-2 text-fg-secondary">Tax residency is separate from immigration intent</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">I can freelance on the side if it&apos;s small</td>
                <td className="border border-border px-4 py-2 text-fg-secondary">Any unauthorized work violates your status</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">TN is a visa</td>
                <td className="border border-border px-4 py-2 text-fg-secondary">For Canadians, TN is a status — not a visa stamp</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">I can work remotely from Canada indefinitely</td>
                <td className="border border-border px-4 py-2 text-fg-secondary">Extended remote work from Canada creates tax and employment issues</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">My employer handles all immigration compliance</td>
                <td className="border border-border px-4 py-2 text-fg-secondary">You are personally responsible for maintaining valid status</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">TN can be renewed unlimited times forever</td>
                <td className="border border-border px-4 py-2 text-fg-secondary">No legal limit, but repeated renewals invite scrutiny about temporary intent</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">TN leads directly to a green card</td>
                <td className="border border-border px-4 py-2 text-fg-secondary">No direct path — you need a separate green card strategy</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">I don&apos;t need to file Canadian taxes anymore</td>
                <td className="border border-border px-4 py-2 text-fg-secondary">CRA may still consider you a tax resident if you maintain Canadian ties</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Callout type="danger" title="Critical Warning">
        Working as an independent contractor (1099) violates TN status and can result in deportation, a bar on
        future entry, and loss of all immigration benefits. TN requires a direct employer-employee relationship.
      </Callout>
    </ContentLayout>
  );
}
