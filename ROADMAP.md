# TN Visa Guide — Complete Implementation Roadmap

## Overview

**Site:** tnvisaguide.ca  
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase, Vitest  
**Goal:** The definitive free TN visa resource for Canadian professionals. Monetize through affiliates, digital products, and eventually a job board.  
**Timeline:** 6 phases over 6-9 months  
**Revenue Target:** $2,500-3,600/month at 10K visitors; $6,000-25,000/month at 50K visitors

### Revenue Model

- **TNVisaExpert affiliate** (20% commission): $360-560 per full-service referral
- **WES affiliate** (10% commission via CJ): ~$20 per credential evaluation referral
- **Wise affiliate** (up to £50/referral, lifetime cookie via Partnerize): Every TN holder needs international transfers
- **Digital products**: Interview kits ($49), letter templates ($29), profession guides ($19-39)
- **Future: Job board** ($99-299/posting for employers)

### Competitive Positioning

- **TNVisaExpert:** Deep content, terrible UX, charges $49+ for basic info → We're free + better UX
- **SimpleTN:** Nice design, shallow content, $999+ CAD → We're deeper + free tools
- **Manifest Law / Alma:** $2,500-3,500 law firms → We're the funnel that sends them clients
- **Nobody has:** free interactive tools + 63-profession data + modern tech + .ca domain

---

## PHASE 1: SEO Traffic Engine (Weeks 1-3)

*Goal: Build the content that captures organic search traffic*

---

### 1.1 — Build 63 Individual Profession Pages

This is the single biggest SEO opportunity. No competitor has individual pages for all 63 USMCA professions.

**Prompt:**

````
Build a dynamic profession detail page system for the TN visa website at /Users/lionel/builders/tnjobs/tn-visa-website.

The professions data already exists at src/data/professions.json with 63 professions, each having: id, name, category, minEducation, altCredentials, commonTitles, notes, diplomaAlternative.

Step 1: Enhance the professions.json data. For each profession, add these new fields:
- slug: URL-friendly version of the name (e.g., "engineer", "computer-systems-analyst", "management-consultant")
- description: 2-3 sentence overview of the profession under USMCA
- qualifyingDegrees: string[] of degrees that qualify
- commonDenialReasons: string[] of why applications get denied for this profession
- employerLetterTips: string[] of what the support letter should emphasize
- averageSalary: { min: number, max: number } in USD
- demandLevel: "high" | "medium" | "low"
- juneUpdate: string | null — any impact from the June 2025 USCIS policy update

Start with the top 10 most important professions (prioritize by search volume):
1. Engineer — CRITICAL: Note that CS degrees no longer qualify as of June 2025. Must hold credentials in a recognized engineering discipline.
2. Computer Systems Analyst — The alternative for displaced tech workers. Note: programmers do NOT qualify.
3. Management Consultant — One of few categories not requiring a degree (5 years experience OR degree).
4. Accountant — CPA/CA/CGA/CMA credential mapping for Canadians.
5. Economist — Affected by June 2025 tightening. Financial analysts and market researchers do NOT qualify.
6. Graphic Designer — Popular for creative professionals.
7. Pharmacist — Healthcare profession with specific licensing requirements.
8. Registered Nurse — High demand, specific credential requirements.
9. Architect — Professional license requirements.
10. Scientific Technician/Technologist — Major restrictions: no patient care, must work under named supervisor.

For the remaining 53 professions, add reasonable data based on the USMCA profession list and general immigration knowledge.

Step 2: Create the dynamic route at src/app/professions/[slug]/page.tsx as a SERVER component.

The page should:
- Import professions.json and find the profession by slug
- Export generateStaticParams() to pre-render all 63 pages at build time
- Export generateMetadata() with profession-specific title and description
- Include JSON-LD structured data (FAQPage schema with common questions about that profession)
- Use the existing ContentLayout component (src/components/layout/ContentLayout.tsx) with breadcrumbs: Home > Professions > [Profession Name]
- Display: description, qualifying degrees, minimum education, alternative credentials, common job titles, common denial reasons, employer letter tips, salary range, demand level
- If juneUpdate exists, show a prominent Callout (type="warning") about the June 2025 changes
- If diplomaAlternative is true, show a success Callout (type="tip") about the diploma + 3yr experience path
- Link to related pages: /eligibility, /apply, /employer-letter, /fees
- Add a CTA: "Check your eligibility" linking to /eligibility

Existing components to use:
- ContentLayout from '@/components/layout/ContentLayout' — accepts title, description, lastUpdated, breadcrumbs, children
- Callout from '@/components/ui/Callout' — accepts type ("warning" | "tip" | "info" | "danger"), title, children
- JsonLd from '@/components/JsonLd' — accepts data: Record<string, unknown>

Step 3: Update the sitemap at src/app/sitemap.ts to include all 63 profession pages. The sitemap currently imports SEED_COMPANIES and generates static + company routes. Add a new professionRoutes array by importing professions.json and mapping each profession's slug to a URL like `${base}/professions/${slug}` with priority 0.7.

Step 4: Update the ProfessionFinder component (src/components/tools/ProfessionFinder.tsx) to link each profession name to its detail page. The component is a 'use client' component that renders profession names as buttons in an accordion. Wrap each profession name in a Next.js Link to /professions/${slug}. You'll need to add a slug field to the professions data first (Step 1) for this to work.
````

---

### 1.2 — Build Missing High-Traffic Content Pages

---

#### Prompt — /denied page

````
Create a new page at src/app/denied/page.tsx for the TN visa website at /Users/lionel/builders/tnjobs/tn-visa-website.

This page covers what to do when your TN visa application is denied. It's targeting the keyword "TN visa denied 2026" which has massive search demand (42.63% consular denial rate in FY2024).

The page should be a SERVER component using ContentLayout. Include:

