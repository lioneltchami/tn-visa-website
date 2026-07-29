/**
 * Renewal Reminder Script
 * Prefer the Vercel cron route in production. This CLI wraps the same logic:
 *   npx tsx scripts/send-renewal-reminders.ts
 *   npx tsx scripts/send-renewal-reminders.ts --dry-run
 */

import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { sendRenewalReminders } from '../src/lib/renewal-reminders'

function loadEnvLocal() {
  const envPath = resolve(__dirname, '../.env.local')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!match) continue
    const [, key, rawValue] = match
    if (process.env[key]) continue
    process.env[key] = rawValue.replace(/^["']|["']$/g, '')
  }
}

async function main() {
  loadEnvLocal()
  const dryRun = process.argv.includes('--dry-run')
  const result = await sendRenewalReminders({ dryRun })
  console.log(JSON.stringify(result, null, 2))
  if (result.failed > 0) process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
