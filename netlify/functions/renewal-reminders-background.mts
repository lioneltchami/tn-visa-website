/**
 * Background worker: POST /api/renewal-reminders with the same Bearer secret.
 * Logs status and response byte length only — never secrets or body content.
 */
export default async (req: Request) => {
  const base = process.env.URL || process.env.DEPLOY_PRIME_URL
  const secret = process.env.CRON_SECRET || process.env.SYNC_SECRET

  if (!base) {
    console.error('[renewal-reminders-background] Missing URL / DEPLOY_PRIME_URL')
    return
  }
  if (!secret) {
    console.error('[renewal-reminders-background] Missing CRON_SECRET / SYNC_SECRET')
    return
  }

  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    console.error('[renewal-reminders-background] Unauthorized')
    return
  }

  const target = `${base}/api/renewal-reminders`
  const res = await fetch(target, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}` },
  })

  const body = await res.arrayBuffer()
  console.log(
    `[renewal-reminders-background] reminders status=${res.status} bytes=${body.byteLength}`,
  )
}