- Metadata export: title "TN Visa Denied: What To Do Next", description about denial recovery
- JSON-LD FAQPage schema with 4-5 common denial questions using the JsonLd component from '@/components/JsonLd'
- Section: "Common Denial Reasons" — list the top reasons: degree mismatch (especially CS→Engineer), vague job description, non-immigrant intent issues, missing supervisor for ScT, overqualified for position, incomplete documentation
- Section: "Denial vs Withdrawal" — explain the critical difference (withdrawal doesn't go on record, denial does)
- Section: "What To Do After a Denial" — step-by-step: review the denial reason, gather additional evidence, consider a different TN category, consult an immigration lawyer, reapply
- Section: "Can You Reapply?" — yes, immediately at a different port of entry, or file I-129 with USCIS
- Section: "Expedited Removal Warning" — explain that border denials can trigger expedited removal bars
- Callout (type="danger"): "If denied at the border, do NOT argue. Ask to withdraw your application instead."
- Callout (type="tip"): Link to /border-interview for preparation tips
- Links to: /border-interview, /employer-letter, /eligibility, /fees

Existing components to use:
- ContentLayout from '@/components/layout/ContentLayout' — accepts title, description, lastUpdated, breadcrumbs, children
- Callout from '@/components/ui/Callout' — accepts type ("warning" | "tip" | "info" | "danger"), title, children
- JsonLd from '@/components/JsonLd' — accepts data: Record<string, unknown>
- Reveal from '@/components/ui/Reveal' — wraps content for scroll-triggered animation

Use the same styling patterns as existing pages (e.g., src/app/professions/page.tsx): section headings use h2 with "text-2xl font-bold text-fg mb-4", paragraphs use "text-fg-secondary", lists use "list-disc list-inside space-y-2 text-fg-secondary".

Add this page to the sitemap at src/app/sitemap.ts with priority 0.8. Add it to the staticRoutes array:
{ url: `${base}/denied`, lastModified, changeFrequency: 'monthly', priority: 0.8 }
````

---

#### Prompt — /border-interview page

````
Create src/app/border-interview/page.tsx for the TN visa website at /Users/lionel/builders/tnjobs/tn-visa-website.

This is the #1 anxiety point for TN applicants. Target keyword: "TN visa border interview 2026".

SERVER component with ContentLayout. Include:

- Metadata export: title "TN Visa Border Interview Guide", description about what to expect
- JSON-LD HowTo schema with interview preparation steps using the JsonLd component from '@/components/JsonLd'
- Section: "What to Expect" — arrival, primary inspection, secondary inspection, timeline (15 min to 2 hours)
- Section: "Common Questions Officers Ask" — list 10-15 actual questions: Why are you coming to the US? What will you be doing? How long? What's your education? Who is your employer? What's your salary? Will you return to Canada? Do you own property in Canada? Have you applied for a green card?
- Section: "How to Answer" — be concise, honest, confident. Don't volunteer extra information. Don't mention green card plans. Emphasize temporary intent.
- Section: "What to Bring" — organized document package with cover sheet, multiple copies
- Section: "What NOT to Do" — don't bring a one-way ticket, don't have moving boxes visible in your car, don't mention permanent plans, don't argue with the officer
- Section: "Land Border vs Airport Preclearance" — pros/cons of each. Airport is safer (can withdraw and stay in Canada).
- Section: "2026 Update" — enhanced vetting since Dec 2025, social media checks, longer wait times during DHS shutdown, book 2-3 extra hours
- Import and display airports from src/data/airports.json showing preclearance locations. The airports.json file contains an array of airport objects. Render them in a grid or list showing name and location.
- Callout (type="tip"): "Airport preclearance is recommended — if denied, you can withdraw and remain in Canada"
- Links to: /apply/port-of-entry, /documents, /denied, /employer-letter

Existing components to use:
- ContentLayout from '@/components/layout/ContentLayout' — accepts title, description, lastUpdated, breadcrumbs, children
- Callout from '@/components/ui/Callout' — accepts type ("warning" | "tip" | "info" | "danger"), title, children
- JsonLd from '@/components/JsonLd' — accepts data: Record<string, unknown>
- Reveal from '@/components/ui/Reveal' — wraps content for scroll-triggered animation

Add this page to the sitemap at src/app/sitemap.ts with priority 0.8:
{ url: `${base}/border-interview`, lastModified, changeFrequency: 'monthly', priority: 0.8 }
````

---

#### Prompt — /employer-letter page

````
Create src/app/employer-letter/page.tsx for the TN visa website at /Users/lionel/builders/tnjobs/tn-visa-website.

Target keyword: "TN visa employer letter template 2026". TNVisaExpert charges $50 per sample letter — this page provides the guidance for free.

SERVER component with ContentLayout. Include:

- Metadata export: title "TN Visa Employer Support Letter Guide & Template"
- Section: "Why the Support Letter Matters" — it's the #1 reason for denials. The letter IS your application.
- Section: "Required Elements" — checklist of everything the letter MUST contain:
  1. Company letterhead
  2. Date and CBP/USCIS address
  3. Applicant's full name and citizenship
  4. Specific TN profession category (must match USMCA list EXACTLY)
  5. Detailed job duties (minimum 5-7 bullet points)
  6. How duties relate to the TN profession
  7. Applicant's qualifications (degree, credentials, experience)
  8. Employment terms: start date, end date, salary, work location
  9. Temporary nature of the position
  10. Brief company description
  11. Signature of authorized company representative with title and contact info
- Section: "Sample Letter Structure" — show a template outline (NOT a filled-in letter, to avoid legal issues). Use a styled code block or card to display the template structure.
- Section: "Common Mistakes" — vague duties, wrong profession name, missing end date, no temporary language, too short
- Section: "Profession-Specific Tips" — brief tips for Engineer, CSA, Management Consultant, Accountant (link to their profession pages at /professions/[slug] for details)
- Section: "2026 Update" — stricter requirements since June 2025. "The old, vague support letters that used to work are now grounds for denial."
- Callout (type="danger"): "The job title in the letter must match a USMCA profession EXACTLY. 'Software Engineer' is NOT the same as 'Engineer'."
- Callout (type="tip"): "Have an immigration lawyer review your letter before applying — it's the single best investment you can make."
- Links to: /professions, /apply, /border-interview, /denied

Existing components to use:
- ContentLayout from '@/components/layout/ContentLayout' — accepts title, description, lastUpdated, breadcrumbs, children
- Callout from '@/components/ui/Callout' — accepts type ("warning" | "tip" | "info" | "danger"), title, children
- Checklist from '@/components/ui/Checklist' — if it fits the required elements section
- Reveal from '@/components/ui/Reveal' — wraps content for scroll-triggered animation

Add this page to the sitemap at src/app/sitemap.ts with priority 0.8:
{ url: `${base}/employer-letter`, lastModified, changeFrequency: 'monthly', priority: 0.8 }
````

---

#### Prompt — /self-employment page

````
Create src/app/self-employment/page.tsx for the TN visa website at /Users/lionel/builders/tnjobs/tn-visa-website.

Target: "TN visa self employment 2026". Explicitly banned as of June 2025 — everyone is asking.

SERVER component with ContentLayout. Include:

- Metadata export: title "TN Visa Self-Employment Rules (Banned Since 2025)"
- Section: "The Rule" — USCIS formally banned self-employment on TN visas effective June 2025. Only bona fide U.S.-based employers can sponsor.
- Section: "What Counts as Self-Employment" — sole/controlling shareholder of sponsoring company, independent contractor without genuine employer-employee relationship, foreign employer doing business in US
- Section: "Can I Work as a 1099 Contractor?" — gray area. Must have genuine employer-employee relationship. If the company controls what, when, and how you work, it may qualify. If you set your own hours and clients, it's self-employment.
- Section: "Alternatives for Entrepreneurs" — E-1 Treaty Trader, E-2 Treaty Investor, O-1 Extraordinary Ability, L-1 Intracompany Transfer. Brief description of each with eligibility notes.
- Section: "Can I Start a Side Business?" — No. Any business activity outside your TN employment violates your status.
- Callout (type="danger"): "Self-employment on a TN visa can result in visa revocation and bars to future entry."
- Links to: /eligibility, /apply, /employer-letter

Existing components to use:
- ContentLayout from '@/components/layout/ContentLayout' — accepts title, description, lastUpdated, breadcrumbs, children
- Callout from '@/components/ui/Callout' — accepts type ("warning" | "tip" | "info" | "danger"), title, children
- Reveal from '@/components/ui/Reveal' — wraps content for scroll-triggered animation

Add this page to the sitemap at src/app/sitemap.ts with priority 0.7:
{ url: `${base}/self-employment`, lastModified, changeFrequency: 'monthly', priority: 0.7 }
````

---

#### Prompt — /processing-times page

````
Create src/app/processing-times/page.tsx for the TN visa website at /Users/lionel/builders/tnjobs/tn-visa-website.

Target: "TN visa processing time 2026".

SERVER component with ContentLayout. Include:

- Metadata export: title "TN Visa Processing Times (2026)"
- Use the existing ComparisonTable component (from '@/components/ui/ComparisonTable') to show processing times. The component accepts headers: string[] and rows: { label: string; values: string[] }[]. Configure it with:
  - Headers: ["Method", "Processing Time", "Cost"]
  - Rows:
    - Port of Entry (Canadian): Same day (15 min - 2 hours) | $80 USD
    - Port of Entry (during DHS shutdown): Same day + 2-3 extra hours | $80 USD
    - I-129 USCIS (standard): 3-5 months | $510-$1,615
    - I-129 USCIS (premium): 15 business days | $2,965 + filing fee
    - Consular (Mexican): 2-8 weeks | Varies by consulate
- Section: "2026 Government Shutdown Impact" — DHS shutdown (70+ days as of April 2026) causing delays. Border processing continues but with longer waits. H-1B filings stalled.
- Section: "Premium Processing" — guarantees action in 15 business days. Costs $2,965 as of March 2026. Worth it for time-sensitive cases.
- Section: "Tips for Faster Processing" — apply at airport preclearance (faster than land border), avoid peak travel times, have documents perfectly organized
- Callout (type="info"): "TN border processing continues during the government shutdown — CBP treats inspections as essential."
- Links to: /apply, /fees, /border-interview

Existing components to use:
- ContentLayout from '@/components/layout/ContentLayout' — accepts title, description, lastUpdated, breadcrumbs, children
- ComparisonTable from '@/components/ui/ComparisonTable' — accepts headers: string[], rows: { label: string; values: string[] }[]
- Callout from '@/components/ui/Callout' — accepts type ("warning" | "tip" | "info" | "danger"), title, children
- Reveal from '@/components/ui/Reveal' — wraps content for scroll-triggered animation

Add this page to the sitemap at src/app/sitemap.ts with priority 0.8:
{ url: `${base}/processing-times`, lastModified, changeFrequency: 'weekly', priority: 0.8 }
````

---

#### Prompt — /faq page

````
Create src/app/faq/page.tsx for the TN visa website at /Users/lionel/builders/tnjobs/tn-visa-website.

Target: Featured snippets in Google for TN visa questions.

SERVER component with ContentLayout. Include:

- Metadata export: title "TN Visa FAQ — Frequently Asked Questions"
- JSON-LD FAQPage schema with ALL questions (this is critical for Google featured snippets) using the JsonLd component from '@/components/JsonLd'
- Create a simple FAQ accordion component inline or as a separate component. The ProfessionFinder component (src/components/tools/ProfessionFinder.tsx) uses an accordion pattern with ChevronDown/ChevronUp from lucide-react and clsx for toggling — follow the same pattern. If creating a separate component, put it at src/components/ui/FaqAccordion.tsx as a 'use client' component.
- Questions organized by category:

**Eligibility:**
- Who is eligible for a TN visa? (Canadian/Mexican citizens in 63 USMCA professions)
- Do I need a degree? (Most require bachelor's; 10 accept diploma + 3yr experience)
- Can I get a TN visa with a Computer Science degree? (Not under Engineer since June 2025; try Computer Systems Analyst)
- How many professions qualify? (63)
- Can I be self-employed? (No, explicitly banned since June 2025)

**Application:**
- How do I apply? (Port of entry or I-129 petition)
- How long does it take? (Same day at border; 3-5 months for I-129)
- How much does it cost? ($80 at border; $510-$1,615 for I-129)
- Can I apply during the government shutdown? (Yes, border processing continues)
- What documents do I need? (Link to /documents)

**Status & Renewal:**
- How long is a TN visa valid? (Up to 3 years)
- Can I renew indefinitely? (Yes, in 3-year increments)
- Can I change employers? (Yes, but need new TN application)
- Can I work remotely from Canada? (No, must work for US employer in the US)

**Green Card & Dual Intent:**
- Can I get a green card on a TN visa? (Yes, but no dual intent — careful planning needed)
- What is the 90-day rule? (Wait 90 days after entry before filing green card)
- Should I switch to H-1B first? (Common strategy for green card path)

**Taxes & Living:**
- Do I pay US taxes? (Yes, if you meet the Substantial Presence Test)
- Do I still file Canadian taxes? (Depends on residency status)
- Can my spouse work? (No, TD status does not allow employment)

Each answer should be 2-4 sentences, linking to the relevant detailed page (e.g., /eligibility, /apply, /fees, /documents, /renewal, /green-card, /taxes, /dependents, /self-employment, /professions).

Existing components to use:
- ContentLayout from '@/components/layout/ContentLayout' — accepts title, description, lastUpdated, breadcrumbs, children
- JsonLd from '@/components/JsonLd' — accepts data: Record<string, unknown>
- Reveal from '@/components/ui/Reveal' — wraps content for scroll-triggered animation
- Use clsx (already installed) for conditional class toggling
- Use lucide-react icons (already installed) for chevrons

Add this page to the sitemap at src/app/sitemap.ts with priority 0.9:
{ url: `${base}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.9 }
````

---

### 1.3 — Sitemap Update (All Phase 1 Pages)

After completing all pages above, ensure the sitemap at `src/app/sitemap.ts` includes every new route. Here is a consolidated prompt:

````
Update the sitemap at src/app/sitemap.ts in the TN visa website at /Users/lionel/builders/tnjobs/tn-visa-website.

The sitemap currently has staticRoutes and companyRoutes. Add two new route groups:

1. Phase 1 content pages — add these to the staticRoutes array:
   { url: `${base}/denied`, lastModified, changeFrequency: 'monthly', priority: 0.8 }
   { url: `${base}/border-interview`, lastModified, changeFrequency: 'monthly', priority: 0.8 }
   { url: `${base}/employer-letter`, lastModified, changeFrequency: 'monthly', priority: 0.8 }
   { url: `${base}/self-employment`, lastModified, changeFrequency: 'monthly', priority: 0.7 }
   { url: `${base}/processing-times`, lastModified, changeFrequency: 'weekly', priority: 0.8 }
   { url: `${base}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.9 }

2. Profession detail pages — import professions from '@/data/professions.json' and generate routes:
   const professionRoutes: MetadataRoute.Sitemap = professions.map(p => ({
     url: `${base}/professions/${p.slug}`,
     lastModified,
     changeFrequency: 'monthly' as const,
     priority: 0.7,
   }))

3. Return all routes: [...staticRoutes, ...professionRoutes, ...companyRoutes]

This requires that professions.json has been updated with slug fields (from task 1.1).
````

---

## PHASE 2: Interactive Tools & Engagement (Weeks 4-6)
*Goal: Build tools that no competitor has, creating the moat*

### 2.1 — AI-Powered TN Visa Assistant (Chatbot)

**Prompt:**
```
Build an AI-powered TN visa chatbot for the website at /Users/lionel/builders/tnjobs/tn-visa-website.

Tech stack: Vercel AI SDK + OpenAI + Supabase pgvector for RAG.

Step 1: Install dependencies:
npm install ai @ai-sdk/openai

Step 2: Enable pgvector in Supabase. Create a migration at supabase/migrations/add_embeddings.sql:
- Enable the vector extension
- Create a documents_embeddings table: id, content (text), embedding (vector(1536)), metadata (jsonb), created_at
- Create a similarity search function using cosine distance

Step 3: Create a content ingestion script at scripts/ingest-content.ts that:
- Reads the TN visa complete guide from ../tn-visa-guide/TN-VISA-COMPLETE-GUIDE.md
- Chunks it into ~500 token segments with overlap
- Generates embeddings using OpenAI text-embedding-3-small
- Stores chunks + embeddings in Supabase

Step 4: Create the chat API route at src/app/api/chat/route.ts:
- Accept user message
- Generate embedding for the query
- Search Supabase for top 5 most similar content chunks
- Send to OpenAI with system prompt: "You are a TN visa expert assistant for Canadian professionals. Answer questions using ONLY the provided context from the TN Visa Guide. If the context doesn't contain the answer, say so. Always recommend consulting an immigration lawyer for specific cases. Never provide legal advice. Cite the relevant section when possible."
- Stream the response using Vercel AI SDK

Step 5: Create the chat UI component at src/components/tools/ChatAssistant.tsx:
- 'use client' component
- Use the useChat hook from 'ai/react'
- Floating button in bottom-right corner (chat bubble icon)
- Expandable chat panel with message history
- Input field with send button
- Show "Powered by AI — Not legal advice" disclaimer
- Typing indicator while streaming
- Suggested starter questions: "Am I eligible for a TN visa?", "What documents do I need?", "Can I get a TN visa with a CS degree?"

Step 6: Add the ChatAssistant to the root layout (src/app/layout.tsx) so it appears on every page.

Step 7: Add OPENAI_API_KEY to .env.example.
```

### 2.2 — Employer Letter Template Builder

**Prompt:**
```
Build an interactive employer letter template builder for the TN visa website.

This is the #1 pain point for TN applicants. TNVisaExpert charges $50-$124 for static templates. We provide an interactive builder for free (basic) with a premium downloadable version.

Step 1: Create src/components/tools/LetterBuilder.tsx as a 'use client' component.

This is a multi-step wizard (similar to the existing EligibilityChecker pattern):

Step 1 of wizard: Select TN Profession
- Dropdown of all 63 professions from professions.json
- Show the exact USMCA profession name that must appear in the letter

Step 2: Company Information
- Company name, address, phone, website
- Signatory name, title, email
- Brief company description (1-2 sentences)

Step 3: Applicant Information
- Full legal name
- Citizenship (Canadian/Mexican)
- Degree and institution
- Years of relevant experience

Step 4: Position Details
- Job title (warn if it doesn't match the TN profession name)
- Start date, end date (must have an end date for temporary intent)
- Annual salary
- Work location (city, state)
- 5-7 job duties (text inputs, pre-populated with profession-specific suggestions from professions.json)

Step 5: Preview & Generate
- Show a formatted letter preview using all the entered information
- Structure: date, addressee (CBP or USCIS), RE line, body paragraphs (company intro, position offer, duties, qualifications, temporary nature, closing), signature block
- Include all required elements from the /employer-letter guide
- "Copy to Clipboard" button (free)
- "Download as Word Document" button (future premium feature — for now, just copy)

Step 2: Create the page at src/app/letter-builder/page.tsx:
- Server component wrapper with metadata
- Title: "TN Visa Employer Letter Builder"
- Brief intro explaining why the letter matters
- Embed the LetterBuilder component
- Callout: "This generates a template. Have your employer customize it and sign on company letterhead."
- Callout: "For complex cases, consider professional review" — link to TNVisaExpert (affiliate)
- Add to sitemap

IMPORTANT: Add a disclaimer: "This tool generates a template for informational purposes only. It is not legal advice. Have an immigration attorney review your letter before submitting."
```

### 2.3 — Email Capture & Newsletter System

**Prompt:**
````
Set up email capture and newsletter functionality for the TN visa website.

Tech: Resend (free tier: 100 emails/day) + Supabase for subscriber storage.

Step 1: Install Resend:
npm install resend

Step 2: Create a subscribers table in Supabase. Add to supabase/schema.sql:
```sql
create table public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  name text,
  interests text[] default '{}',
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);
alter table public.subscribers enable row level security;
create policy "Anyone can subscribe" on public.subscribers for insert with check (true);
```

Step 3: Create an API route at src/app/api/subscribe/route.ts:
- POST endpoint accepting { email, name?, interests? }
- Validate email format
- Insert into Supabase subscribers table
- Send welcome email via Resend with:
  - Subject: "Welcome to TN Visa Guide — Here's your free checklist"
  - Body: Brief welcome, link to downloadable PDF checklist, what to expect (policy alerts, tips)
- Return success/error response

Step 4: Create a reusable EmailCapture component at src/components/ui/EmailCapture.tsx:
- 'use client' component
- Props: { variant: 'inline' | 'banner' | 'modal', title?: string, description?: string }
- Email input + submit button
- Loading and success states
- Error handling

Step 5: Add email capture points throughout the site:
- Homepage: banner variant after the hero section — "Get notified when TN visa rules change"
- /changes page: inline variant — "Subscribe to policy alerts"
- /eligibility page: after the checker results — "Get your personalized checklist"
- Footer: inline variant — "Stay updated on TN visa news"

Step 6: Add RESEND_API_KEY to .env.example.

Step 7: Create a simple unsubscribe page at src/app/unsubscribe/page.tsx that accepts an email query param and updates the unsubscribed_at field.
````

### 2.4 — UX Improvements

**Prompt:**
```
Implement UX improvements across the TN visa website.

1. STICKY TABLE OF CONTENTS for long guide pages:

Create src/components/ui/TableOfContents.tsx:
- 'use client' component
- Props: { headings: { id: string, text: string, level: number }[] }
- Renders a sticky sidebar (hidden on mobile, visible on lg: screens)
- Highlights the currently visible section using IntersectionObserver
- Smooth scroll on click
- Add to these pages: /taxes, /moving, /green-card, /changes, /mistakes
- On these pages, add id attributes to all h2 elements and pass them to the TOC

2. BACK-TO-TOP BUTTON:

Create src/components/ui/BackToTop.tsx:
- 'use client' component
- Shows a floating button (bottom-right, above the chat button if it exists) when user scrolls past 500px
- Smooth scrolls to top on click
- Animated fade in/out
- Add to the root layout so it appears on all pages

3. LEGAL DISCLAIMER in footer:

Update src/components/layout/Footer.tsx to add:
- "Legal Disclaimer: This website provides general information about TN visas for educational purposes only. It is not legal advice and does not create an attorney-client relationship. Immigration laws change frequently. Consult a qualified immigration attorney for advice specific to your situation."
- "Sources: Information is based on USCIS Policy Manual, CBP guidelines, USMCA Chapter 16, and official government publications."

4. TRUST SIGNALS:

Update the homepage (src/app/page.tsx) to add a trust section:
- "Information sourced from official USCIS, CBP, and USMCA documents"
- "Updated for 2026 policy changes"
- "Used by 50,000+ Canadian professionals" (or whatever the actual number is)
- Links to official sources: uscis.gov, cbp.gov, ustr.gov
```

---

## PHASE 3: Monetization Foundation (Weeks 7-9)
*Goal: Start generating revenue without compromising trust*

### 3.1 — Affiliate Integration

**Prompt:**
```
Integrate affiliate partnerships into the TN visa website. These should feel natural and helpful, not salesy.

1. TNVisaExpert Affiliate (20% commission, 60-day cookie, via eAffiliatez.com):

Add contextual affiliate links on these pages:
- /employer-letter — "For complex cases, consider professional letter review" → link to TNVisaExpert Platinum Kit ($124) or full service ($1,800)
- /denied — "After a denial, professional help significantly improves your chances" → link to TNVisaExpert assessment ($850)
- /border-interview — "Want professional interview preparation?" → link to TNVisaExpert Border Interview Kit ($54)
- /letter-builder — after generating the template: "Want a lawyer to review your letter?" → link to TNVisaExpert Lawyer Review ($299+$124)
- Profession pages with juneUpdate — "Given the 2025 policy changes, professional guidance is recommended" → link to TNVisaExpert

Create a reusable AffiliateLink component at src/components/ui/AffiliateLink.tsx:
- Props: { href: string, children: ReactNode, provider: 'tnvisaexpert' | 'wes' | 'wise' }
- Adds rel="nofollow sponsored" and target="_blank"
- Tracks clicks (optional: log to Supabase analytics table)
- Renders with a subtle "Partner" badge

Add an affiliate disclosure to the footer: "Some links on this site are affiliate links. We may earn a commission at no extra cost to you. We only recommend services we believe in. See our full disclosure."

Create src/app/disclosure/page.tsx with a full affiliate disclosure page.

2. WES Affiliate (10% commission, 30-day cookie, via CJ Affiliate):

Add contextual links on:
- /documents — "Need a credential evaluation? WES is the most widely accepted service" → WES affiliate link
- /professions/[slug] pages that mention credential evaluation → WES link
- /eligibility — after results showing credential requirements → WES link

3. Wise Affiliate (up to £50/referral, lifetime cookie, via Partnerize):

Add contextual links on:
- /taxes — "Need to transfer money between Canada and the US? Wise offers the best exchange rates" → Wise affiliate link
- /moving — "Set up a Wise multi-currency account before you move" → Wise link
- Future newsletter emails about financial tips

IMPORTANT: Every page with affiliate links must have a small disclosure at the top: "This page contains affiliate links. See our disclosure."
```

### 3.2 — Digital Products (Interview Kit & Letter Templates)

**Prompt:**
```
Create a digital products system for the TN visa website.

Phase 1: Create the products (downloadable PDFs). These will be created as static assets initially.

Product 1: TN Visa Border Interview Kit ($49)
- Create a comprehensive PDF guide covering:
  - 30+ common CBP officer questions with ideal answers
  - Profession-specific question sets for top 10 professions
  - What to say and what NOT to say
  - Body language and behavior tips
  - Document organization checklist
  - Airport vs land border comparison
  - 2026 enhanced vetting preparation
  - Emergency scenarios (what if denied, what if sent to secondary)

Product 2: Employer Letter Template Pack ($29)
- Word document templates for the top 10 TN professions:
  - Engineer, Computer Systems Analyst, Management Consultant, Accountant, Economist, Graphic Designer, Pharmacist, Registered Nurse, Architect, Scientific Technician
- Each template includes: pre-written duty descriptions, qualification language, temporary intent language
- Customization guide explaining what to change

Product 3: Complete TN Visa Application Guide ($69)
- Bundle of Interview Kit + Letter Templates + additional content:
  - Step-by-step application walkthrough
  - Document preparation checklist
  - Post-approval guide (SSN, banking, taxes)
  - Renewal preparation guide

Phase 2: Create the purchase flow.

For MVP, use Stripe Checkout (simplest approach):

Step 1: Install Stripe:
npm install stripe @stripe/stripe-js

Step 2: Create API routes:
- src/app/api/checkout/route.ts — creates a Stripe Checkout session for the selected product
- src/app/api/webhook/route.ts — handles Stripe webhook for successful payments, sends download link via Resend

Step 3: Create a products page at src/app/products/page.tsx:
- Display the 3 products with pricing, descriptions, and "Buy Now" buttons
- Each button calls the checkout API route
- After successful payment, redirect to a /products/success page with download links

Step 4: Create src/app/products/success/page.tsx:
- Thank you message
- Download links (time-limited signed URLs from Supabase Storage)
- Email confirmation sent via Resend

Add STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.example.
```

### 3.3 — Analytics & Tracking

**Prompt:**
```
Set up privacy-friendly analytics for the TN visa website.

Option A (Recommended): Plausible Analytics (privacy-friendly, no cookies, GDPR compliant)
- Add the Plausible script to src/app/layout.tsx
- Track: page views, referrers, countries, devices
- Set up custom events for: eligibility checker completion, fee calculator usage, letter builder usage, affiliate link clicks, email signups, product purchases

Option B (Free alternative): Umami Analytics (self-hosted on Vercel/Railway)
- Similar to Plausible but free and self-hosted

Step 1: Add the analytics script to the root layout <head>.

Step 2: Create a useAnalytics hook at src/hooks/useAnalytics.ts:
- Exports a trackEvent(name: string, props?: Record<string, string>) function
- Calls the Plausible/Umami event API
- Used in interactive components to track tool usage

Step 3: Add tracking to key components:
- EligibilityChecker: track 'eligibility_check_complete' with result (eligible/not eligible)
- FeeCalculator: track 'fee_calculation' with method (poe/i129)
- LetterBuilder: track 'letter_generated' with profession
- EmailCapture: track 'email_signup' with location (homepage/footer/etc)
- AffiliateLink: track 'affiliate_click' with provider and destination
- ChatAssistant: track 'chat_message' (just count, not content)
```

---

## PHASE 4: Platform Features (Weeks 10-14)
*Goal: Build features that create user retention and recurring engagement*

### 4.1 — TN Visa Status Tracker & Renewal Reminders

**Prompt:**
```
Build a TN visa status tracker with renewal reminders for the website.

This gives users a reason to create an account and return regularly.

Step 1: Add a tn_status table to supabase/schema.sql:
```sql
create table public.tn_status (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  profession text not null,
  employer text not null,
  start_date date not null,
  end_date date not null,
  application_method text check (application_method in ('poe_land', 'poe_airport', 'i129', 'consular')),
  port_of_entry text,
  status text check (status in ('active', 'expired', 'pending_renewal')) default 'active',
  notes text,
  created_at timestamptz default now()
);
alter table public.tn_status enable row level security;
create policy "Users can manage own status" on public.tn_status for all using (auth.uid() = user_id);
create index idx_tn_status_user_id on public.tn_status(user_id);
```

Step 2: Create src/app/(platform)/status/page.tsx:
- Shows the user's current TN status with a visual timeline
- Countdown to expiration date
- Color-coded status: green (>6 months), yellow (3-6 months), red (<3 months)
- "Add TN Status" form for new users
- "Start Renewal" button that links to /renewal with pre-filled info
- History of previous TN statuses

Step 3: Create a renewal reminder system:
- Supabase Edge Function (or cron job) that runs daily
- Checks tn_status table for entries expiring in 90, 60, or 30 days
- Sends reminder emails via Resend:
  - 90 days: "Your TN visa expires in 3 months — start preparing for renewal"
  - 60 days: "2 months until expiration — here's your renewal checklist"
  - 30 days: "Urgent: Your TN visa expires in 30 days"
- Each email links to /renewal with relevant guidance

Step 4: Add the status tracker to the dashboard page as a prominent card.
```
### 4.2 — Community Experience Database

**Prompt:**
```
Build a community experience database where TN visa holders share their application experiences.

This creates unique, user-generated content that improves SEO and helps future applicants.

Step 1: Add an experiences table to supabase/schema.sql:
```sql
create table public.experiences (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  profession text not null,
  application_method text check (application_method in ('poe_land', 'poe_airport', 'i129', 'consular')) not null,
  port_of_entry text,
  outcome text check (outcome in ('approved', 'denied', 'withdrawn', 'rfe')) not null,
  date date not null,
  wait_time_minutes integer,
  questions_asked text[],
  tips text,
  story text,
  is_anonymous boolean default false,
  created_at timestamptz default now()
);
alter table public.experiences enable row level security;
create policy "Experiences are viewable by everyone" on public.experiences for select using (true);
create policy "Authenticated users can submit" on public.experiences for insert with check (auth.uid() = user_id);
create index idx_experiences_profession on public.experiences(profession);
create index idx_experiences_outcome on public.experiences(outcome);
```

Step 2: Create src/app/experiences/page.tsx (public, server component):
- Filterable list of experiences
- Filter by: profession, application method, outcome, port of entry
- Each experience shows: profession, method, outcome (color-coded), date, wait time, story excerpt
- Click to expand full story
- "Share Your Experience" CTA button (requires login)

Step 3: Create src/app/experiences/submit/page.tsx (authenticated):
- Multi-step form: profession, method, port of entry, outcome, date, wait time, questions asked, tips, full story
- Option to submit anonymously
- Moderation: new submissions go to a review queue (add is_approved boolean field)

Step 4: Display experience stats on relevant pages:
- /border-interview — "Based on 47 community reports, average wait time at YYZ is 25 minutes"
- /professions/[slug] — "12 community members have been approved as Engineers in 2026"
- /apply/port-of-entry — port-of-entry specific stats
```

### 4.3 — PWA (Progressive Web App)

**Prompt:**
```
Convert the TN visa website into a Progressive Web App for offline access.

This is especially valuable for people heading to the border who need their checklist and interview tips offline.

Step 1: Install next-pwa:
npm install next-pwa

Step 2: Update next.config.mjs to wrap with withPWA:
```javascript
import withPWA from 'next-pwa'

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})({
  // existing config...
})
```

Step 3: Create public/manifest.json:
- name: "TN Visa Guide"
- short_name: "TN Guide"
- theme_color matching the site's accent color
- Icons at 192x192 and 512x512
- start_url: "/"
- display: "standalone"

Step 4: Add manifest link to the root layout <head>.

Step 5: Configure caching strategy:
- Cache these pages for offline access: /documents, /border-interview, /employer-letter, /faq, /professions
- Cache the professions.json and fees.json data files
- Network-first for dynamic pages (dashboard, companies)

Step 6: Add an "Install App" prompt component that shows on mobile devices.
```

