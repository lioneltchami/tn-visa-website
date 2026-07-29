/**
 * Fee / cost literal drift detector.
 *
 * Compares `src/data/fees.json` (source of truth) against hardcoded dollar
 * amounts in key pages. Opens nothing by itself — CI prints a report and
 * exits non-zero on drift so the weekly workflow can open a GitHub Issue.
 *
 *   npm run check:freshness
 */

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import { join, relative, resolve } from 'path'

const ROOT = resolve(__dirname, '..')
const FEES_PATH = join(ROOT, 'src/data/fees.json')
const SCAN_ROOTS = [join(ROOT, 'src/app'), join(ROOT, 'src/components')]

type Fees = {
  poe: { processingFee: number; i94LandBorder: number; i94Airport: number }
  i129: {
    largeFiling: number
    largeAsylum: number
    smallFiling: number
    smallAsylum: number
    nonprofitFiling: number
    nonprofitAsylum: number
  }
  premiumProcessing: number
  other: { tdLandBorder: number; tdAirport: number }
}

type Finding = {
  file: string
  line: number
  text: string
  expected?: string
  reason: string
}

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, out)
    else if (/\.(tsx?|jsx?|mdx?)$/.test(name)) out.push(full)
  }
  return out
}

function collectExpectedAmounts(fees: Fees): Map<number, string> {
  const map = new Map<number, string>()
  const add = (n: number, label: string) => {
    if (n <= 0) return
    map.set(n, label)
  }

  add(fees.poe.processingFee, 'fees.poe.processingFee')
  add(fees.poe.i94LandBorder, 'fees.poe.i94LandBorder')
  add(fees.premiumProcessing, 'fees.premiumProcessing')
  add(fees.i129.largeFiling, 'fees.i129.largeFiling')
  add(fees.i129.largeAsylum, 'fees.i129.largeAsylum')
  add(fees.i129.smallFiling, 'fees.i129.smallFiling')
  add(fees.i129.smallAsylum, 'fees.i129.smallAsylum')
  add(fees.i129.nonprofitFiling, 'fees.i129.nonprofitFiling')
  add(fees.other.tdLandBorder, 'fees.other.tdLandBorder')

  // Common totals shown in copy
  add(fees.poe.processingFee + fees.poe.i94LandBorder, 'POE land total')
  add(fees.i129.largeFiling + fees.i129.largeAsylum, 'I-129 large total')
  add(fees.i129.smallFiling + fees.i129.smallAsylum, 'I-129 small total')
  add(fees.i129.nonprofitFiling + fees.i129.nonprofitAsylum, 'I-129 nonprofit total')

  return map
}

/** Known stale literals that used to match older fee schedules. */
const KNOWN_STALE = new Map<number, string>([
  [6, 'Old I-94 land fee (was $6, now fees.poe.i94LandBorder)'],
  [2805, 'Old premium processing (was $2,805, now fees.premiumProcessing)'],
  [460, 'Possible old I-129 small filing (now fees.i129.smallFiling)'],
])

function scanFile(file: string, expected: Map<number, string>, findings: Finding[]): void {
  const rel = relative(ROOT, file)
  // FeeCalculator + fees page already import fees.json — skip noise
  if (rel.includes('FeeCalculator') || rel.endsWith('fees/page.tsx')) return

  const lines = readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, idx) => {
    // Skip imports and comments that reference fees.json keys
    if (line.includes('fees.') || line.includes('fees.json')) return
    if (/^\s*\/\//.test(line) || /^\s*\*/.test(line)) return

    const money = line.matchAll(/\$([0-9]{1,3}(?:,[0-9]{3})+|[0-9]+)/g)
    for (const match of money) {
      const raw = match[1].replace(/,/g, '')
      const amount = Number(raw)
      if (!Number.isFinite(amount) || amount < 5) continue

      if (KNOWN_STALE.has(amount)) {
        findings.push({
          file: rel,
          line: idx + 1,
          text: line.trim().slice(0, 160),
          reason: KNOWN_STALE.get(amount)!,
        })
        continue
      }

      // Flag premium / POE / I-129 amounts that don't match the SSoT
      const interesting =
        amount === 2965 ||
        amount === 2805 ||
        amount === 80 ||
        amount === 50 ||
        amount === 30 ||
        amount >= 300

      if (!interesting) continue

      if (!expected.has(amount) && (amount === 2805 || amount === 460 || amount === 6)) {
        findings.push({
          file: rel,
          line: idx + 1,
          text: line.trim().slice(0, 160),
          reason: `Hardcoded $${amount.toLocaleString()} is not in fees.json`,
        })
      } else if (
        !expected.has(amount) &&
        (line.toLowerCase().includes('premium') ||
          line.toLowerCase().includes('i-129') ||
          line.toLowerCase().includes('i94') ||
          line.toLowerCase().includes('processing'))
      ) {
        findings.push({
          file: rel,
          line: idx + 1,
          text: line.trim().slice(0, 160),
          expected: `one of fees.json amounts`,
          reason: `Hardcoded $${amount.toLocaleString()} in fee/processing copy may be stale vs fees.json`,
        })
      }
    }
  })
}

function main() {
  const fees = JSON.parse(readFileSync(FEES_PATH, 'utf8')) as Fees
  const expected = collectExpectedAmounts(fees)
  const files = SCAN_ROOTS.flatMap((root) => walk(root))
  const findings: Finding[] = []

  for (const file of files) scanFile(file, expected, findings)

  // Deduplicate by file:line
  const unique = [...new Map(findings.map((f) => [`${f.file}:${f.line}`, f])).values()].sort(
    (a, b) => a.file.localeCompare(b.file) || a.line - b.line
  )

  console.log(`Checked ${files.length} files against ${FEES_PATH}`)
  console.log(`Canonical premium processing: $${fees.premiumProcessing}`)
  console.log(`Canonical POE land total: $${fees.poe.processingFee + fees.poe.i94LandBorder}`)
  console.log('')

  if (unique.length === 0) {
    console.log('No fee literal drift detected.')
    return
  }

  console.log(`Found ${unique.length} potential drift(s):\n`)
  for (const f of unique) {
    console.log(`- ${f.file}:${f.line}`)
    console.log(`  ${f.reason}`)
    console.log(`  > ${f.text}`)
    console.log('')
  }

  // Write machine-readable report for the workflow
  const reportPath = join(ROOT, 'freshness-report.md')
  const body = [
    '# Fee freshness drift report',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    `Canonical values from \`src/data/fees.json\`:`,
    `- Premium processing: $${fees.premiumProcessing}`,
    `- POE processing: $${fees.poe.processingFee}`,
    `- I-94 land: $${fees.poe.i94LandBorder}`,
    `- I-129 small filing: $${fees.i129.smallFiling}`,
    '',
    '## Findings',
    '',
    ...unique.map(
      (f) => `- \`${f.file}:${f.line}\` — ${f.reason}\n  \n  \`${f.text.replace(/`/g, "'")}\`\n`
    ),
    '',
    '## Next step',
    '',
    'Update the hardcoded copy (or import from `fees.json`) — do **not** auto-merge policy claims.',
    '',
  ].join('\n')

  writeFileSync(reportPath, body)
  console.log(`Wrote ${reportPath}`)
  process.exitCode = 1
}

main()
