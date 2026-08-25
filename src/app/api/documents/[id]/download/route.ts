import { NextResponse } from 'next/server'
import {
  DOCUMENT_BUCKET,
  isDocumentStoragePathOwnedBy,
} from '@/lib/documents'
import { createServiceSupabase } from '@/lib/supabase/admin'
import { createServerSupabase } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const SIGNED_URL_TTL_SECONDS = 120
const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' }

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const sessionClient = createServerSupabase()
    const {
      data: { user },
      error: authError,
    } = await sessionClient.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Please sign in to download documents.' }, { status: 401, headers: NO_STORE })
    }

    const serviceClient = createServiceSupabase()
    const { data: document, error: documentError } = await serviceClient
      .from('documents')
      .select('name, storage_path')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .maybeSingle()

    if (documentError) throw documentError
    if (!document) {
      return NextResponse.json({ error: 'Document not found.' }, { status: 404, headers: NO_STORE })
    }
    if (
      typeof document.storage_path !== 'string' ||
      !isDocumentStoragePathOwnedBy(document.storage_path, user.id)
    ) {
      return NextResponse.json(
        { error: 'This document needs a secure storage update before it can be downloaded.' },
        { status: 409, headers: NO_STORE }
      )
    }

    const { data, error: signedUrlError } = await serviceClient.storage
      .from(DOCUMENT_BUCKET)
      .createSignedUrl(document.storage_path, SIGNED_URL_TTL_SECONDS, { download: document.name })

    if (signedUrlError || !data?.signedUrl) {
      console.error('[documents] Signed URL failed:', signedUrlError?.message)
      return NextResponse.json(
        { error: 'Unable to prepare this document. Please try again shortly.' },
        { status: 503, headers: NO_STORE }
      )
    }

    return NextResponse.redirect(data.signedUrl, { status: 307, headers: NO_STORE })
  } catch (err) {
    console.error('[documents] Download failed:', err)
    return NextResponse.json(
      { error: 'Unable to prepare this document. Please try again shortly.' },
      { status: 500, headers: NO_STORE }
    )
  }
}