---

## PHASE 5: Job Board & Employer Tools (Weeks 15-20)
*Goal: Build the revenue engine and create network effects*

### 5.1 — TN Visa Job Board

**Prompt:**
```
Build a TN visa-specific job board for the website. No competitor has this — it's a unique differentiator.

The key insight: Indeed shows 1,000+ "TN visa sponsorship" jobs but they're mixed with "no sponsorship" listings. A dedicated board where EVERY job is TN-eligible is genuinely useful.

Step 1: Create the jobs schema in supabase/schema.sql:
```sql
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  company_id uuid references public.companies(id) on delete cascade,
  title text not null,
  tn_profession text not null,
  description text not null,
  requirements text[],
  salary_min integer,
  salary_max integer,
  location text not null,
  remote_policy text check (remote_policy in ('onsite', 'hybrid', 'remote')) default 'onsite',
  employment_type text check (employment_type in ('full_time', 'contract')) default 'full_time',
  application_url text not null,
  is_featured boolean default false,
  is_active boolean default true,
  posted_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '30 days')
);
alter table public.jobs enable row level security;
create policy "Jobs are viewable by everyone" on public.jobs for select using (is_active = true);
create policy "Company owners can manage jobs" on public.jobs for all using (
  exists (select 1 from public.companies where companies.id = jobs.company_id and companies.user_id = auth.uid())
);
create index idx_jobs_profession on public.jobs(tn_profession);
create index idx_jobs_active on public.jobs(is_active, posted_at desc);
```

Step 2: Create the public job board at src/app/jobs/page.tsx:
- Server component that fetches active jobs from Supabase
- Filters: profession (dropdown of 63), location (text search), remote policy, salary range
- Each job card shows: title, company name, profession tag, location, salary range, posted date
- Click through to src/app/jobs/[id]/page.tsx with full details + "Apply" button (links to application_url)
- Featured jobs (is_featured=true) appear at the top with a highlight
- Empty state: "No jobs posted yet. Know a TN-friendly employer? Tell them about us."

Step 3: Create the employer job posting flow at src/app/(platform)/post-job/page.tsx:
- Requires authentication
- Must be linked to a company (redirect to /companies/add if no company)
- Form: title, TN profession (dropdown), description, requirements, salary range, location, remote policy, application URL
- Preview before posting
- Submit creates the job in Supabase

Step 4: Pricing model (implement later, start free):
- Free tier: 1 active job posting per company
- Standard: $99/month for 5 active postings
- Premium: $299/month for unlimited + featured placement
- For now, all postings are free to build initial supply

Step 5: Add /jobs to the main navigation and sitemap.

Step 6: Cross-link jobs with profession pages:
- On /professions/[slug], show "X jobs available for [Profession]" with links to filtered job board
- On company detail pages, show their active job listings
```

