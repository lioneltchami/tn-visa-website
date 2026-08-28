# Workflow Operations Runbook

## Target workflow portfolio

| Workflow | Keep? | Purpose | Trigger policy |
|---|---:|---|---|
| Verify application | Yes | Required quality evidence for code and migration changes. | Pull requests to `main` and pushes to `main`. |
| Build product PDFs | Yes | Build buyer-facing PDFs and upload only a reviewed artifact to private storage. | Build on relevant `main` changes; upload only when manually requested. |
| Freshness watch | Yes | Flag potential TN fee-copy drift for human review. | Weekly schedule and manual runs. Never publishes content. |
| Ingest chat embeddings | Yes | Build a new retrieval index while the active index remains live. | Manual only. Build-ready and activate-ready-version are separate actions. |

Do not add an automatic production-deployment workflow. Vercel already deploys approved merges from `main`. Do not add an automatic Supabase-migration workflow. Database changes require the staged release and verification process in `P0_SECURITY_DEPLOYMENT_RUNBOOK.md`.

## Required GitHub configuration

Complete these settings before treating the workflows as release controls.

1. Protect `main`: require pull requests, block force pushes, and require the **Verify application / quality** check before merge.
2. Protect the `Production` environment: require one reviewer, allow self-review only if you are the sole operator, and restrict deployments to `main`.
3. Confirm that `GUIDE_REPO_TOKEN` has read-only access to `lioneltchami/tn-visa-guide` only.
4. Keep `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, and `UNSUBSCRIBE_TOKEN_SECRET` server-side and scoped to the `Production` environment. Never create `NEXT_PUBLIC_` versions of them.

## Initial activation sequence

### Product PDFs

1. Merge the workflow-reliability pull request.
2. Run **Build product PDFs** with `upload=false`.
3. Download `product-pdfs` and review the three generated PDFs.
4. Run **Build product PDFs** with `upload=true` only after review and Production approval.
5. Confirm the private `product-files` bucket contains the reviewed files and that a buyer download still works.

### Freshness watch

1. Run **Freshness watch** once after merge.
2. Confirm it completes without reopening the salary and H-1B-only false positives.
3. Review any remaining report as a TN policy-content task. Do not auto-merge the result.

### Chat embeddings

1. Apply `20260825003000_versioned_content_embeddings.sql` only after `embeddings-clean.sql` exists in the target Supabase project.
2. Run **Ingest chat embeddings** with `activate_version` blank. This builds a new `ready` version and does not change live chat retrieval.
3. Review the `embedding-ingest-report` artifact. Confirm status is `ready`, expected chunk count equals inserted chunk count, and the source hash matches the intended guide revision.
4. Run application-level staging queries against the ready version if a staging Supabase project is available.
5. Run **Ingest chat embeddings** again with the exact ready version UUID in `activate_version`.
6. Verify chat retrieval, then monitor error logs and response quality for at least 30 minutes. Keep the prior archived index as rollback material.

## Rollback boundaries

- A ready embedding version does not affect users. Mark it failed or leave it for review if validation fails.
- Activation archives the previous active version but does not delete it. A previously archived version can be promoted again through the same reviewed activation path.
- Do not restore the old destructive `delete().neq(...)` ingestion pattern.
- Do not bypass the Production environment approval for product uploads or embedding activation.

## Product-PDF release standard

The paid PDFs are proprietary TN Visa Guide publications. Every master artifact must use the approved TN Visa Guide maple-leaf mark, the **TN Visa Guide** wordmark, a visible personal-use licence notice, a current edition date, a contents page, page numbering, PDF tagging, active primary-source links, and the source-backed product disclaimer. The build pipeline verifies these release controls before an artifact can be selected for upload.

The PDF builder is intentionally review-first. A push that affects product content or the builder creates a `product-pdfs` artifact but does not make it available to buyers. Review each artifact visually and run `npm run verify:products` when validating it locally. Only then manually dispatch **Build product PDFs** with `upload=true` and approve the protected `Production` environment. The protected upload job independently verifies the downloaded artifact before writing it to the private `product-files` bucket.

Buyer downloads are personalized at the authenticated download route with the checkout email and a purchase reference, together with a subtle licence watermark. This is a redistribution deterrent and licence-verification control, not DRM: no delivered PDF can be made impossible to copy or share. The purchase page discloses the personalization before checkout. Private storage, signed entitlement tokens, download limits, no-store delivery headers, and refund/dispute revocation remain the primary access controls.

Before approving an upload, confirm that `20260825180000_purchase_revocation.sql` has been applied in production. Without it, refunded or disputed payments may not reliably revoke a buyer’s subsequent download access.
