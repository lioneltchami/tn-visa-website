import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import Image from 'next/image'
import ProfessionFinder from '@/components/tools/ProfessionFinder'

export default function ProfessionsPage() {
  return (
    <ContentLayout
      title="TN Visa Eligible Professions"
      description="All 63 USMCA professions eligible for TN status, searchable and filterable."
      breadcrumbs={[{label:'Professions', href:'/professions'}]}
      lastUpdated="April 2026"
    >
      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop" alt="Professional team" width={1200} height={400} className="w-full h-48 sm:h-64 object-cover" />
      </div>

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