### 5.2 — Employer Portal

**Prompt:**
```
Build an employer-facing portal for the TN visa website.

Target audience: HR departments and recruiters at US companies who hire Canadian professionals.

Step 1: Create src/app/(platform)/employer/page.tsx as the employer dashboard:
- Shows: company profile, active job listings, applicant views (future), TN sponsorship guide
- Quick actions: post a job, edit company profile, view analytics

Step 2: Create an employer onboarding flow:
- When a user signs up with role='company' in the existing onboarding, redirect to employer-specific setup
- Collect: company name, industry, size, location, which TN professions they hire for, careers URL
- This data populates the companies table (already exists)

Step 3: Create an employer TN sponsorship guide at src/app/employer-guide/page.tsx:
- Redirect from the existing /employers page or merge content
- Step-by-step guide for HR departments unfamiliar with TN
- How to write a support letter (link to /employer-letter)
- Government fees breakdown (link to /fees)
- Processing timeline expectations
- Compliance requirements
- CTA: "Post a TN-eligible job" linking to the job board

Step 4: Add employer-specific email templates:
- Welcome email for new employer accounts
- Monthly digest: "X candidates viewed your company profile this month"
```

### 5.3 — Timely Content: USMCA Review & Government Shutdown

**Prompt:**
```
Create timely content pages that capture current high-traffic searches.

1. Create src/app/usmca-review/page.tsx:
- Title: "USMCA 2026 Review: What It Means for TN Visa Holders"
- The mandatory joint review deadline is July 1, 2026 — 2 months away
- Cover the 4 possible outcomes:
  a) Trump pulls out entirely — TN visas could end
  b) Straightforward renewal — TN continues unchanged
  c) Contentious renegotiation — immigration chapter could be targeted
  d) No consensus, agreement continues to 2036 — ongoing uncertainty
- Key stats: ~50,000 Canadians on TN, only 2,800 Americans on CUSMA permits in Canada
- What TN holders should do NOW: consider green card path, document everything, have a backup plan
- Callout: "The immigration chapter has never been a primary focus of trade negotiations — the most likely outcome is continuation with minor changes."
- Email capture: "Get notified when the USMCA review outcome is announced"
- Add to sitemap with priority 0.9 and changeFrequency 'weekly'

2. Create src/app/government-shutdown/page.tsx:
- Title: "TN Visa During the 2026 Government Shutdown"
- DHS shutdown has been 70+ days as of April 2026
- Key facts: TN border processing CONTINUES (CBP treats inspections as essential)
- USCIS remains open for fee-funded filings
- H-1B filings stalled — making TN more attractive
- Expect longer wait times and enhanced vetting
- Tips: book 2-3 extra hours, have all documents perfectly organized
- Callout (info): "TN visa applications at the border are NOT affected by the shutdown. CBP continues processing."
- Add to sitemap

3. Update src/app/changes/page.tsx to include:
- Billy Bishop Toronto pre-clearance (March 2026)
- DHS Vetting Center (December 2025) — social media checks expanded
- Mexican in-person interview requirement (September 2025)
- Premium processing fee increase to $2,965 (March 2026)
- I-94 fee increase to $30 (September 2025)
- Link to /usmca-review and /government-shutdown
```

