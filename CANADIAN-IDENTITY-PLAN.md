# CANADIAN IDENTITY — Implementation Plan

Make tnvisaguide.ca feel authentically Canadian-to-US. Every change reinforces: "This was built by Canadians, for Canadians."

---

## PHASE 1: Visual & Branding (30 min)

### 1.1 — Add Canadian Red Accent Color

**Prompt:**

Using as many agents as you need (even up to 8 in parallel) go ahead and implement this:

```
Update the design system at /Users/lionel/builders/tnjobs/tn-visa-website to add a Canadian red accent as a secondary color.

1. Update src/app/globals.css — add a --canadian-red CSS variable to both light and dark themes:
   Light: --canadian-red: 0 75% 45% (muted maple red, not fire-truck red)
   Dark: --canadian-red: 0 65% 55%

2. Update tailwind.config.ts — add 'canadian': 'hsl(var(--canadian-red))' to the colors section.

3. Use the Canadian red sparingly for:
   - The 🍁 emoji in the nav logo (wrap it in a span with text-canadian)
   - The "Updated for 2026" badge on the homepage
   - The "Partner" badge on affiliate links
   - Border-left on danger callouts (already red, but use canadian-red specifically)

Don't overdo it — the primary accent (indigo) stays. Canadian red is a secondary highlight.
```

### 1.2 — Update Branding & Tagline

**Prompt:**
```
Using as many agents as you need (even up to 8 in parallel) go ahead and implement this: Update the site branding at /Users/lionel/builders/tnjobs/tn-visa-website.

1. Update the Nav logo. In src/components/layout/Nav.tsx, change:
   "🍁 TN Guide"
   to:
   "🍁 TN Visa Guide"
   And add a tagline below on desktop. Change the Link to:
   <Link href="/" className="flex flex-col">
     <span className="font-bold text-lg gradient-text">🍁 TN Visa Guide</span>
     <span className="text-[10px] text-fg-muted hidden sm:block">For Canadian Professionals</span>
   </Link>

2. Update the homepage hero. In src/app/page.tsx, change the badge text from:
   "✨ Updated for 2026 USMCA changes"
   to:
   "🍁 The #1 TN Visa Resource for Canadians"

3. Update the root layout metadata description to include "Canadian":
   "The definitive guide for Canadian professionals seeking TN visa status in the United States under USMCA."
   (This is likely already correct — verify.)

4. Update the footer. Add "Built in Canada 🍁" next to the copyright line.
```

### 1.3 — CAD Pricing Display

**Prompt:**
```
Using as many agents as you need (even up to 8 in parallel) go ahead and implement this: Add CAD equivalent pricing throughout the TN visa website.

1. Create src/lib/currency.ts:
   export const USD_TO_CAD = 1.38 // Update periodically
   export function formatCAD(usd: number): string {
     return `~$${Math.round(usd * USD_TO_CAD).toLocaleString()} CAD`
   }

2. Update the FeeCalculator (src/components/tools/FeeCalculator.tsx):
   - Import formatCAD
   - After the USD total display, add a line showing the CAD equivalent:
     <p className="text-sm text-fg-muted text-right">{formatCAD(total)}</p>

3. Update the fees page (src/app/fees/page.tsx):
   - Add a note at the top: "All fees shown in USD. Approximate CAD equivalents shown where applicable."
   - After each major fee table, add a small CAD note

4. Update the processing-times page ComparisonTable:
   - Add CAD equivalents in the Cost column: "$80 (~$110 CAD)"

Don't add CAD to every single number — just the key totals and the calculator output.
```

---

## PHASE 2: Canadian Content & Tone (45 min)

### 2.1 — Canadian Credential Mapping

