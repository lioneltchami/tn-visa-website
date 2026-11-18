import { Resend } from 'resend'
import { siteUrl } from '@/lib/site'
import { createServiceSupabase } from '@/lib/supabase/admin'
import { createUnsubscribeToken, normalizeSubscriberEmail } from '@/lib/unsubscribe-token'

export const REMINDER_WINDOWS = [90, 60, 30] as const
export type ReminderDays = (typeof REMINDER_WINDOWS)[number]

type StatusRow = {
  id: string
  user_id: string
  profession: string
  employer: string
  end_date: string
  status: string
}

type ProfileRow = {
  user_id: string
  email: string | null
  full_name: string | null
}

type SubscriberMailRow = {
  email: string
  unsubscribed_at: string | null
}

export type ReminderRunResult = {
  dryRun: boolean
  candidates: number
  sent: number
  skipped: number
  failed: number
  errors: string[]
}

/**
 * A unique violation is an abandoned claim only when sent_at was never set.
 * Any other error, or a row that already recorded a send, must not be reused.
 */
export function shouldReclaimUnsentReminder(
  errorCode: string | undefined,
  sentAt: string | null | undefined
): boolean {
  return errorCode === '23505' && sentAt == null
}

/** Skip opted-out addresses. A missing subscriber row still receives the reminder. */
export function shouldSkipUnsubscribed(unsubscribedAt: string | null | undefined): boolean {
  return unsubscribedAt != null
}

