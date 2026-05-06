# Project Overview

- **Next.js version:** 14.2.35
- **Router:** App Router
- **TypeScript:** Yes
- **Styling:** Tailwind CSS 3.4.19 with CSS custom properties (HSL-based design tokens in `globals.css`). No shadcn/ui.
- **UI library:** Custom components only. Uses `lucide-react` for icons, `framer-motion` for animations, `clsx` for conditional classes.
- **State management:** No global state library. Client components use `useState`/`useEffect` with direct Supabase queries. No TanStack Query, SWR, or Zustand.
- **Database / ORM:** Supabase (PostgreSQL) via `@supabase/ssr` + `@supabase/supabase-js`. No Prisma/Drizzle.
- **Authentication:** Supabase Auth (cookie-based via `@supabase/ssr`), enforced in middleware for protected routes.
- **AI:** Vercel AI SDK (`ai` + `@ai-sdk/openai`) for a chat assistant.
- **Payments:** Stripe (checkout sessions + webhooks).
- **Email:** Resend (newsletter subscriptions, renewal reminders).
- **PWA:** `next-pwa` with service worker and offline caching.
- **Analytics:** Plausible (self-hosted script, no cookie banner needed).
- **Deployment target:** Vercel (`.vercel/` directory present, domain: `tnvisaguide.ca`).

---

