'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { FileText, Upload, Trash2, Download, AlertCircle } from 'lucide-react'

import type { Document } from '@/types/database'

const DOC_TYPES = [
  { value: 'employer_letter' as const, label: 'Employer Letter' },
  { value: 'degree' as const, label: 'Degree / Diploma' },
  { value: 'transcript' as const, label: 'Transcript' },
  { value: 'license' as const, label: 'Professional License' },
  { value: 'i94' as const, label: 'I-94 Record' },
  { value: 'passport' as const, label: 'Passport Copy' },
  { value: 'other' as const, label: 'Other' },
]

interface Doc {
  id: string
  name: string
  type: string
  storage_path: string
  file_size: number
  created_at: string
}

export default function MyDocumentsPage() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [docType, setDocType] = useState<Document['type']>('employer_letter')
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDocs() {
      try {
        const supabase = createClient()
        const {
          data: { user },
          error: authErr,
        } = await supabase.auth.getUser()
        if (authErr || !user) {
          setError('Please sign in to view your documents.')
          setLoading(false)
          return
        }

        const { data, error: fetchErr } = await supabase
          .from('documents')
          .select('id, name, type, storage_path, file_size, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
        if (fetchErr) throw fetchErr
        setDocs(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load documents.')
      } finally {
        setLoading(false)
      }
    }
    loadDocs()
  }, [])

  const handleUpload = async (file: File) => {
    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.set('file', file)
      formData.set('type', docType)

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })
      const body = (await response.json()) as { document?: Doc; error?: string }
      if (!response.ok || !body.document) throw new Error(body.error || 'Failed to upload document.')

      setDocs((previous) => [body.document as Doc, ...previous])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload document.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) void handleUpload(file)
  }

  const handleDelete = async (document: Doc) => {
    setError(null)

    try {
      const response = await fetch(`/api/documents/${encodeURIComponent(document.id)}`, {
        method: 'DELETE',
      })
      const body = (await response.json()) as { error?: string }
      if (!response.ok) throw new Error(body.error || 'Failed to delete document.')

      setDocs((previous) => previous.filter((item) => item.id !== document.id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete document.')
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(1)} MB`
  }

  return (
    <div className="section-padding">
      <div className="container-tight">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-fg mb-2">My TN Documents</h1>
        <p className="text-fg-secondary mb-8">Securely store your TN visa application documents.</p>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-danger/10 text-danger border border-danger/20">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="card p-6 mb-8">
          <label className="block text-sm font-medium text-fg mb-2" htmlFor="document-type">Document Type</label>
          <select
            id="document-type"
            value={docType}
            onChange={(e) => setDocType(e.target.value as Document['type'])}
            className="w-full sm:w-64 rounded-lg border border-border bg-bg p-3 text-fg mb-4 focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            {DOC_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
              dragOver ? 'border-accent bg-accent-muted' : 'border-border hover:border-border-hover'
            }`}
          >
            <Upload className="w-10 h-10 mx-auto mb-3 text-fg-muted" />
            <p className="text-fg-secondary font-medium">{uploading ? 'Uploading...' : 'Drop files here or click to upload'}</p>
            <p className="text-fg-muted text-sm mt-1">PDF, JPG, or PNG up to 10 MB</p>
          </div>
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void handleUpload(file)
              e.currentTarget.value = ''
            }}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-fg-muted">Loading documents...</div>
          </div>
        ) : docs.length > 0 ? (
          <div className="space-y-3">
            {docs.map((document) => (
              <div key={document.id} className="card p-4 flex items-center gap-4">
                <FileText className="w-8 h-8 text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-fg truncate">{document.name}</p>
                  <p className="text-sm text-fg-muted">
                    {DOC_TYPES.find((type) => type.value === document.type)?.label} · {formatSize(document.file_size)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/api/documents/${encodeURIComponent(document.id)}/download`}
                    className="p-2 rounded-lg hover:bg-bg-secondary transition-colors"
                    aria-label="Download"
                  >
                    <Download size={16} className="text-fg-secondary" />
                  </a>
                  <button
                    onClick={() => void handleDelete(document)}
                    className="p-2 rounded-lg hover:bg-bg-secondary transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} className="text-danger" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center">
            <FileText className="w-12 h-12 mx-auto mb-3 text-fg-muted" />
            <p className="text-fg-secondary font-medium">No documents yet</p>
            <p className="text-fg-muted text-sm mt-1">Upload your TN visa documents to keep them organized and accessible.</p>
          </div>
        )}
      </div>
    </div>
  )
}
