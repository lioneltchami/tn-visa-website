export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TN Visa Guide',
    url: 'https://tnvisaguide.ca',
    description: 'The definitive guide for Canadian professionals seeking TN visa status in the United States under USMCA.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tnvisaguide.ca/jobs?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TN Visa Guide',
    url: 'https://tnvisaguide.ca',
    logo: 'https://tnvisaguide.ca/icon-512.png',
    sameAs: [],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function JobPostingSchema({ job }: { job: { title: string; company_name: string; description: string; location: string; salary_min: number | null; salary_max: number | null; posted_at: string; application_url: string; employment_type: string } }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.posted_at,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company_name,
    },
    jobLocation: {
      '@type': 'Place',
      address: job.location,
    },
    employmentType: job.employment_type === 'full_time' ? 'FULL_TIME' : 'CONTRACTOR',
    ...(job.salary_min && job.salary_max && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.salary_min,
          maxValue: job.salary_max,
          unitText: 'YEAR',
        },
      },
    }),
    directApply: true,
    applicationContact: {
      '@type': 'ContactPoint',
      url: job.application_url,
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