---

## PHASE 6: Scale & Optimize (Weeks 21+)
*Goal: Optimize for growth, expand content, and maximize revenue*

### 6.1 — Content Expansion

**Prompt:**
```
Expand the TN visa website content to capture more long-tail search traffic.

1. BLOG SECTION:
Create src/app/blog/page.tsx and src/app/blog/[slug]/page.tsx.

Use MDX for blog posts. Install @next/mdx and configure in next.config.mjs.

Priority blog posts to write (each targeting a specific high-volume keyword):

a) "Can You Get a TN Visa with a Computer Science Degree in 2026?"
   - Target: "TN visa computer science degree 2026" (highest urgency keyword)
   - Cover: the June 2025 change, what CS grads should do now, CSA alternative, engineering degree requirements

b) "TN Visa vs H-1B in 2026: Complete Comparison After the $100K Fee"
   - Target: "TN visa vs H1B 2026"
   - Cover: no cap vs lottery, cost comparison, dual intent, green card paths, which is better for Canadians

c) "What Happens to Your TN Visa if USMCA Ends?"
   - Target: "USMCA review TN visa 2026"
   - Cover: 4 scenarios, what to do now, backup plans

d) "TN Visa Remote Work Rules: Can You Work from Canada?"
   - Target: "TN visa remote work 2026"
   - Cover: must work for US employer, cross-border tax implications, what's allowed

e) "Moving to the US from Canada: Complete 2026 Financial Guide"
   - Target: "Canadian moving to US 2026"
   - Cover: banking, credit, taxes, insurance, with Wise affiliate integration

f) "TN Visa for Mexican Professionals: 2026 Complete Guide"
   - Target: "TN visa Mexico 2026"
   - Cover: consular process, DS-160, in-person interview requirement, higher denial rates

2. GLOSSARY:
Create src/app/glossary/page.tsx with immigration terms.
Create src/data/glossary.json with terms like: USMCA, CBP, USCIS, I-94, I-129, I-907, TN, TD, RFE, PERM, EB-2, EB-3, NIW, dual intent, substantial presence test, etc.
Each term: { term, definition, relatedPages[] }
Use JSON-LD DefinedTermSet schema for SEO.

3. COMPARISON PAGES:
Expand /compare to cover more visa comparisons:
- /compare/tn-vs-h1b (existing, update with $100K fee info)
- /compare/tn-vs-o1 (for exceptional ability)
- /compare/tn-vs-l1 (for intracompany transfers)
- /compare/tn-vs-e2 (for entrepreneurs/investors)
```

