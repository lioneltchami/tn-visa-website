# P0 Security Deployment Runbook

## Scope

This runbook deploys two coordinated changes:

1. **Subscriber privacy:** public browser access to `public.subscribers` is removed. Subscription and unsubscribe actions use server routes with the Supabase service role. Unsubscribe links use an expiring opaque token.
2. **Private documents:** document records use `storage_path`; authenticated server routes validate uploads, issue short-lived signed downloads, and remove the storage object before deleting the database record.

Do not apply these migrations or deploy the application until a reviewer has approved the remediation branch and this checklist.

## Preconditions

| Requirement | Verification |
|---|---|
| Remediation branch is approved | Review `fix/p0-subscriber-document-security`; confirm tests, lint, and build pass. |
| Supabase backup or recovery plan is confirmed | Verify the project backup point and the owner who can restore it. |
| Vercel environment has `SUPABASE_SERVICE_ROLE_KEY` | Confirm it exists only in server-side environment variables. Never expose it as `NEXT_PUBLIC_*`. |
| Vercel environment has a unique `UNSUBSCRIBE_TOKEN_SECRET` | Generate a new high-entropy value, for example `openssl rand -hex 32`. Do not reuse the download-token or service-role secret. |
| Staging environment is available | Use a staging Supabase project and non-sensitive test data first. |
| Existing document inventory is understood | Before deployment, record the count of rows with a legacy `file_url` and no `storage_path`. |

## Staging deployment order

1. Apply `20260824174500_secure_document_storage.sql` in staging. It adds nullable `storage_path`, backfills only paths that match the document owner's folder, and retains `file_url` for audit.
2. Review unresolved legacy rows:

   ```sql
   select id, user_id, name, file_url
   from public.documents
   where storage_path is null;
   ```

   Do not delete those files or records during this release. Investigate each path before a separate cleanup migration.
3. Set `UNSUBSCRIBE_TOKEN_SECRET` in the staging application environment.
4. Deploy the application branch to staging.
5. Apply `20260824173000_secure_subscribers.sql` in staging. The migration revokes `anon` and `authenticated` table access and removes public subscriber policies.
6. Complete the staging verification checklist below.

## Staging verification checklist

### Subscriber privacy

- Submit a valid subscription through `/api/subscribe`. Confirm that the UI receives success and that the row appears only through server-side administration.
- Submit the same email again. Confirm that the response does not reveal whether the address was already subscribed.
- Inspect a received email. Confirm that the unsubscribe URL contains `token=...` and does **not** contain `email=` or the literal email address.
- Follow the token link and confirm that `/api/unsubscribe` succeeds once and remains safely idempotent on a second request.
- Open a previous-style `/unsubscribe?email=...` link. Confirm that it only offers a secure-link request, does not display the email address, and never updates the subscriber row directly.
- Use the anonymous Supabase key in a non-production environment to confirm that direct read and update access are rejected:

  ```bash
  curl -i "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/subscribers?select=*" \
    -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY"
  ```

  The request must not return subscriber records. Also attempt a direct `PATCH`; it must not update any row.

### Private documents

- Upload a non-sensitive PDF smaller than 10 MB. Confirm that the database stores `storage_path` beginning with the authenticated user UUID and that no new public URL is stored.
- Attempt uploads with a DOCX, mismatched MIME/extension, zero-byte file, and a file larger than 10 MB. Each must fail without creating an object or row.
- Download the test document. Confirm that the application returns a short-lived signed URL through a `307` response and that the URL is not persisted in the document record.
- Sign in as a second user. Confirm that the second user receives `404` for the first user's document download and delete endpoints.
- Delete the test document. Confirm that the object is absent from the `documents` bucket and the row is absent from `public.documents`.
- Simulate or inspect a storage deletion failure if feasible. The UI must receive an error rather than a false success.

## Production release choreography

The subscriber policy migration will break the old browser-client subscribe and unsubscribe paths. The document migration must exist before the new document code reads `storage_path`. Use a short, scheduled maintenance window:

1. Confirm the production environment contains `UNSUBSCRIBE_TOKEN_SECRET` and the service-role key.
2. Confirm the Vercel deployment is built and ready but do not promote it yet.
3. Apply `20260824174500_secure_document_storage.sql` in production. Record unresolved legacy document rows. The current application remains functional while `file_url` remains available.
4. Promote the Vercel deployment containing the new server-side subscriber and document routes.
5. Immediately apply `20260824173000_secure_subscribers.sql` in production.
6. Run the production smoke tests with a new non-sensitive subscriber and a non-sensitive test document.
7. Monitor Vercel runtime errors, subscription success rate, document route 4xx/5xx responses, and Supabase logs for at least 30 minutes.

## Rollback boundaries

- **Application rollback:** Revert the Vercel deployment only if the subscriber migration has not been applied. Once public subscriber policies are removed, the previous client-side unsubscribe flow cannot work.
- **Subscriber migration:** Do not recreate public `SELECT` or `UPDATE` policies. If the new server route fails, repair or temporarily disable the form while preserving privacy.
- **Document migration:** Leave `file_url` in place during the initial release. If the new document routes fail, roll back the application while retaining `storage_path`; do not remove the storage-path backfill without reviewing affected rows.
- **Secrets:** Rotating `UNSUBSCRIBE_TOKEN_SECRET` invalidates active unsubscribe links. Plan a replacement email or support process before rotation.

## Post-release follow-up

1. Create a separate, reviewed cleanup plan for legacy document rows that did not backfill.
2. After a verified transition period, remove `file_url` only when every document row has a valid private `storage_path` or an approved exception.
3. Add API integration tests against a staging Supabase project for subscriber policies and document ownership boundaries.
4. Add the full test, lint, type-check, and production-build workflow to required pull-request checks.