# Folder Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Nav, Footer, ChatAssistant, PWA)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind + CSS custom properties (light/dark)
│   ├── sitemap.ts              # Dynamic sitemap generation
│   ├── robots.ts               # Robots.txt config
│   ├── not-found.tsx / error.tsx / loading.tsx / global-error.tsx
│   ├── (auth)/                 # Auth route group (login, signup)
│   ├── (platform)/             # Protected route group (dashboard, profile, etc.)
│   │   ├── layout.tsx          # Adds container-tight + section-padding
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── my-documents/
│   │   ├── analyzer/
│   │   ├── onboarding/
│   │   ├── post-job/
│   │   ├── employer/
│   │   └── status/
│   ├── jobs/                   # Job board (list + [slug] detail)
│   ├── companies/              # Company directory (list + [id] detail + add)
│   ├── professions/            # TN professions (list + [slug] detail)
│   ├── experiences/            # User experiences (list + submit)
│   ├── blog/                   # Blog posts (static pages per slug)
│   ├── compare/                # Visa comparison pages (tn-vs-h1b, etc.)
│   ├── api/
│   │   ├── checkout/route.ts   # Stripe checkout session creation
│   │   ├── webhook/route.ts    # Stripe webhook handler
│   │   ├── subscribe/route.ts  # Newsletter subscription (Resend)
│   │   └── chat/route.ts       # AI chat (Vercel AI SDK + OpenAI)
│   └── [many content pages]    # faq, documents, taxes, fees, eligibility, etc.
├── components/
│   ├── layout/                 # Nav.tsx, Footer.tsx, ContentLayout.tsx
│   ├── ui/                     # Reusable UI (Callout, FaqAccordion, Checklist, etc.)
│   └── tools/                  # Interactive tools (EligibilityChecker, LetterBuilder, etc.)
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   ├── server.ts           # Server Supabase client (cookies)
│   │   └── middleware.ts       # Session refresh helper
│   ├── constants.ts            # CURRENT_YEAR, LAST_UPDATED
│   ├── currency.ts             # Currency formatting
│   └── video.ts                # Video embed helpers
├── hooks/
│   ├── useAuth.ts              # Auth state hook (user, loading, signOut)
│   └── useAnalytics.ts         # Plausible event tracking
├── data/
│   ├── professions.json        # 63 TN professions with metadata
│   ├── fees.json               # TN visa fee data
│   ├── airports.json           # Port of entry airports
│   ├── border-crossings.json   # Land border crossings
│   ├── glossary.json           # Immigration glossary terms
│   └── seed-companies.ts       # Company seed data
├── types/
│   └── database.ts             # TypeScript interfaces (Profile, Company, Document, etc.)
└── middleware.ts               # Route protection (redirects unauthenticated users)
```

---

# Key Conventions & Patterns

## Data Fetching
- **Content pages:** Server Components (default). Static content rendered at build time.
- **Dynamic data (jobs, companies, profiles):** Client Components (`'use client'`) with `useEffect` + direct Supabase client queries. No server actions used.
- **API routes:** Used only for external integrations (Stripe, Resend, OpenAI). Located in `src/app/api/`.
- **Server-side Supabase:** `createServerSupabase()` from `@/lib/supabase/server` (uses cookies).
- **Client-side Supabase:** `createClient()` from `@/lib/supabase/client`.

## Naming Conventions
- **Pages:** `page.tsx` in route folders (App Router convention).
- **Components:** PascalCase filenames (`EligibilityChecker.tsx`, `FaqAccordion.tsx`).
- **Hooks:** camelCase with `use` prefix (`useAuth.ts`, `useAnalytics.ts`).
- **Data files:** kebab-case JSON (`border-crossings.json`, `professions.json`).
- **Route groups:** Parenthesized folders `(auth)`, `(platform)` for layout grouping.
- **Dynamic routes:** Bracket notation `[slug]`, `[id]`.

## Error Handling & Loading States
- Global `error.tsx`, `loading.tsx`, `not-found.tsx`, `global-error.tsx` at root.
- Route-group-level `error.tsx` and `loading.tsx` in `(platform)/` and `companies/`.
- Client components use local `loading` state with `useState(true)` pattern.
- Loading UI: `animate-pulse` text or skeleton patterns.

## Styling Patterns
- **Design tokens:** HSL CSS custom properties in `:root` and `.dark` (in `globals.css`).
- **Utility classes (custom):** `glass`, `gradient-text`, `gradient-bg`, `card`, `card-interactive`, `badge`, `section-padding`, `container-tight`, `container-wide`.
- **Conditional classes:** `clsx()` for dynamic class composition. **No `cn()` utility.**
- **Dark mode:** Class-based (`darkMode: "class"` in Tailwind config). Toggled via localStorage with inline script to prevent flash.
- **Animations:** Custom keyframes in `tailwind.config.ts` (`fade-in`, `slide-up`, `slide-down`).

## Custom Hooks
- `useAuth()` — returns `{ user, loading, signOut }`. Uses Supabase `onAuthStateChange`.
- `trackEvent(name, props)` — fires Plausible custom events.

## Lib Utilities
- `src/lib/supabase/client.ts` — `createClient()` for browser-side Supabase.
- `src/lib/supabase/server.ts` — `createServerSupabase()` for server-side Supabase.
- `src/lib/supabase/middleware.ts` — `updateSession(request)` for middleware session refresh.
- `src/lib/constants.ts` — `CURRENT_YEAR = 2026`, `LAST_UPDATED = 'April 2026'`.
- `src/lib/currency.ts` — Currency formatting helper.
- `src/lib/video.ts` — Video embed URL helpers.

---

# Existing Pages & Features

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, feature highlights, CTA |
| `/jobs` | TN visa job board with client-side filters (profession, location, remote) |
| `/jobs/[slug]` | Individual job detail page with apply button |
| `/companies` | TN-friendly company directory |
| `/companies/[id]` | Company detail page |
| `/companies/add` | Add a company form (authenticated) |
| `/professions` | List of all 63 TN professions |
| `/professions/[slug]` | Individual profession detail |
| `/experiences` | Community TN visa experiences |
| `/experiences/submit` | Submit an experience (authenticated) |
| `/blog` | Blog index |
| `/blog/[slug]` | Individual blog posts (6 static articles) |
| `/compare` | Visa comparison hub |
| `/compare/tn-vs-e2` | TN vs E2 comparison |
| `/compare/tn-vs-l1` | TN vs L1 comparison |
| `/compare/tn-vs-o1` | TN vs O1 comparison |
| `/eligibility` | Eligibility overview + EligibilityChecker tool |
| `/documents` | Required documents guide |
| `/apply` | Application process guide |
| `/apply/port-of-entry` | Port of entry application guide |
| `/border-interview` | Border interview preparation |
| `/employer-letter` | Employer letter requirements |
| `/letter-builder` | AI letter builder tool |
| `/fees` | Fee breakdown + FeeCalculator tool |
| `/processing-times` | Current processing times |
| `/taxes` | Tax guide for TN workers |
| `/faq` | FAQ with accordion |
| `/renewal` | Renewal guide |
| `/dependents` | TD visa for dependents |
| `/denied` | What to do if denied |
| `/green-card` | Path to green card |
| `/moving` | Moving to the US guide |
| `/self-employment` | Self-employment rules |
| `/changes` | 2026 policy changes |
| `/mistakes` | Common mistakes |
| `/credentials` | Credential evaluation |
| `/glossary` | Immigration glossary |
| `/employer-guide` | Guide for employers |
| `/usmca-review` | USMCA review impact |
| `/government-shutdown` | Government shutdown impact |
| `/products` | Digital products for sale |
| `/products/success` | Post-purchase success page |
| `/disclosure` | Affiliate disclosure |
| `/unsubscribe` | Email unsubscribe |

### Protected Routes (under `(platform)/`)

| Route | Description |
|-------|-------------|
| `/dashboard` | User dashboard |
| `/profile` | User profile management |
| `/my-documents` | Document vault (upload/manage) |
| `/analyzer` | AI document analyzer |
| `/onboarding` | New user onboarding flow |
| `/post-job` | Post a job (requires company) |
| `/employer` | Employer dashboard |
| `/status` | Visa status tracker |

### Auth Routes (under `(auth)/`)

| Route | Description |
|-------|-------------|
| `/login` | Login page |
| `/signup` | Signup page |

---

# Existing Job-Related Code

## Pages

### `/jobs` — `src/app/jobs/page.tsx`
- **Type:** Client Component (`'use client'`).
- **Data:** Fetches from Supabase `jobs` table via `createClient()` in `useEffect`.
- **Filters:** Client-side filtering by `profession`, `location` (text search), `remote_policy`.
- **UI:** Cards with title, company name, TN profession badge, location, salary range, remote policy, time ago. Featured jobs have accent border + star badge.
- **Imports:** `professions.json` for filter dropdown options.

### `/jobs/[slug]` — `src/app/jobs/[slug]/page.tsx`
- **Type:** Client Component.
- **Data:** Fetches single job by `slug` from Supabase.
- **UI:** Full job detail with description, requirements list, salary, apply button (external URL), link to profession page.

### `/post-job` — `src/app/(platform)/post-job/page.tsx`
- **Type:** Client Component (protected).
- **Flow:** Requires authenticated user with a registered company. Redirects to `/login` or `/companies/add` if not met.
- **Form fields:** title, tn_profession, description, requirements, salary_min, salary_max, location, remote_policy, employment_type, application_url.

## Job TypeScript Interface

```typescript
interface Job {
  id: string
  slug: string
  title: string
  company_id: string
  company_name: string
  tn_profession: string
  description: string
  requirements: string[]
  salary_min: number | null
  salary_max: number | null
  location: string
  remote_policy: string        // 'onsite' | 'hybrid' | 'remote'
  employment_type: string      // 'full_time' | etc.
  application_url: string
  is_featured: boolean
  posted_at: string
  expires_at: string
}
```

## Related Components
- **`ProfessionFinder`** (`src/components/tools/ProfessionFinder.tsx`): Searches professions data to help users find their TN category.
- **`ProductCards`** (`src/components/tools/ProductCards.tsx`): Displays purchasable products (guides, templates).

## Related Data
- **`src/data/professions.json`**: Array of 63 TN professions with `id`, `name`, `slug`, and metadata. Used in job filters and profession pages.

## Database Schema (jobs table)
Columns: `id` (uuid), `slug` (text, unique), `title`, `company_id` (FK to companies), `company_name`, `tn_profession`, `description`, `requirements` (text[]), `salary_min` (int), `salary_max` (int), `location`, `remote_policy`, `employment_type`, `application_url`, `is_featured` (bool), `posted_at` (timestamptz), `expires_at` (timestamptz).

---

# Environment Variables & Config

## Pattern
- Client-exposed variables: `NEXT_PUBLIC_*` prefix.
- Server-only variables: No prefix.
- Accessed via `process.env.VARIABLE_NAME!` (non-null assertion).
- Config files: `.env.local` (gitignored), `.env.example` (template for developers).

## Variables

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Admin access for scripts |
| `OPENAI_API_KEY` | Server only | AI chat API route |
| `RESEND_API_KEY` | Server only | Email sending |
| `STRIPE_SECRET_KEY` | Server only | Stripe server-side operations |
| `STRIPE_WEBHOOK_SECRET` | Server only | Stripe webhook signature verification |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client | Stripe client-side checkout |

---

# Additional Context

## Middleware (`src/middleware.ts`)
- Protects routes: `/dashboard`, `/my-documents`, `/profile`, `/onboarding`, `/analyzer`.
- Refreshes Supabase session cookies on every matched request.
- Redirects unauthenticated users to `/login?redirect=<original_path>`.
- Matcher config limits middleware to protected paths only.

## SEO & Metadata
- Root `layout.tsx` sets `metadataBase` (`https://tnvisaguide.ca`), default title template (`%s | TN Visa Guide`), OpenGraph, Twitter card, canonical URL.
- Individual pages export `metadata` objects or use layout-level metadata.
- `sitemap.ts` generates dynamic sitemap including all professions, blog posts, and content pages.
- `robots.ts` disallows protected routes from indexing.
- `JsonLd.tsx` component available for structured data.

