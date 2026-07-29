/**
 * Single source of truth for the paid digital products: pricing (Stripe),
 * marketing copy (product cards) and the files each purchase unlocks
 * (build script + download routes).
 */

export const PRODUCT_IDS = ['letter-templates', 'interview-kit', 'complete-guide'] as const

export type ProductId = (typeof PRODUCT_IDS)[number]

export type ProductFile = {
  /** Object path inside the private `product-files` Supabase Storage bucket. */
  path: string
  /** Filename shown to the buyer when the PDF downloads. */
  filename: string
  /** Human label used on the download page. */
  label: string
  /** Markdown sources under `products/`, concatenated in order into one PDF. */
  sources: string[]
}

export type Product = {
  id: ProductId
  /** Full name shown on Stripe checkout and receipts. */
  name: string
  /** Shorter label used on the product cards. */
  shortName: string
  /** Price in cents, sent to Stripe. */
  priceCents: number
  description: string
  features: string[]
  popular?: boolean
  files: ProductFile[]
}

const INTERVIEW_KIT_FILE: ProductFile = {
  path: 'interview-kit/tn-visa-border-interview-kit.pdf',
  filename: 'TN-Visa-Border-Interview-Kit.pdf',
  label: 'Border Interview Kit',
  sources: ['interview-kit-part1.md', 'interview-kit-part2.md'],
}

const LETTER_TEMPLATES_FILE: ProductFile = {
  path: 'letter-templates/tn-visa-employer-letter-templates.pdf',
  filename: 'TN-Visa-Employer-Letter-Templates.pdf',
  label: 'Employer Letter Template Pack',
  sources: ['letter-templates.md'],
}

const COMPLETE_GUIDE_FILE: ProductFile = {
  path: 'complete-guide/tn-visa-complete-application-guide.pdf',
  filename: 'TN-Visa-Complete-Application-Guide.pdf',
  label: 'Complete Application Guide',
  sources: ['complete-guide.md'],
}

export const PRODUCTS: Record<ProductId, Product> = {
  'letter-templates': {
    id: 'letter-templates',
    name: 'Employer Letter Template Pack',
    shortName: 'Employer Letter Template Pack',
    priceCents: 2900,
    description:
      'Templates for 10 TN professions with pre-written duties, qualifications, and temporary intent language.',
    features: [
      'Templates for 10 TN professions',
      'Pre-written duty descriptions',
      'Qualification & temporary intent language',
      'Customization guide',
    ],
    files: [LETTER_TEMPLATES_FILE],
  },
  'interview-kit': {
    id: 'interview-kit',
    name: 'TN Visa Border Interview Kit',
    shortName: 'Border Interview Kit',
    priceCents: 4900,
    description:
      '30+ CBP questions with ideal answers, profession-specific prep, and emergency scenarios.',
    popular: true,
    features: [
      '30+ CBP officer questions with answers',
      'Profession-specific question sets',
      'Body language & behavior tips',
      'Emergency scenarios guide',
      '2026 enhanced vetting prep',
    ],
    files: [INTERVIEW_KIT_FILE],
  },
  'complete-guide': {
    id: 'complete-guide',
    name: 'Complete TN Visa Application Guide',
    shortName: 'Complete Application Guide',
    priceCents: 6900,
    description:
      'Interview Kit + Letter Templates + step-by-step walkthrough, document checklist, and renewal guide.',
    features: [
      'Everything in Interview Kit',
      'Everything in Letter Templates',
      'Step-by-step application walkthrough',
      'Document preparation checklist',
      'Post-approval guide (SSN, banking, taxes)',
      'Renewal preparation guide',
    ],
    files: [COMPLETE_GUIDE_FILE, INTERVIEW_KIT_FILE, LETTER_TEMPLATES_FILE],
  },
}

export const ALL_PRODUCTS: Product[] = PRODUCT_IDS.map((id) => PRODUCTS[id])

export function isProductId(value: unknown): value is ProductId {
  return typeof value === 'string' && (PRODUCT_IDS as readonly string[]).includes(value)
}

export function getProduct(value: unknown): Product | null {
  return isProductId(value) ? PRODUCTS[value] : null
}

export function formatPrice(priceCents: number): string {
  return `$${Math.round(priceCents / 100)}`
}

/** Every distinct file across all products, deduplicated by storage path. */
export function allProductFiles(): ProductFile[] {
  const seen = new Map<string, ProductFile>()
  for (const product of ALL_PRODUCTS) {
    for (const file of product.files) {
      if (!seen.has(file.path)) seen.set(file.path, file)
    }
  }
  return Array.from(seen.values())
}
