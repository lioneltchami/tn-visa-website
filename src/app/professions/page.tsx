import ContentLayout from '@/components/layout/ContentLayout'
import JsonLd from '@/components/JsonLd'
import { Callout } from '@/components/ui/Callout'
import ProfessionFinder from '@/components/tools/ProfessionFinder'
import professions from '@/data/professions.json'

export default function ProfessionsPage() {
  return (
    <ContentLayout
      title="TN Visa Eligible Professions"
      description="All 63 USMCA professions eligible for TN status, searchable and filterable."
      breadcrumbs={[{label:'Professions', href:'/professions'}]}
      lastUpdated="September 2026"
    >
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'USMCA TN professions',
        numberOfItems: professions.length,
        itemListElement: professions.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.name,
          url: `https://tnvisaguide.ca/professions/${p.slug}`,
        })),
      }} />

      <h2 className="text-2xl font-bold text-fg mb-4">Which professions qualify for a TN visa?</h2>
      <p className="mb-8">
        The USMCA profession list is the set of 63 occupations that can qualify for TN status. A matching job title is not enough. The duties must fit a listed profession, and you must meet that profession&apos;s degree or credential rule. Canadians with a U.S. job offer in one of these professions apply at a port of entry or by filing with USCIS. Since June 2025, a Computer Science degree does not qualify under Engineer.
      </p>

      <ProfessionFinder />

      <Callout type="info" title="Alternative Qualifications">
        10 professions accept a diploma plus 3 years of relevant experience instead of a bachelor&apos;s degree.
      </Callout>

      <Callout type="warning" title="June 2025 Update">
        The June 2025 update narrowed the definitions for Engineer, Economist, and Computer Systems Analyst. Verify your role still qualifies under the updated criteria.
      </Callout>
    </ContentLayout>
  )
}