## Security Headers (in `next.config.mjs`)
- Content-Security-Policy (strict, allows Supabase, Plausible, Stripe, YouTube, Vimeo).
- Strict-Transport-Security (HSTS with preload).
- X-Frame-Options: SAMEORIGIN.
- X-Content-Type-Options: nosniff.
- Referrer-Policy: strict-origin-when-cross-origin.
- Permissions-Policy: camera=(), microphone=(), geolocation=().

## PWA Configuration (in `next.config.mjs`)
- Service worker generated by `next-pwa`, output to `/public`.
- Disabled in development.
- Runtime caching:
  - Guide pages: StaleWhileRevalidate, 7-day TTL, max 20 entries.
  - Next.js data JSON: StaleWhileRevalidate, 24-hour TTL, max 50 entries.
- `manifest.json` in `/public`.

## Testing
- **Framework:** Vitest 4.1.5 + `@testing-library/react` + jsdom.
- **Config:** `vitest.config.ts` at project root.
- **Tests:** Located in `__tests__/` folders alongside components (co-located).
- **Run command:** `npm test` (runs `vitest run`).

## Database Schema
- **Tables:** `profiles`, `companies`, `documents`, `work_history`, `jobs`, plus embeddings tables for AI search.
- **Migrations:** `supabase/migrations/` directory.
- **Schema files:** `supabase/schema.sql` and `supabase/schema-clean.sql`.

