import type { Metadata } from 'next';
import ContentLayout from '@/components/layout/ContentLayout';
import { Callout } from '@/components/ui/Callout';
import { StepList } from '@/components/ui/StepList';
import Link from 'next/link';
import airports from '@/data/airports.json';
import borderCrossings from '@/data/border-crossings.json';

export const metadata: Metadata = {
  title: 'Applying at the Port of Entry',
  description: 'Step-by-step guide to applying for TN status at the U.S. border or Canadian airport preclearance.',
};

export default function PortOfEntryPage() {
  return (
    <ContentLayout
      title="Applying at the Port of Entry"
      description="Step-by-step guide to applying for TN status at the U.S. border or Canadian airport preclearance."
      breadcrumbs={[{label:'Apply', href:'/apply'}, {label:'Port of Entry', href:'/apply/port-of-entry'}]}
      lastUpdated="April 2026"
    >
      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The Process</h2>
        <StepList
          steps={[
            { title: 'Drive to the border or arrive at airport preclearance', description: 'Choose a land border crossing or one of the 10 Canadian airports with U.S. preclearance. Arrive early — wait times vary.' },
            { title: 'Tell the officer you are applying for TN status', description: 'At primary inspection, state clearly: "I am applying for TN status." Do not say you are entering for tourism or business.' },
            { title: 'Get directed to secondary inspection', description: 'You will be sent to a secondary inspection area where a CBP officer handles TN applications specifically.' },
            { title: 'Present your documents', description: 'Hand over your employer letter, degree/credentials, resume, and any supporting documents. Have everything organized and easy to review.' },
            { title: 'Undergo questioning', description: 'The officer will ask about your job duties, qualifications, employer, and intent to return to Canada. Answer clearly and concisely.' },
            { title: 'Officer reviews and decides', description: 'The officer reviews your documents, verifies your qualifications match the TN category, and makes an approval or denial decision.' },
            { title: 'If approved, receive your I-94', description: 'You receive an I-94 record with TN classification, valid up to 3 years. Print it later from i94.cbp.dhs.gov to confirm details.' },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Canadian Preclearance Airports</h2>
        <p className="mb-4">These Canadian airports have U.S. Customs and Border Protection preclearance facilities:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {airports.map((a) => (
            <div key={a.code} className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-fg">{a.name}</p>
                  <p className="text-sm text-fg-muted">{a.code}</p>
                </div>
                {a.recommended && <span className="badge">Recommended</span>}
              </div>
              {a.notes && <p className="text-xs text-fg-muted mt-2">{a.notes}</p>}
            </div>
          ))}
        </div>
      </section>

      <Callout type="tip" title="Why Airport Preclearance Is Safer">
        If denied at airport preclearance, you remain in Canada — you never left. At a land border, denial can
        result in a formal refusal on your record or even expedited removal if mishandled.
      </Callout>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What to Say</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <h3 className="font-semibold text-success mb-2">DO Say</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>&quot;I am applying for TN status&quot;</li>
              <li>State your profession category clearly</li>
              <li>Explain your duties in plain language</li>
              <li>Mention your Canadian ties and intent to return</li>
              <li>Answer questions directly and concisely</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-danger mb-2">DO NOT Say</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>&quot;I am moving to the U.S.&quot;</li>
              <li>&quot;I plan to stay permanently&quot;</li>
              <li>&quot;I am looking for a green card&quot;</li>
              <li>Volunteer information not asked</li>
              <li>Contradict what is in your documents</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">If Denied</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <h3 className="font-semibold mb-2">At Land Border</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Withdrawal</strong> — Ask to withdraw your application. No denial on record. You return to Canada.</li>
              <li><strong>Formal denial</strong> — Officer issues a written denial. Goes on your record but you can reapply.</li>
              <li><strong>Expedited removal</strong> — Worst case. 5-year bar on entry. Only if you misrepresented facts.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">At Airport Preclearance</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Right to withdraw</strong> — You can always withdraw since you have not left Canada</li>
              <li><strong>Canadian law applies</strong> — You are still on Canadian soil; U.S. officers have limited authority</li>
              <li><strong>No removal risk</strong> — Cannot be deported since you never entered the U.S.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Tips for Success</h2>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>Go early in the morning</strong> — Officers are fresher and lines are shorter</li>
          <li><strong>Avoid Mondays and Fridays</strong> — Busiest days at land borders</li>
          <li><strong>Bring multiple copies</strong> — At least 3 copies of every document</li>
          <li><strong>Dress professionally</strong> — First impressions matter; dress as you would for the job</li>
          <li><strong>Have your employer available by phone</strong> — In case the officer wants to verify details</li>
          <li><strong>Do not bring moving boxes</strong> — Signals permanent intent and raises red flags</li>
          <li><strong>Practice explaining your duties</strong> — Be able to describe your role in 2-3 sentences</li>
          <li><strong>Know your TN category</strong> — Be able to explain why your role fits the category</li>
          <li><strong>Bring proof of Canadian ties</strong> — Lease, property deed, family, return flight</li>
          <li><strong>Stay calm and polite</strong> — Even if questioned aggressively, remain composed</li>
        </ol>
      </section>

      <Callout type="warning" title="No Moving Boxes">
        Do not bring moving boxes or household goods on your first TN entry — it signals permanent intent.
        Ship belongings separately after your status is approved, or make a second trip.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Land Border Crossings</h2>
      <Callout type="tip" title="Province-Specific Recommendations">
        <strong>Ontario:</strong> Peace Bridge (Fort Erie) has the most TN experience. <strong>BC:</strong> Pacific Highway (Surrey) is the main crossing. <strong>Quebec:</strong> Lacolle is the primary option.
      </Callout>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 mb-8">
        {borderCrossings.map(c => (
          <div key={c.name} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-fg">{c.name}</p>
                <p className="text-sm text-fg-muted">{c.location}</p>
              </div>
              {c.recommended && <span className="badge">Recommended</span>}
            </div>
            {c.notes && <p className="text-xs text-fg-muted mt-2">{c.notes}</p>}
          </div>
        ))}
      </div>

      <p className="mt-6">
        <Link href="/apply" className="text-accent hover:underline font-medium">
          ← Back to Application Guide
        </Link>
      </p>
    </ContentLayout>
  );
}
