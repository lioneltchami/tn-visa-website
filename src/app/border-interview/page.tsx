import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import AffiliateLink from '@/components/ui/AffiliateLink'
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure'
import JsonLd from '@/components/JsonLd'
import airports from '@/data/airports.json'
import borderCrossings from '@/data/border-crossings.json'
import ProvinceSelector from '@/components/ui/ProvinceSelector'

export const metadata: Metadata = withCanonical('/border-interview', {
  title: 'TN Visa Border Interview Guide for Canadians',
  description: 'What to expect at the border, common CBP officer questions, how to answer, and tips to avoid denial. Updated for 2026 enhanced vetting.',
})

export default function BorderInterviewPage() {
  return (
    <ContentLayout
      title="TN Visa Border Interview Guide"
      description="The border interview is the most stressful part of the TN process. Here's exactly what to expect and how to prepare."
      breadcrumbs={[{ label: 'Border Interview', href: '/border-interview' }]}
      lastUpdated="April 2026"
    >
      <AffiliateDisclosure />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Prepare for a TN Visa Border Interview',
        description: 'Step-by-step preparation guide for the TN visa border interview at a US port of entry or Canadian preclearance airport.',
        step: [
          { '@type': 'HowToStep', name: 'Organise your documents', text: 'Prepare a complete, organised document package with a cover sheet summarising your application.' },
          { '@type': 'HowToStep', name: 'Know your story', text: 'Be ready to concisely explain your role, qualifications, and temporary intent in 2-3 sentences.' },
          { '@type': 'HowToStep', name: 'Practice common questions', text: 'Rehearse answers to the 10-15 most common CBP officer questions.' },
          { '@type': 'HowToStep', name: 'Arrive prepared', text: 'Bring multiple copies of all documents. At land borders, allow 2-3 extra hours. At airports, arrive early.' },
          { '@type': 'HowToStep', name: 'Stay calm and concise', text: 'Answer questions directly and honestly. Do not volunteer extra information or mention long-term plans.' },
        ],
      }} />

      <Callout type="tip" title="Airport Preclearance Is Recommended">
        If denied at a Canadian airport preclearance facility, you can withdraw your application and walk back into the terminal. At a land border, you&apos;re subject to US immigration enforcement including potential expedited removal.
      </Callout>

      <ProvinceSelector />

      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1200&h=400&fit=crop" alt="Airport terminal" width={1200} height={400} className="w-full h-48 sm:h-64 object-cover" />
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What to Expect</h2>
      <p className="text-fg-secondary mb-4">The TN border process has two stages:</p>
      <ol className="list-decimal pl-6 space-y-3 text-fg-secondary mb-8">
        <li><strong>Primary inspection (1-5 minutes):</strong> You tell the officer you&apos;re applying for TN status. They review your passport and may ask a few basic questions. Most applicants are then sent to secondary inspection.</li>
        <li><strong>Secondary inspection (15 minutes - 2 hours):</strong> A different officer reviews your full application package in detail. They&apos;ll ask about your job, qualifications, employer, and intent. This is where the real interview happens.</li>
      </ol>
      <p className="text-fg-secondary mb-8">
        Total time varies from <strong>15 minutes to 2+ hours</strong> depending on the port of entry, time of day, and complexity of your case. During the 2026 DHS shutdown, expect longer waits due to enhanced vetting.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Common Questions Officers Ask</h2>
      <p className="text-fg-secondary mb-4">Prepare clear, concise answers for each of these:</p>
      <ol className="list-decimal pl-6 space-y-2 text-fg-secondary mb-8">
        <li>Why are you coming to the United States?</li>
        <li>What will you be doing? Describe your job duties.</li>
        <li>Who is your employer? What does the company do?</li>
        <li>What is your job title?</li>
        <li>How long will you be working in the US?</li>
        <li>What is your salary?</li>
        <li>What is your educational background? What degree do you hold?</li>
        <li>Where did you go to school?</li>
        <li>Do you have any ties to Canada? Property, family, assets?</li>
        <li>Will you return to Canada when your employment ends?</li>
        <li>Have you ever been denied entry to the US?</li>
        <li>Have you ever applied for a green card or immigrant visa?</li>
        <li>Have you worked in the US before? Under what status?</li>
        <li>Where will you be living in the US?</li>
        <li>Is your spouse or family coming with you?</li>
      </ol>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">How to Answer</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Be concise.</strong> Answer the question asked, nothing more. A 1-2 sentence answer is ideal.</li>
        <li><strong>Be honest.</strong> Never lie to a CBP officer. Misrepresentation can result in permanent bars.</li>
        <li><strong>Be confident.</strong> You have a right to apply. Present yourself as a qualified professional.</li>
        <li><strong>Don&apos;t volunteer information.</strong> If they ask &quot;What will you do?&quot;, describe your job — don&apos;t add &quot;and eventually I&apos;d like to get a green card.&quot;</li>
        <li><strong>Emphasize temporary intent.</strong> Mention your ties to Canada: property, family, return plans.</li>
        <li><strong>Don&apos;t mention green card plans.</strong> TN requires non-immigrant intent. Any mention of permanent residence can trigger a denial.</li>
        <li><strong>Don&apos;t argue.</strong> If the officer seems skeptical, stay calm. If they signal a denial, ask to <Link href="/denied" className="text-accent hover:underline">withdraw your application</Link> instead.</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What to Bring</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Cover sheet:</strong> A one-page summary listing your name, TN profession, employer, and all enclosed documents</li>
        <li><strong>Valid Canadian passport</strong> (not expiring within 6 months)</li>
        <li><strong>Employer support letter</strong> on company letterhead (see <Link href="/employer-letter" className="text-accent hover:underline">letter guide</Link>)</li>
        <li><strong>Degree/diploma</strong> (original or certified copy)</li>
        <li><strong>Official transcripts</strong></li>
        <li><strong>Professional licence</strong> (if applicable — P.Eng, CPA, etc.)</li>
        <li><strong>Credential evaluation</strong> (if your degree is from outside Canada/US)</li>
        <li><strong>Resume/CV</strong></li>
        <li><strong>Previous TN approval notices</strong> (if renewing)</li>
        <li><strong>Multiple copies</strong> of everything — bring at least 2 complete sets</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What NOT to Do</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Don&apos;t bring a one-way ticket.</strong> Book a round-trip or have proof of return plans.</li>
        <li><strong>Don&apos;t have moving boxes visible in your car</strong> at a land border. It signals permanent relocation.</li>
        <li><strong>Don&apos;t mention permanent plans.</strong> No talk of buying a house, getting a green card, or &quot;moving to the US.&quot;</li>
        <li><strong>Don&apos;t argue with the officer.</strong> If things go badly, ask to withdraw. See our <Link href="/denied" className="text-accent hover:underline">denial guide</Link>.</li>
        <li><strong>Don&apos;t bring unnecessary people.</strong> Apply alone unless dependents are applying for TD status simultaneously.</li>
        <li><strong>Don&apos;t use your phone during the interview.</strong> Give the officer your full attention.</li>
        <li><strong>Don&apos;t have controversial content on your phone.</strong> Since December 2025, CBP has expanded social media and device checks.</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Land Border vs Airport Preclearance</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse border border-border">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="border border-border px-4 py-3 text-left font-semibold text-fg"></th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-fg">Land Border</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-fg">Airport Preclearance</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-border px-4 py-3 font-medium text-fg">Cost</td><td className="border border-border px-4 py-3 text-fg-secondary">$80 ($50 + $30 I-94)</td><td className="border border-border px-4 py-3 text-fg-secondary">$50 (I-94 included in airfare)</td></tr>
            <tr><td className="border border-border px-4 py-3 font-medium text-fg">If denied</td><td className="border border-border px-4 py-3 text-fg-secondary">Risk of expedited removal</td><td className="border border-border px-4 py-3 text-fg-secondary">Can withdraw and stay in Canada</td></tr>
            <tr><td className="border border-border px-4 py-3 font-medium text-fg">Wait time</td><td className="border border-border px-4 py-3 text-fg-secondary">Variable (can be hours)</td><td className="border border-border px-4 py-3 text-fg-secondary">Generally faster</td></tr>
            <tr><td className="border border-border px-4 py-3 font-medium text-fg">Best for</td><td className="border border-border px-4 py-3 text-fg-secondary">Driving to the US, strong cases</td><td className="border border-border px-4 py-3 text-fg-secondary">First-time applicants, complex cases</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Canadian Preclearance Airports</h2>
      <p className="text-fg-secondary mb-4">These Canadian airports have US CBP preclearance facilities where you can apply for TN status:</p>
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

      <Callout type="tip" title="Professional Interview Preparation">
        Want to practice with an expert? <AffiliateLink offer="tnvisaexpert-interview">TN Visa Expert&apos;s Border Interview Kit</AffiliateLink> ($54) covers 30+ common questions with ideal answers.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Land Border Crossings</h2>
      <p className="text-fg-secondary mb-4">Major Canada-US land border crossings where you can apply for TN status:</p>
      {['Ontario', 'British Columbia', 'Quebec', 'Manitoba'].map(province => {
        const crossings = borderCrossings.filter(c => c.province === province)
        if (!crossings.length) return null
        return (
          <div key={province} className="mb-6">
            <h3 className="text-lg font-semibold text-fg mb-2">{province}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {crossings.map(c => (
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
          </div>
        )
      })}

      <Callout type="warning" title="2026 Update: Enhanced Vetting">
        Since December 2025, USCIS has operated a centralized Vetting Center with expanded social media and online presence checks. During the ongoing DHS shutdown, expect longer wait times and more secondary inspections. <strong>Allow 2-3 extra hours</strong> at the border.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/apply/port-of-entry" className="card card-interactive p-4 text-center font-medium text-accent">Port of Entry Guide</Link>
          <Link href="/documents" className="card card-interactive p-4 text-center font-medium text-accent">Required Documents</Link>
          <Link href="/denied" className="card card-interactive p-4 text-center font-medium text-accent">What If Denied?</Link>
          <Link href="/employer-letter" className="card card-interactive p-4 text-center font-medium text-accent">Employer Letter Guide</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