**Prompt:**
```
Using as many agents as you need (even up to 8 in parallel) go ahead and implement this: Add Canadian credential mapping content to the TN visa website.

1. Create src/app/credentials/page.tsx — a new page: "Canadian Credentials & TN Visa Equivalencies"
   - Title: "Canadian Credentials for TN Visa Applications"
   - Target keyword: "Canadian degree TN visa"
   - Sections:
     a) "Canadian Degrees" — Bachelor's, Master's, Doctorate from Canadian universities are directly accepted. No evaluation needed for most professions.
     b) "Professional Designations" — mapping table:
        | Canadian | US Equivalent | TN Professions |
        | CPA (CPA Canada) | CPA | Accountant |
        | P.Eng (PEO, APEGA, etc.) | PE | Engineer |
        | RN (CNO, CRNBC, etc.) | RN (state license needed) | Registered Nurse |
        | CA (legacy) | CPA | Accountant |
        | CGA (legacy) | CPA | Accountant |
        | CMA (legacy) | CMA/CPA | Accountant |
        | P.Pharm | RPh | Pharmacist |
        | OAQ (Ordre des architectes) | AIA/state license | Architect |
     c) "When You Need a Credential Evaluation" — WES evaluation needed for: degrees from non-Canadian/US institutions, some regulated professions, when CBP officer requests it
     d) "Province-Specific Notes" — Quebec degrees (French-language), Ontario P.Eng (PEO), BC nursing (CRNBC)
   - Link to /professions, /documents, /eligibility
   - Add WES affiliate link where relevant
   - Add to sitemap

2. Update the top 5 profession detail pages to reference Canadian credentials:
   - /professions/accountant — mention CPA Canada, CA, CGA, CMA mapping
   - /professions/engineer — mention P.Eng from provincial associations
   - /professions/registered-nurse — mention CNO, CRNBC, CGFNS requirement
   - /professions/pharmacist — mention PEBC, provincial pharmacy licenses
   - /professions/architect — mention OAQ, OAA, AIBC

   For each, add a "Canadian Credentials" subsection in the profession page. Since profession pages are generated from professions.json, add a new field to the top 5 professions:
   "canadianCredentials": string[] — e.g., ["CPA Canada (formerly CA, CGA, CMA)", "Provincial CPA designation accepted"]

   Then update src/app/professions/[slug]/page.tsx to render this field if present.
```

### 2.2 — Canadian Border Crossings

**Prompt:**
```
Using as many agents as you need (even up to 8 in parallel) go ahead and implement this: Add named Canadian border crossings to the TN visa website.

1. Create src/data/border-crossings.json:
   [
     { "name": "Peace Bridge", "location": "Fort Erie, ON → Buffalo, NY", "province": "Ontario", "notes": "Highest TN volume land crossing. Very experienced officers.", "recommended": true },
     { "name": "Rainbow Bridge", "location": "Niagara Falls, ON → Niagara Falls, NY", "province": "Ontario", "notes": "Less busy than Peace Bridge. Good alternative.", "recommended": false },
     { "name": "Thousand Islands Bridge", "location": "Lansdowne, ON → Alexandria Bay, NY", "province": "Ontario", "notes": "Quieter crossing. Less experienced with TN.", "recommended": false },
     { "name": "Ambassador Bridge", "location": "Windsor, ON → Detroit, MI", "province": "Ontario", "notes": "Busy commercial crossing. TN processing available.", "recommended": false },
     { "name": "Pacific Highway", "location": "Surrey, BC → Blaine, WA", "province": "British Columbia", "notes": "Main BC crossing. Experienced with TN.", "recommended": true },
     { "name": "Douglas (Peace Arch)", "location": "Surrey, BC → Blaine, WA", "province": "British Columbia", "notes": "Adjacent to Pacific Highway. NEXUS lane available.", "recommended": false },
     { "name": "Lacolle", "location": "Saint-Bernard-de-Lacolle, QC → Champlain, NY", "province": "Quebec", "notes": "Main Quebec land crossing.", "recommended": false },
     { "name": "Emerson", "location": "Emerson, MB → Pembina, ND", "province": "Manitoba", "notes": "Main Manitoba crossing.", "recommended": false }
   ]

2. Update src/app/border-interview/page.tsx:
   - Import border-crossings.json
   - Add a "Land Border Crossings" section AFTER the airport preclearance section
   - Render the crossings in a grid similar to the airports grid
   - Group by province

3. Update src/app/apply/port-of-entry/page.tsx:
   - Import and display the border crossings data
   - Add province-specific tips: "If you're in Ontario, Peace Bridge (Fort Erie) has the most TN experience. If you're in BC, use Pacific Highway (Surrey)."
```

### 2.3 — Canadian Tax Content