### 6.2 — SEO Optimization

**Prompt:**
```
Optimize the TN visa website for maximum organic search performance.

1. INTERNAL LINKING:
Create a script or manual process to ensure every page links to 3-5 related pages.
Key link relationships:
- Every profession page → /eligibility, /apply, /employer-letter, /fees
- /eligibility → /professions, /professions/[top-5-slugs]
- /apply → /border-interview, /documents, /fees, /processing-times
- /denied → /border-interview, /employer-letter, /eligibility
- /taxes → /moving, Wise affiliate
- /green-card → /compare, /renewal
- /faq → every relevant detailed page
- Blog posts → relevant tool pages and profession pages

2. SCHEMA MARKUP:
Add JSON-LD to all remaining pages that don't have it:
- /professions/[slug] → FAQPage schema (already in Phase 1 prompt)
- /faq → FAQPage schema (already in Phase 1 prompt)
- /border-interview → HowTo schema
- /employer-letter → HowTo schema
- /denied → FAQPage schema
- /blog/[slug] → Article schema with author, datePublished, dateModified
- /glossary → DefinedTermSet schema
- All pages → BreadcrumbList schema (add to ContentLayout component)

3. PERFORMANCE:
- Run Lighthouse audit and fix any issues
- Ensure all images use next/image with proper sizing
- Verify Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Add preconnect hints for Supabase and font domains
- Consider ISR (Incremental Static Regeneration) for dynamic pages like /companies and /jobs

4. YEAR-BASED FRESHNESS:
- Add a script or component that automatically updates "2026" references in titles and content
- Ensure sitemap lastModified dates are updated when content changes
- Add "Last updated: [date]" to all content pages (already done via ContentLayout)
```