function utcDateOffset(days: number): string {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function subjectFor(days: ReminderDays): string {
  if (days === 90) return 'Your TN visa expires in 3 months'
  if (days === 60) return '2 months until your TN visa expires'
  return 'Urgent: Your TN visa expires in 30 days'
}

export function reminderUnsubscribeUrl(email: string): string {
  const url = new URL('/unsubscribe', siteUrl())
  url.searchParams.set('token', createUnsubscribeToken(email))
  return url.toString()
}

export function buildHtml(input: {
  days: ReminderDays
  firstName: string
  employer: string
  profession: string
  endDate: string
  unsubscribeUrl: string
}): string {
  const base = siteUrl()
  const urgent =
    input.days === 30
      ? '<p style="color:#b91c1c;"><strong>This is urgent. Start your renewal process now.</strong></p>'
      : ''

  return `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;">
      <h2>${subjectFor(input.days)}</h2>
      <p>Hi ${input.firstName},</p>
      <p>Your TN visa with <strong>${input.employer}</strong> as <strong>${input.profession}</strong> expires on <strong>${input.endDate}</strong>.</p>
      ${urgent}
      <p><a href="${base}/renewal">View our renewal guide →</a></p>
      <p><a href="${base}/status">Check your status dashboard →</a></p>
      <hr />
      <p style="font-size:12px;color:#888;">You're receiving this because you track your TN status on tnvisaguide.ca. <a href="${input.unsubscribeUrl}">Unsubscribe</a></p>
    </div>
  `
}

async function insertClaim(input: {
  tnStatusId: string
  daysBefore: ReminderDays
  email: string
}) {
  const { error } = await createServiceSupabase().from('renewal_reminder_sends').insert({
    tn_status_id: input.tnStatusId,
    days_before: input.daysBefore,
    email: input.email,
  })
  return error
}

/**
 * Claim a reminder slot. Returns true only for the caller that inserted the row,
 * so concurrent cron invocations cannot both send.
 *
 * ponytail: a 23505 row with sent_at null is reclaimed immediately, so an overlapping
 * cron can double-send while the first worker is still inside Resend. Upgrade path:
 * reclaim only when created_at is older than the send timeout.
 */
async function claimSend(input: {
  tnStatusId: string
  daysBefore: ReminderDays
  email: string
}): Promise<boolean> {
  const firstError = await insertClaim(input)
  if (!firstError) return true
  if (firstError.code !== '23505') throw firstError

  const { data, error: readError } = await createServiceSupabase()
    .from('renewal_reminder_sends')
    .select('sent_at')
    .eq('tn_status_id', input.tnStatusId)
    .eq('days_before', input.daysBefore)
    .maybeSingle()

  if (readError) throw readError
  if (!shouldReclaimUnsentReminder(firstError.code, data?.sent_at)) return false

  await releaseClaim(input.tnStatusId, input.daysBefore)

  const secondError = await insertClaim(input)
  if (!secondError) return true
  if (secondError.code === '23505') return false
  throw secondError
}

async function markSent(tnStatusId: string, daysBefore: ReminderDays, providerId: string | null) {
  await createServiceSupabase()
    .from('renewal_reminder_sends')
    .update({ sent_at: new Date().toISOString(), provider_id: providerId })
    .eq('tn_status_id', tnStatusId)
    .eq('days_before', daysBefore)
}

async function releaseClaim(tnStatusId: string, daysBefore: ReminderDays) {
  await createServiceSupabase()
    .from('renewal_reminder_sends')
    .delete()
    .eq('tn_status_id', tnStatusId)
    .eq('days_before', daysBefore)
    .is('sent_at', null)
}

export async function sendRenewalReminders(options: {
  dryRun?: boolean
}): Promise<ReminderRunResult> {
  const dryRun = Boolean(options.dryRun)
  const result: ReminderRunResult = {
    dryRun,
    candidates: 0,
    sent: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  }

  const supabase = createServiceSupabase()
  const resendKey = process.env.RESEND_API_KEY
  if (!dryRun && !resendKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  const resend = resendKey ? new Resend(resendKey) : null

  for (const days of REMINDER_WINDOWS) {
    // Window: exact day ±1 recovers a missed cron fire without double-sending
    // thanks to the unique ledger.
    const before = utcDateOffset(days - 1)
    const after = utcDateOffset(days + 1)

    const { data: statuses, error: statusError } = await supabase
      .from('tn_status')
      .select('id, user_id, profession, employer, end_date, status')
      .eq('status', 'active')
      .gte('end_date', before)
      .lte('end_date', after)
      .returns<StatusRow[]>()

    if (statusError) {
      result.errors.push(`tn_status query (${days}d): ${statusError.message}`)
      result.failed++
      continue
    }

    if (!statuses?.length) continue

    const userIds = Array.from(new Set(statuses.map((s) => s.user_id)))
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('user_id, email, full_name')
      .in('user_id', userIds)
      .returns<ProfileRow[]>()

    if (profileError) {
      result.errors.push(`profiles query (${days}d): ${profileError.message}`)
      result.failed++
      continue
    }

    const profileByUser = new Map((profiles || []).map((p) => [p.user_id, p]))
    const emails = Array.from(
      new Set(
        statuses
          .map((status) => normalizeSubscriberEmail(profileByUser.get(status.user_id)?.email))
          .filter((email): email is string => email !== null)
      )
    )
    const subscriberByEmail = new Map<string, string | null>()

    if (emails.length > 0) {
      const { data: subscribers, error: subscriberError } = await supabase
        .from('subscribers')
        .select('email, unsubscribed_at')
        .in('email', emails)
        .returns<SubscriberMailRow[]>()

      if (subscriberError) {
        result.errors.push(`subscribers query (${days}d): ${subscriberError.message}`)
        result.failed++
        continue
      }

      for (const row of subscribers || []) {
        subscriberByEmail.set(row.email, row.unsubscribed_at)
      }
    }

    for (const status of statuses) {
      result.candidates++
      const profile = profileByUser.get(status.user_id)
      const email = normalizeSubscriberEmail(profile?.email)
      if (!email) {
        result.skipped++
        result.errors.push(`No profile email for status ${status.id}`)
        continue
      }

      if (shouldSkipUnsubscribed(subscriberByEmail.get(email))) {
        result.skipped++
        continue
      }

      if (dryRun) {
        result.sent++
        continue
      }

      let claimed = false
      try {
        claimed = await claimSend({
          tnStatusId: status.id,
          daysBefore: days,
          email,
        })
        if (!claimed) {
          result.skipped++
          continue
        }

        const firstName = (profile?.full_name || 'there').split(' ')[0]
        const { data, error } = await resend!.emails.send({
          from: 'TN Visa Guide <hello@tnvisaguide.ca>',
          to: email,
          subject: `${subjectFor(days)} — ${status.employer}`,
          html: buildHtml({
            days,
            firstName,
            employer: status.employer,
            profession: status.profession,
            endDate: status.end_date,
            unsubscribeUrl: reminderUnsubscribeUrl(email),
          }),
        })

        if (error) throw new Error(error.message)

        await markSent(status.id, days, data?.id ?? null)
        result.sent++
      } catch (err) {
        if (claimed) await releaseClaim(status.id, days).catch(() => undefined)
        result.failed++
        result.errors.push(
          `${email} (${days}d): ${err instanceof Error ? err.message : String(err)}`
        )
      }
    }
  }

  return result
}
