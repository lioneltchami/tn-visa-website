import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import ProfessionFinder from '@/components/tools/ProfessionFinder'

export default function ProfessionsPage() {
  return (
    <ContentLayout
      title="TN Visa Eligible Professions"
      description="All 63 USMCA professions eligible for TN status, searchable and filterable."
      breadcrumbs={[{label:'Professions', href:'/professions'}]}
      lastUpdated="April 2026"
    >
      <p className="mb-8">
        The USMCA treaty lists 63 professions that qualify for TN visa status. Each profession has specific education and credential requirements. Use the tool below to search and filter professions.
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