## Caching Strategy
- PWA runtime caching for guide pages (7-day TTL) and Next.js data (24-hour TTL).
- No ISR or `revalidate` directives observed — pages are either fully static or fully client-rendered.

## Key Dependencies Summary

| Library | Version | Purpose |
|---------|---------|---------|
| `next` | 14.2.35 | Framework |
| `react` / `react-dom` | 18.3.1 | UI |
| `@supabase/ssr` | 0.10.2 | Auth + DB (cookie-based) |
| `@supabase/supabase-js` | 2.104.0 | Supabase client |
| `ai` | 4.3.16 | Vercel AI SDK |
| `@ai-sdk/openai` | 1.3.22 | OpenAI provider |
| `stripe` | 17.7.0 | Payments (server) |
| `@stripe/stripe-js` | 5.5.0 | Payments (client) |
| `resend` | 4.5.1 | Transactional email |
| `framer-motion` | 11.18.2 | Animations |
| `lucide-react` | 0.469.0 | Icons |
| `clsx` | 2.1.1 | Class composition |
| `next-pwa` | 5.6.0 | PWA/offline support |
| `tailwindcss` | 3.4.19 | Styling |
| `typescript` | 5.9.3 | Type safety |
| `vitest` | 4.1.5 | Testing |

## Important Patterns for New Features

1. **New public content page:** Create `src/app/<route>/page.tsx` as a Server Component. Export `metadata` for SEO. Use `section-padding` + `container-tight` or `container-wide` wrapper classes.
2. **New protected page:** Create under `src/app/(platform)/<route>/page.tsx`. It automatically gets the platform layout and middleware protection.
3. **New API route:** Create `src/app/api/<name>/route.ts`. Use `NextRequest`/`NextResponse`.
4. **New reusable component:** Place in `src/components/ui/` (generic) or `src/components/tools/` (interactive/feature-specific).
5. **Database queries (client):** Use `createClient()` from `@/lib/supabase/client` inside `useEffect`.
6. **Database queries (server):** Use `createServerSupabase()` from `@/lib/supabase/server`.
7. **Styling:** Use Tailwind utilities + custom utility classes (`card`, `badge`, `glass`, etc.). Use `clsx()` for conditional classes.
8. **Icons:** Import from `lucide-react`.
9. **Animations:** Use `framer-motion` or Tailwind animation classes.