### 6.3 — Revenue Optimization

**Prompt:**
```
Optimize revenue streams for the TN visa website.

1. A/B TEST AFFILIATE PLACEMENTS:
- Test different CTA copy for TNVisaExpert links
- Test placement: inline vs sidebar vs end-of-article
- Track conversion rates per placement using analytics events

2. EMAIL MONETIZATION:
- Welcome sequence (5 emails over 2 weeks):
  Email 1: Welcome + free checklist PDF
  Email 2: "Are you eligible?" → link to eligibility checker
  Email 3: "The #1 mistake that gets TN visas denied" → link to /employer-letter
  Email 4: "Calculate your costs" → link to /fees + Wise affiliate
  Email 5: "Ready to apply?" → link to /apply + TNVisaExpert affiliate for professional help
- Monthly newsletter: policy updates, new blog posts, job board highlights
- Renewal reminder sequence: 90/60/30 day emails with relevant affiliate links

3. DISPLAY ADS (only after 50K+ monthly visitors):
- Apply to Mediavine (requires 50K sessions/month) or AdThrive (100K+)
- Place ads on informational pages only (NOT on tools or product pages)
- Estimated RPM: $15-30 for immigration niche
- At 50K visitors: $750-1,500/month from ads alone

4. PREMIUM FEATURES (subscription model):
- $9.99/month or $79/year
- Includes: AI chatbot unlimited usage, letter builder Word export, renewal reminders, priority support
- Free tier: limited chatbot messages, letter builder copy-only, basic tools
```

