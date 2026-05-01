import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'

export const metadata: Metadata = {
  title: 'TN Visa Remote Work Rules: Can You Work from Canada?',
  description: 'TN visa holders cannot work remotely from Canada for a US employer. Learn why, what is allowed, and alternatives for remote workers in 2026.',
}

export default function RemoteWorkBlogPost() {
  return (
    <ContentLayout
      title="TN Visa Remote Work Rules: Can You Work from Canada?"
      description="Remote work is everywhere — but TN visa rules haven't caught up. Here's what you need to know before working from Canada."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'Remote Work Rules', href: '/blog/tn-visa-remote-work-2026' }]}
      lastUpdated="April 2026"
    >
      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image src="https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=1200&h=400&fit=crop" alt="Remote work from home" width={1200} height={400} className="w-full h-48 sm:h-64 object-cover" />
      </div>

      <Callout type="danger" title="The Short Answer: No">
        You cannot work remotely from Canada on a TN visa. Doing so violates the terms of your status and creates serious tax and immigration consequences.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Why Remote Work from Canada Isn&apos;t Allowed</h2>
      <p className="text-fg-secondary mb-4">
        The TN visa authorizes you to <strong>work in the United States</strong> for a US employer. The key word is &quot;in.&quot; Your physical presence in the US is a condition of your status. Working remotely from Canada means you&apos;re performing US employment on Canadian soil — without Canadian work authorization and outside the scope of your TN.
      </p>
      <p className="text-fg-secondary mb-8">
        CBP and USCIS consider your TN status active only while you&apos;re physically present and working in the US. Extended remote work from Canada can be interpreted as abandoning your TN status.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What About Hybrid Arrangements?</h2>
      <p className="text-fg-secondary mb-8">
        There&apos;s no official &quot;hybrid&quot; provision in TN regulations. Some TN holders work a few days from Canada occasionally without issues, but this is a gray area with real risk. The longer and more regularly you work from Canada, the more likely it triggers problems — both with immigration and taxes.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Cross-Border Tax Complications</h2>
      <p className="text-fg-secondary mb-4">
        Working from Canada — even briefly — can trigger <strong>Canadian tax obligations</strong> on your US income. Canada taxes based on residency and physical presence. If you work enough days in Canada, CRA may consider you a Canadian tax resident, requiring you to report and pay tax on your worldwide income.
      </p>
      <p className="text-fg-secondary mb-8">
        This creates dual filing obligations and potential double taxation. See our <Link href="/taxes" className="text-accent hover:underline">tax guide</Link> for details on cross-border filing.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What IS Allowed</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Short business trips to Canada</strong> — attending meetings, conferences, or client visits is fine</li>
        <li><strong>Vacation in Canada</strong> — you can visit home; just don&apos;t open your laptop for work</li>
        <li><strong>Checking email briefly</strong> — occasional, incidental activity is generally not an issue</li>
        <li><strong>Job searching from Canada</strong> — looking for your next role doesn&apos;t count as working</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Alternatives for Remote Workers</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Work for a Canadian company remotely</strong> — no US visa needed if you stay in Canada</li>
        <li><strong>Get hired by a company with Canadian offices</strong> — work locally under Canadian employment law</li>
        <li><strong>Explore <Link href="/self-employment" className="text-accent hover:underline">self-employment options</Link></strong> — though TN doesn&apos;t allow self-employment either</li>
        <li><strong><Link href="/apply" className="text-accent hover:underline">Apply for TN status</Link></strong> and relocate to the US if you want to work for a US employer</li>
      </ul>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/taxes" className="card card-interactive p-4 text-center font-medium text-accent">Tax Guide</Link>
          <Link href="/self-employment" className="card card-interactive p-4 text-center font-medium text-accent">Self-Employment Rules</Link>
          <Link href="/apply" className="card card-interactive p-4 text-center font-medium text-accent">How to Apply</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