**Prompt:**
```
Using as many agents as you need (even up to 8 in parallel) go ahead and implement this: Enhance the Canadian tax content on the TN visa website.

1. Update src/app/taxes/page.tsx to add Canadian-specific sections:

   Add BEFORE the "States With No Income Tax" section:

   a) Section: "Canadian Tax Obligations"
      - "Departure Tax" — when you leave Canada, CRA may consider you to have disposed of certain assets (deemed disposition). File T1161 and T1243.
      - "NR73 Form" — optional but recommended. CRA determines your residency status. File within 6 months of leaving.
      - "Severing Ties" — to become a non-resident: close Canadian bank accounts (or minimize), sell/rent your home, cancel provincial health insurance, update driver's license
      - "Keeping Ties" — if you maintain significant ties (spouse in Canada, home, bank accounts), CRA may still consider you a Canadian tax resident = worldwide income taxed by both countries

   b) Section: "RRSP & TFSA for TN Holders"
      - RRSP: growth is tax-deferred in the US under the Canada-US Tax Treaty. Do NOT contribute after becoming a US tax resident (no US tax deduction).
      - TFSA: NOT recognized by the IRS. Growth is taxable in the US. Consider closing before moving or accepting the US tax hit.
      - 401(k): US employer retirement plan. Contributions reduce US taxable income. Can be rolled into RRSP when returning to Canada (within limits).

   c) Section: "Cross-Border Tax Professionals"
      - Recommend using a cross-border tax specialist (not a regular accountant)
      - Common firms: MCA Cross Border Advisors, Cardinal Point, Andersen (formerly KPMG cross-border)
      - Typical cost: $1,500-3,000/year for dual filing

2. Add a Wise affiliate callout in the RRSP section:
   "Moving money between your Canadian and US accounts? [Wise] offers the best exchange rates."
```

### 2.4 — Canadian Spelling & Tone Pass

**Prompt:**
```
Using as many agents as you need (even up to 8 in parallel) go ahead and implement this: Do a Canadian English pass on key content pages at /Users/lionel/builders/tnjobs/tn-visa-website.

This is subtle but important — Canadians notice when content uses American spelling.

Rules:
- Use Canadian/British spelling in CONTENT TEXT (not code, not component names)
- "colour" not "color" (only in prose, not CSS)
- "centre" not "center" (only in prose, not CSS)  
- "programme" not "program" (only when referring to government programmes)
- "licence" not "license" (noun form — "driver's licence")
- "defence" not "defense"
- "honour" not "honor"
- "travelling" not "traveling"
- "favourite" not "favorite"
- "analyse" not "analyze"

IMPORTANT: Only change VISIBLE TEXT CONTENT. Do NOT change:
- CSS class names
- Component names
- Variable names
- HTML attributes
- Technical terms (e.g., "premium processing" stays as-is)

Pages to update (content-heavy pages only):
- src/app/moving/page.tsx — this page talks about driver's licences, banking, etc.
- src/app/taxes/page.tsx — references to programmes, centres
- src/app/border-interview/page.tsx — travelling, defence
- src/app/employer-letter/page.tsx — organisation, programme

Do a search-and-replace pass on these 4 files. Be conservative — only change clear cases where Canadian spelling applies.
```

---

## PHASE 3: Province-Specific Features (30 min)

### 3.1 — Province Selector on Key Pages

**Prompt:**
```
Using as many agents as you need (even up to 8 in parallel) go ahead and implement this: Add a province context selector to the border interview and port of entry pages.

1. Create src/components/ui/ProvinceSelector.tsx:
   'use client' component
   - A simple dropdown: "Where are you located?"
   - Options: Ontario, British Columbia, Quebec, Alberta, Manitoba, Saskatchewan, Other
   - Stores selection in localStorage
   - Returns the selected province

2. Update src/app/border-interview/page.tsx:
   - Add ProvinceSelector at the top
   - Based on selection, highlight the recommended airports and border crossings for that province:
     - Ontario → YYZ, YTZ, Peace Bridge, Rainbow Bridge
     - BC → YVR, Pacific Highway
     - Quebec → YUL, Lacolle
     - Alberta → YYC, YEG
     - Manitoba → YWG, Emerson
   - Show a personalized tip: "Based on your location in [Province], we recommend [Airport/Crossing]"

This is a simple enhancement — just filter/highlight, don't hide other options.
```

### 3.2 — hreflang Tag

**Prompt:**
```
Using as many agents as you need (even up to 8 in parallel) go ahead and implement this: Add hreflang tag to the root layout at /Users/lionel/builders/tnjobs/tn-visa-website.

In src/app/layout.tsx, update the metadata export to include:
   alternates: {
     canonical: 'https://tnvisaguide.ca',
     languages: { 'en-CA': 'https://tnvisaguide.ca' },
   }

This tells Google the content is Canadian English, which helps with Canadian search rankings.
```

---

## PHASE 4: Canadian-Specific SEO (20 min)