---

## IMPLEMENTATION PRIORITY SUMMARY

| Phase | Timeline | Key Deliverables | Revenue Impact |
|-------|----------|-----------------|----------------|
| **Phase 1** | Weeks 1-3 | 63 profession pages, 6 content pages, FAQ | SEO traffic foundation |
| **Phase 2** | Weeks 4-6 | AI chatbot, letter builder, email capture, UX | Engagement + email list |
| **Phase 3** | Weeks 7-9 | Affiliates, digital products, analytics | First revenue ($1-3K/mo) |
| **Phase 4** | Weeks 10-14 | Status tracker, community, PWA | User retention |
| **Phase 5** | Weeks 15-20 | Job board, employer portal, timely content | Revenue growth ($3-10K/mo) |
| **Phase 6** | Weeks 21+ | Blog, SEO optimization, revenue optimization | Scale ($10-25K/mo) |

## KEY METRICS TO TRACK

| Metric | Phase 1 Target | Phase 3 Target | Phase 6 Target |
|--------|---------------|---------------|----------------|
| Monthly visitors | 1,000 | 10,000 | 50,000 |
| Email subscribers | 100 | 1,000 | 10,000 |
| Monthly revenue | $0 | $1,000-3,500 | $6,000-25,000 |
| Test coverage | 41 tests | 60+ tests | 80+ tests |
| Lighthouse score | 90+ | 95+ | 95+ |
| Pages indexed | 31 | 100+ | 200+ |

## COMPETITIVE MOAT

What makes this defensible over time:
1. **63 profession pages** — massive long-tail SEO surface area no competitor has
2. **Free interactive tools** — eligibility checker, fee calculator, letter builder, profession finder
3. **AI chatbot** trained on the most comprehensive TN visa guide available
4. **Community data** — crowdsourced border experiences create unique, ungameable content
5. **Job board** — network effects (more jobs → more candidates → more employers)
6. **Email list** — direct relationship with audience, not dependent on Google rankings
7. **.ca domain** — natural trust signal for the Canadian target audience

## AFFILIATE PROGRAM DETAILS

| Program | Commission | Cookie | Network | Sign Up |
|---------|-----------|--------|---------|--------|
| TNVisaExpert | 20% ($360-560/sale) | 60 days | eAffiliatez.com | Contact via site |
| WES | 10% (~$20/eval) | 30 days | CJ Affiliate | affiliates@wes.org |
| Wise | Up to £50/referral | Lifetime | Partnerize | wise.com/affiliate-program |

## TECH STACK ADDITIONS BY PHASE

| Phase | New Dependencies |
|-------|------------------|
| Phase 1 | None (content only) |
| Phase 2 | `ai`, `@ai-sdk/openai`, `resend` |
| Phase 3 | `stripe`, `@stripe/stripe-js` |
| Phase 4 | `next-pwa` |
| Phase 5 | None (uses existing stack) |
| Phase 6 | `@next/mdx` |