# Design — TN Visa Guide

Locked system after Hallmark critical-fix pass (2026-08-09).
Marketing chrome + tokens; content pages inherit type/colour/CTA voice.

## Genre

modern-minimal (editorial type pairing)

## Macrostructure family

- Marketing pages: left-bias Stat / Long Document hybrid — no centered full-viewport hero, no 3-equal feature grids
- Content pages: Long Document (ContentLayout) — display H1, body measure, hairline rules
- App pages: Workbench — dense, token-only, no enrichment

## Theme (HSL components for existing `hsl(var(--*))` pipeline)

- Paper / `--bg`: cool stone `210 14% 98%` (not cream, not pure white)
- Paper-2 / `--bg-secondary`: `210 12% 95%`
- Ink / `--fg`: `210 25% 12%`
- Ink-2 / `--fg-secondary`: `210 10% 38%`
- Rule / `--border`: `210 12% 88%`
- Accent: maple red `0 72% 42%` (aligned with `--canadian-red`)
- Focus: same as accent

## Typography

- Display: Literata, weight 700, roman only on headings
- Body: Source Sans 3, weight 400/600
- No Inter / Roboto / Open Sans
- No gradient text fills

## CTA voice

- Primary: solid accent fill, slight radius (`0.375rem`), no pills, no scale hover
- Secondary: hairline border, same radius

## Nav

Edge masthead: wordmark + sparse primary links + text Sign In. Solid surface (no glass). Not the AI SaaS sticky pill bar.

## Footer

Dense colophon: brand line + wrapped link list + legal. Not 4-column Product/Company/Resources/Legal.

## Forbidden (critical tells)

- Indigo/purple accent systems and purple→pink gradients
- `background-clip: text` gradient headlines
- Full-viewport centered heroes
- Invented social-proof metrics
- Thick left-border “side-stripe” cards
- Emoji as UI icons
- 3 equal icon-feature columns as the page rhythm
