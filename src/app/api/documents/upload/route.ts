import { NextResponse } from 'next/server'
import {
  createDocumentStoragePath,
  DOCUMENT_BUCKET,
  validateDocumentUpload,
} from '@/lib/documents'
import { createServerSupabase } from '@/lib/supabase/server'
import { createServiceSupabase } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' }

export async function POST(req: Request) {
  try {
    const sessionClient = createServerSupabase()
    const {
      data: { user },
      error: authError,
    } = await sessionClient.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Please sign in to upload documents.' }, { status: 401, headers: NO_STORE })
    }

    const formData = await req.formData()
    const file = formData.get('file')
    const documentType = formData.get('type')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Choose a document to upload.' }, { status: 400, headers: NO_STORE })
    }

    const validation = validateDocumentUpload(file, documentType)
    if ('error' in validation) {
      return NextResponse.json({ error: validation.error }, { status: 400, headers: NO_STORE })
    }

    const storagePath = createDocumentStoragePath(user.id, validation.value.extension)
    const serviceClient = createServiceSupabase()
    const { error: uploadError } = await serviceClient.storage
      .from(DOCUMENT_BUCKET)
      .upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('[documents] Storage upload failed:', uploadError.message)
      return NextResponse.json({ error: 'Unable to upload document. Please try again.' }, { status: 503, headers: NO_STORE })
    }

    const { data: document, error: insertError } = await serviceClient
      .from('documents')
      .insert({
        user_id: user.id,
        name: validation.value.name,
        type: validation.value.type,
        storage_path: storagePath,
        file_size: file.size,
      })
      .select('id, name, type, storage_path, file_size, created_at')
      .single()

    if (insertError) {
      const { error: cleanupError } = await serviceClient.storage.from(DOCUMENT_BUCKET).remove([storagePath])
      if (cleanupError) {
        console.error('[documents] Failed to clean up untracked upload:', cleanupError.message)
      }
      throw insertError
    }

    return NextResponse.json({ document }, { status: 201, headers: NO_STORE })
  } catch (err) {
    console.error('[documents] Upload failed:', err)
    return NextResponse.json({ error: 'Unable to upload document. Please try again.' }, { status: 500, headers: NO_STORE })
  }
}
