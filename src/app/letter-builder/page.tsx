import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import AffiliateLink from '@/components/ui/AffiliateLink'
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure'
import LetterBuilder from '@/components/tools/LetterBuilder'

export const metadata: Metadata = {
  title: 'TN Visa Employer Letter Builder',
  description: 'Free interactive tool to generate a TN visa employer support letter. Covers all 63 USMCA professions with profession-specific guidance.',
}

export default function LetterBuilderPage() {
  return (
    <ContentLayout
      title="Employer Letter Builder"
      description="Generate a profession-specific employer support letter template. The #1 reason for TN visa denials is a weak support letter."
      breadcrumbs={[{ label: 'Letter Builder', href: '/letter-builder' }]}
      lastUpdated="April 2026"
    >
      <AffiliateDisclosure />
      <Callout type="info" title="How This Works">
        Fill in your details and this tool generates a letter template your employer can customize, print on company letterhead, and sign. See our <Link href="/employer-letter" className="text-accent hover:underline font-medium">employer letter guide</Link> for what makes a strong letter.
      </Callout>

      <LetterBuilder />

      <Callout type="warning" title="Disclaimer">
        This tool generates a template for informational purposes only. It is not legal advice and does not create an attorney-client relationship. Have an immigration attorney review your letter before submitting.
      </Callout>

      <Callout type="tip" title="Need Professional Help?">
        For complex cases — especially Engineer, Management Consultant, or Scientific Technician — consider professional letter review. <AffiliateLink href="https://tnvisaexpert.com" provider="tnvisaexpert">TN Visa Expert</AffiliateLink> offers attorney-reviewed letters starting at $850.
      </Callout>
    </ContentLayout>
  )
}