### 4.1 — Canadian Keywords in Titles

**Prompt:**
```
Using as many agents as you need (even up to 8 in parallel) go ahead and implement this: Add "for Canadians" or "Canada" to key page titles for SEO at /Users/lionel/builders/tnjobs/tn-visa-website.

Update these metadata titles (in page.tsx or layout.tsx files):

1. Homepage: "TN Visa Guide for Canadians | Complete 2026 Resource" (already done — verify)
2. /eligibility: "TN Visa Eligibility Checker for Canadians"
3. /apply: "How to Apply for a TN Visa from Canada"
4. /fees: "TN Visa Fees & Cost Calculator (USD & CAD)"
5. /taxes: "TN Visa Tax Guide for Canadians — US & Canadian Obligations"
6. /moving: "Moving to the US from Canada on a TN Visa"
7. /border-interview: "TN Visa Border Interview Guide for Canadians"
8. /documents: "Required TN Visa Documents for Canadian Applicants"
9. /renewal: "TN Visa Renewal Guide for Canadians"
10. /employer-letter: "TN Visa Employer Letter Guide — Canadian Requirements"

Don't change every page — only the ones where "Canadian" or "Canada" adds SEO value. Platform pages (dashboard, profile, etc.) don't need it.
```

### 4.2 — Canadian University References

**Prompt:**
```
Using as many agents as you need (even up to 8 in parallel) go ahead and implement this: Add Canadian university references to the eligibility checker and profession pages.

1. Update src/components/tools/EligibilityChecker.tsx:
   - In the degree field input (step 3), change the placeholder from:
     "e.g. Computer Science, Engineering, Accounting..."
     to:
     "e.g. Computer Science (UofT), Engineering (Waterloo), Commerce (McGill)..."

2. Update the LetterBuilder (src/components/tools/LetterBuilder.tsx):
   - In the institution input (step 2), change the placeholder from:
     "University of Toronto"
     to:
     "e.g. University of Toronto, UBC, McGill, Waterloo"

3. Update the blog post about CS degrees (src/app/blog/tn-visa-computer-science-degree-2026/page.tsx):
   - Add a section: "Canadian CS Programs and TN Eligibility"
   - Mention: UofT CS, Waterloo CS, UBC CS, McGill CS — all are Bachelor of Science in Computer Science, which no longer qualifies for Engineer but DOES qualify for Computer Systems Analyst
   - Mention: Waterloo Software Engineering, UofT Engineering Science — these ARE engineering degrees and may still qualify for Engineer

These are small touches but they signal "this content is for YOU" to Canadian visitors.
```

---

## PHASE 5: Financial Integration (15 min)

### 5.1 — Canadian Banking Tips

**Prompt:**
```
Using as many agents as you need (even up to 8 in parallel) go ahead and implement this: Enhance the /moving page with Canadian-specific banking content.

Update src/app/moving/page.tsx to add/update these sections:

1. "Before You Leave Canada" section:
   - Keep your Canadian bank account open (you'll need it for RRSP, TFSA, receiving any Canadian income)
   - Notify your bank you're moving — some banks close accounts of non-residents
   - TD Bank and RBC have US subsidiaries (TD Bank US, RBC Bank) — consider opening a US account with the same bank for easier transfers
   - Get a Canadian credit card with no foreign transaction fees (Scotiabank Passport, Brim Financial)

2. "Building US Credit" section:
   - You start with NO US credit history (your Canadian score doesn't transfer)
   - Options: secured credit card, Nova Credit (transfers Canadian credit history to some US lenders), Amex Global Transfer (if you have a Canadian Amex)
   - Typical timeline: 6-12 months to build enough credit for a lease or car loan

3. Add Wise affiliate in the banking section:
   "For ongoing transfers between your Canadian and US accounts, [Wise] offers the real exchange rate with transparent fees."
```

---

## SUMMARY

| Phase | Time | What Changes |
|-------|------|-------------|
| 1. Visual & Branding | 30 min | Canadian red accent, tagline, CAD pricing |
| 2. Canadian Content | 45 min | Credential mapping, border crossings, tax content, Canadian spelling |
| 3. Province Features | 30 min | Province selector, hreflang |
| 4. Canadian SEO | 20 min | "for Canadians" in titles, university references |
| 5. Financial | 15 min | Canadian banking tips, credit building |

**Total: ~2.5 hours of implementation**

Each prompt is self-contained and can be executed independently. The phases build on each other but don't depend on each other — you can do them in any order.
