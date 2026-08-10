import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'
import { blogArticleSchema } from '@/lib/article-schema'

export const metadata: Metadata = withCanonical('/blog/tn-visa-interview-questions-2026', {
  title: 'TN Visa Interview Questions 2026: What CBP Officers Ask',
  description: 'Prepare for your TN visa border interview. Common questions CBP officers ask, best answers, and mistakes to avoid at the port of entry.',
})

export default function TNVisaInterview2026() {
  return (
    <ContentLayout
      title="TN Visa Interview Questions 2026: What to Expect"
      description="Know exactly what CBP officers will ask and how to answer confidently."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'Interview Questions 2026', href: '/blog/tn-visa-interview-questions-2026' }]}
      lastUpdated="May 2026"
    >
      <JsonLd data={blogArticleSchema({ headline: 'TN Visa Interview Questions 2026: What CBP Officers Ask', datePublished: '2026-05-09', dateModified: '2026-05-09', path: '/blog/tn-visa-interview-questions-2026' })} />

      <Callout type="info" title="Good News">
        Most TN interviews are straightforward and take 10–20 minutes. Officers are verifying your eligibility, not trying to trick you.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Most Common Questions</h2>

      <div className="space-y-6 mb-8">
        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">&quot;What will you be doing for this company?&quot;</h3>
          <p className="text-fg-secondary text-sm mb-2"><strong>Why they ask:</strong> To verify your job matches a TN profession</p>
          <p className="text-fg-secondary text-sm"><strong>Good answer:</strong> &quot;I&apos;ll be working as a Software Engineer, designing and developing web applications. My main responsibilities include writing code, reviewing technical specifications, and collaborating with the engineering team.&quot;</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">&quot;What is your educational background?&quot;</h3>
          <p className="text-fg-secondary text-sm mb-2"><strong>Why they ask:</strong> To confirm you have the required degree</p>
          <p className="text-fg-secondary text-sm"><strong>Good answer:</strong> &quot;I have a Bachelor of Science in Computer Science from the University of Toronto, which I completed in 2020. Here&apos;s my degree and transcripts.&quot;</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">&quot;How long will you be working in the US?&quot;</h3>
          <p className="text-fg-secondary text-sm mb-2"><strong>Why they ask:</strong> TN is temporary — they want to confirm you understand this</p>
          <p className="text-fg-secondary text-sm"><strong>Good answer:</strong> &quot;My offer is for a 3-year position. I plan to work for the duration of my TN status and return to Canada when my employment ends.&quot;</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">&quot;Where will you be working?&quot;</h3>
          <p className="text-fg-secondary text-sm mb-2"><strong>Why they ask:</strong> To verify the work location matches your offer letter</p>
          <p className="text-fg-secondary text-sm"><strong>Good answer:</strong> &quot;I&apos;ll be working at the company&apos;s office in San Francisco, California. The address is in my offer letter.&quot;</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">&quot;What is your salary?&quot;</h3>
          <p className="text-fg-secondary text-sm mb-2"><strong>Why they ask:</strong> To verify it&apos;s a legitimate professional position</p>
          <p className="text-fg-secondary text-sm"><strong>Good answer:</strong> &quot;My annual salary is $120,000, as stated in my offer letter.&quot;</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">&quot;Have you worked in the US before?&quot;</h3>
          <p className="text-fg-secondary text-sm mb-2"><strong>Why they ask:</strong> To check your immigration history</p>
          <p className="text-fg-secondary text-sm"><strong>Good answer:</strong> Be honest. &quot;Yes, I had TN status from 2022–2024 with a different employer&quot; or &quot;No, this is my first time working in the US.&quot;</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Questions About Your Employer</h2>
      <div className="space-y-6 mb-8">
        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">&quot;What does the company do?&quot;</h3>
          <p className="text-fg-secondary text-sm"><strong>Good answer:</strong> Give a brief, clear description. &quot;They&apos;re a fintech company that builds payment processing software for small businesses. They have about 500 employees.&quot;</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">&quot;How did you find this job?&quot;</h3>
          <p className="text-fg-secondary text-sm"><strong>Good answer:</strong> Be straightforward. &quot;I applied through LinkedIn&quot; or &quot;A recruiter contacted me&quot; or &quot;I was referred by a friend who works there.&quot;</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">&quot;Who will you report to?&quot;</h3>
          <p className="text-fg-secondary text-sm"><strong>Good answer:</strong> &quot;I&apos;ll report to the Engineering Manager, Sarah Johnson. Her contact information is in my offer letter.&quot;</p>
        </div>
      </div>

      <Callout type="warning" title="Never Say This">
        Don&apos;t mention plans to get a green card, stay permanently, or &quot;see how it goes.&quot; TN requires temporary intent.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Tricky Questions & How to Handle Them</h2>
      <div className="space-y-6 mb-8">
        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">&quot;Do you plan to stay in the US permanently?&quot;</h3>
          <p className="text-fg-secondary text-sm"><strong>Good answer:</strong> &quot;No, I&apos;m coming for this specific job opportunity. I maintain my ties to Canada and plan to return when my employment ends.&quot;</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">&quot;Is your employer sponsoring you for a green card?&quot;</h3>
          <p className="text-fg-secondary text-sm"><strong>Good answer:</strong> If no: &quot;No, there are no green card plans.&quot; If yes, this is complicated — consider consulting an immigration lawyer before your interview.</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-2">&quot;Why are you leaving your current job in Canada?&quot;</h3>
          <p className="text-fg-secondary text-sm"><strong>Good answer:</strong> Focus on the opportunity. &quot;This role offers a great career opportunity to work with cutting-edge technology and a larger team.&quot;</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Interview Tips</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Be confident but not arrogant</strong> — You have a right to TN status if you qualify</li>
        <li><strong>Answer directly</strong> — Don&apos;t ramble or over-explain</li>
        <li><strong>Know your documents</strong> — Be able to find any document quickly</li>
        <li><strong>Dress professionally</strong> — Business casual is appropriate</li>
        <li><strong>Stay calm</strong> — Nervousness is normal but don&apos;t let it show</li>
        <li><strong>Be honest</strong> — Lies can result in permanent visa bans</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What NOT to Do</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>Don&apos;t volunteer extra information</li>
        <li>Don&apos;t argue with the officer</li>
        <li>Don&apos;t mention immigrant intent (green card, staying forever)</li>
        <li>Don&apos;t bring up previous visa issues unless asked</li>
        <li>Don&apos;t lie — ever</li>
        <li>Don&apos;t be rude or impatient</li>
      </ul>

      <Callout type="tip" title="Remember">
        The officer wants to approve you if you qualify. Your job is to make it easy for them by having organized documents and clear answers.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/border-interview" className="card card-interactive p-4 text-center font-medium text-accent">Full Border Interview Guide</Link>
          <Link href="/documents" className="card card-interactive p-4 text-center font-medium text-accent">Document Checklist</Link>
          <Link href="/denied" className="card card-interactive p-4 text-center font-medium text-accent">What If Denied?</Link>
          <Link href="/apply/port-of-entry" className="card card-interactive p-4 text-center font-medium text-accent">Port of Entry Guide</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
