import type { Metadata } from 'next';
import ContentLayout from '@/components/layout/ContentLayout';
import { Callout } from '@/components/ui/Callout';
import { ComparisonTable } from '@/components/ui/ComparisonTable';

export const metadata: Metadata = {
  title: 'TN Visa to Green Card Pathways',
  description: 'Pathways to permanent residence from TN status, the dual intent problem, and strategies for Canadians.',
};

export default function GreenCardPage() {
  return (
    <ContentLayout
      title="TN Visa to Green Card"
      description="Pathways to permanent residence, the dual intent problem, and strategies for Canadians."
      breadcrumbs={[{label:'Green Card', href:'/green-card'}]}
      lastUpdated="April 2026"
    >
      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The Dual Intent Problem</h2>
        <p className="mb-4">
          TN visa status is explicitly a <strong>single-intent</strong> nonimmigrant classification. You must demonstrate
          that your stay is temporary and that you intend to return to Canada when your status ends. A green card application
          signals <strong>permanent intent</strong> — the exact opposite of what TN requires.
        </p>
        <p className="mb-4">
          Unlike H-1B holders, USCIS does <strong>not</strong> recognize dual intent for TN visa holders. This means that
          evidence of immigrant intent (such as a pending I-485) can be used to deny TN renewal or re-entry at the border.
        </p>
      </section>

      <Callout type="danger" title="90-Day Rule">
        Never file Form I-485 (Adjustment of Status) within 90 days of your most recent TN entry. USCIS presumes fraud
        if you file for permanent residence shortly after entering on a nonimmigrant visa. Wait at least 90 days — ideally longer.
      </Callout>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Pathway 1: EB-2/EB-3 with PERM Labor Certification</h2>
        <p className="mb-4">The traditional employer-sponsored green card route:</p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>PERM Labor Certification</strong> — Employer proves no qualified U.S. workers available (6-18 months)</li>
          <li><strong>I-140 Petition</strong> — Employer files immigrant worker petition (6-12 months)</li>
          <li><strong>Priority Date Current</strong> — Wait for visa number availability (immediate for Canadians)</li>
          <li><strong>I-485 Adjustment of Status</strong> — File for permanent residence (6-18 months)</li>
        </ol>
        <p className="mb-4">
          <strong>Timeline:</strong> 3-6+ years total. The PERM process alone can take over a year with recruitment and audits.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Pathway 2: EB-2 National Interest Waiver (NIW)</h2>
        <p className="mb-4">
          The NIW is the <strong>best pathway for Canadians</strong>. It allows you to self-petition without employer sponsorship
          and skips the entire PERM process.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Self-petition</strong> — No employer dependency; you file for yourself</li>
          <li><strong>No PERM required</strong> — Eliminates the longest step</li>
          <li><strong>No visa backlog</strong> — Canadian-born applicants have no wait for visa numbers</li>
          <li><strong>Timeline:</strong> 1-2 years from filing to green card</li>
        </ul>
        <p className="mb-4">
          You must demonstrate that your work is in the national interest of the United States under the three-prong
          Matter of Dhanasar test: substantial merit, national scope, and that waiving the job offer requirement benefits the U.S.
        </p>
      </section>

      <Callout type="tip" title="Why NIW Works for Canadians">
        EB-2 NIW is particularly attractive for Canadians — you can self-petition without employer dependency,
        skip the PERM labor certification entirely, and face no visa backlog since Canada is never oversubscribed.
        Many TN professionals in STEM, healthcare, and business qualify.
      </Callout>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Pathway 3: TN → H-1B → Green Card</h2>
        <p className="mb-4">
          The <strong>safest</strong> route because H-1B explicitly allows dual intent. Once on H-1B, you can freely
          pursue a green card without jeopardizing your status.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Employer registers you in the H-1B lottery (April each year)</li>
          <li>If selected, change status from TN to H-1B (October 1 start)</li>
          <li>Once on H-1B, file PERM + I-140 + I-485 without dual intent concerns</li>
          <li>H-1B can be extended beyond 6 years while green card is pending</li>
        </ul>
        <p className="mb-4">
          <strong>Downside:</strong> H-1B lottery has ~25-30% selection rate. You may need multiple attempts.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Recommended Strategy</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Maintain Canadian ties</strong> — Keep bank accounts, property, family connections, and tax filings in Canada</li>
          <li><strong>Get I-140 approved first</strong> — An approved I-140 alone does not indicate immigrant intent if you have not filed I-485</li>
          <li><strong>Consider the H-1B bridge</strong> — Switch to H-1B before filing I-485 to eliminate dual intent risk entirely</li>
          <li><strong>Wait 90+ days</strong> — Never file I-485 within 90 days of TN entry</li>
          <li><strong>Consult an immigration attorney</strong> — The stakes are too high for DIY approaches</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Green Card Pathways Comparison</h2>
        <ComparisonTable
          headers={['Path', 'Timeline', 'Employer Required?', 'Dual Intent Risk']}
          rows={[
            { label: 'EB-2/EB-3 PERM', values: ['3-6+ years', 'Yes — sponsors entire process', 'High — filing PERM signals intent'] },
            { label: 'EB-2 NIW', values: ['1-2 years', 'No — self-petition', 'Moderate — still filing while on TN'] },
            { label: 'H-1B Bridge', values: ['2-4 years', 'Yes — for H-1B + GC', 'Low — H-1B allows dual intent'] },
            { label: 'Marriage to U.S. Citizen', values: ['6-12 months', 'No', 'Low — immediate relative category'] },
          ]}
        />
      </section>
    </ContentLayout>
  );
}
