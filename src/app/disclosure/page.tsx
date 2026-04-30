import type { Metadata } from 'next'
import ContentLayout from '@/components/layout/ContentLayout'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How TN Visa Guide earns revenue through affiliate partnerships.',
  robots: { index: false },
}

export default function DisclosurePage() {
  return (
    <ContentLayout
      title="Affiliate Disclosure"
      description="Transparency about how this site earns revenue."
      breadcrumbs={[{ label: 'Disclosure', href: '/disclosure' }]}
    >
      <h2 className="text-2xl font-bold text-fg mt-8 mb-4">How We Earn Revenue</h2>
      <p className="text-fg-secondary mb-4">
        TN Visa Guide is a free resource. To keep it free, we participate in affiliate programs with services we genuinely recommend. When you click an affiliate link and make a purchase, we may earn a commission at no additional cost to you.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-8 mb-4">Our Affiliate Partners</h2>
      <ul className="list-disc pl-6 space-y-3 text-fg-secondary mb-8">
        <li><strong>TN Visa Expert</strong> (tnvisaexpert.com) — Immigration services and application kits for TN visa applicants. We earn a commission when you purchase their services through our links.</li>
        <li><strong>WES (World Education Services)</strong> (wes.org) — Credential evaluation services. Many TN applicants need credential evaluations, and WES is the most widely accepted provider.</li>
        <li><strong>Wise</strong> (wise.com) — International money transfer service. TN visa holders frequently need to transfer money between Canada/Mexico and the US.</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-8 mb-4">Our Promise</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>We only recommend services we believe provide genuine value to TN visa applicants.</li>
        <li>Affiliate relationships never influence our editorial content or recommendations.</li>
        <li>All core TN visa information on this site is and will always be free.</li>
        <li>Affiliate links are clearly marked with a &quot;Partner&quot; badge.</li>
        <li>We disclose affiliate relationships on every page that contains affiliate links.</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-8 mb-4">Questions?</h2>
      <p className="text-fg-secondary">
        If you have questions about our affiliate relationships, contact us at hello@tnvisaguide.ca.
      </p>
    </ContentLayout>
  )
}
