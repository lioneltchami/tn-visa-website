import { NextResponse } from 'next/server'
import {
  DOCUMENT_BUCKET,
  isDocumentStoragePathOwnedBy,
} from '@/lib/documents'
import { createServiceSupabase } from '@/lib/supabase/admin'
import { createServerSupabase } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' }

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const sessionClient = createServerSupabase()
    const {
      data: { user },
      error: authError,
    } = await sessionClient.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Please sign in to delete documents.' }, { status: 401, headers: NO_STORE })
    }

    const serviceClient = createServiceSupabase()
    const { data: document, error: documentError } = await serviceClient
      .from('documents')
      .select('id, storage_path')
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
        { error: 'This document needs a secure storage update before it can be deleted.' },
        { status: 409, headers: NO_STORE }
      )
    }

    const { error: storageError } = await serviceClient.storage
      .from(DOCUMENT_BUCKET)
      .remove([document.storage_path])

    if (storageError) {
      console.error('[documents] Storage delete failed:', storageError.message)
      return NextResponse.json(
        { error: 'Unable to delete the stored document. Please try again.' },
        { status: 503, headers: NO_STORE }
      )
    }

    const { error: deleteError } = await serviceClient
      .from('documents')
      .delete()
      .eq('id', document.id)
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('[documents] Database delete failed after storage removal:', deleteError.message)
      return NextResponse.json(
        { error: 'Document storage was updated but the record needs attention. Please contact support.' },
        { status: 500, headers: NO_STORE }
      )
    }

    return NextResponse.json({ success: true }, { headers: NO_STORE })
  } catch (err) {
    console.error('[documents] Delete failed:', err)
    return NextResponse.json(
      { error: 'Unable to delete document. Please try again.' },
      { status: 500, headers: NO_STORE }
    )
  }
}
