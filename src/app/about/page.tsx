import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import { withCanonical } from '@/lib/seo'
import { EDITORIAL, SITE_EMAIL, SITE_NAME, SITE_URL } from '@/lib/site-identity'

export const metadata: Metadata = withCanonical('/about', {
  title: 'About TN Visa Guide',
  description:
    'Who publishes TN Visa Guide, how we research TN visa content, our sources, and how to contact the editorial team.',
})

export default function AboutPage() {
  return (
    <ContentLayout
      title="About TN Visa Guide"
      description="An independent educational resource for Canadians and Mexicans navigating TN status — not a law firm."
      breadcrumbs={[{ label: 'About', href: '/about' }]}
      lastUpdated="August 2026"
    >
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `About ${SITE_NAME}`,
          url: `${SITE_URL}/about`,
          mainEntity: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            email: SITE_EMAIL,
            description: EDITORIAL.description,
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: EDITORIAL.name,
          jobTitle: EDITORIAL.jobTitle,
          worksFor: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          knowsAbout: EDITORIAL.knowsAbout,
          email: SITE_EMAIL,
          url: `${SITE_URL}/about`,
        }}
      />

      <h2 className="text-2xl font-bold text-fg mt-8 mb-4">What this site is</h2>
      <p className="text-fg-secondary mb-4">
        {SITE_NAME} explains how TN classification works under USMCA for Canadian and Mexican
        professionals: eligibility, documents, fees, border interviews, renewals, and practical
        tools (fee calculator, letter builder, profession guides).
      </p>
      <p className="text-fg-secondary mb-8">
        We publish free guides and optional paid preparation kits. Core immigration information
        stays free.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-8 mb-4">Who publishes it</h2>
      <p className="text-fg-secondary mb-4">{EDITORIAL.description}</p>
      <p className="text-fg-secondary mb-8">
        Editorial contact:{' '}
        <a href={`mailto:${SITE_EMAIL}`} className="text-accent hover:underline">
          {SITE_EMAIL}
        </a>
        . Public social / directory profiles will be linked here (and in Organization{' '}
        <code className="text-xs">sameAs</code>) when they exist — we do not invent them.
      </p>

      <Callout type="warning" title="Not legal advice">
        Nothing on this site creates an attorney-client relationship. Immigration outcomes depend on
        your facts and current agency practice. For case-specific advice, consult a licensed
        immigration attorney.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-8 mb-4">How we research</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>
          Primary sources: USCIS Policy Manual (Vol. 2 Part P), USCIS fee schedule, CBP I-94,
          Federal Register / DHS notices, and USTR USMCA materials
        </li>
        <li>
          Fee amounts are centralized in our data file and surfaced on{' '}
          <Link href="/fees" className="text-accent hover:underline">
            /fees
          </Link>{' '}
          so pages stay aligned when schedules change
        </li>
        <li>
          We flag material policy or fee changes on{' '}
          <Link href="/changes" className="text-accent hover:underline">
            /changes
          </Link>
        </li>
        <li>We do not invent personal credentials or fake social proof</li>
      </ul>

      <h3 className="text-lg font-semibold text-fg mt-6 mb-3">Official sources we cite</h3>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>
          <a
            href="https://www.uscis.gov/policy-manual/volume-2-part-p"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            USCIS Policy Manual — Volume 2, Part P (TN)
          </a>
        </li>
        <li>
          <a
            href="https://www.uscis.gov/g-1055"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            USCIS Fee Schedule (Form G-1055)
          </a>
        </li>
        <li>
          <a
            href="https://i94.cbp.dhs.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            CBP I-94 arrival records
          </a>
        </li>
        <li>
          <a
            href="https://www.federalregister.gov/agencies/u-s-citizenship-and-immigration-services"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Federal Register — USCIS / DHS notices
          </a>
        </li>
        <li>
          <a
            href="https://ustr.gov/trade-agreements/free-trade-agreements/united-states-mexico-canada-agreement"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            USTR — USMCA overview
          </a>
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-8 mb-4">Corrections &amp; trust</h2>
      <p className="text-fg-secondary mb-4">
        Found an outdated fee or broken citation? Email {SITE_EMAIL}. Affiliate relationships are
        disclosed on{' '}
        <Link href="/disclosure" className="text-accent hover:underline">
          /disclosure
        </Link>
        ; partner links are marked on the page.
      </p>

      <div className="mt-12 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href="/fees"
          className="card card-interactive p-4 text-center font-medium text-accent"
        >
          Fee calculator &amp; sources
        </Link>
        <Link href="/faq" className="card card-interactive p-4 text-center font-medium text-accent">
          FAQ
        </Link>
        <Link
          href="/disclosure"
          className="card card-interactive p-4 text-center font-medium text-accent"
        >
          Affiliate disclosure
        </Link>
        <Link
          href="/products"
          className="card card-interactive p-4 text-center font-medium text-accent"
        >
          Preparation kits
        </Link>
      </div>
    </ContentLayout>
  )
}
