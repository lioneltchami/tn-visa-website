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

interface Doc { id: string; name: string; type: string; file_url: string; file_size: number; created_at: string }

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
        const { data: { user }, error: authErr } = await supabase.auth.getUser()
        if (authErr || !user) { setError('Please sign in to view your documents.'); setLoading(false); return }

        const { data, error: fetchErr } = await supabase
          .from('documents').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
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
      const supabase = createClient()
      const { data: { user }, error: authErr } = await supabase.auth.getUser()
      if (authErr || !user) { setError('Please sign in to upload documents.'); return }

      const path = `${user.id}/${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage.from('documents').upload(path, file)
      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('documents').getPublicUrl(path)

      const { data: inserted, error: insertErr } = await supabase.from('documents').insert({
        user_id: user.id, name: file.name, type: docType,
        file_url: urlData.publicUrl, file_size: file.size,
      }).select().single()
      if (insertErr) throw insertErr

      setDocs(prev => [inserted, ...prev])
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
    if (file) handleUpload(file)
  }

  const handleDelete = async (id: string) => {
    setError(null)
    try {
      const supabase = createClient()
      const { error: delErr } = await supabase.from('documents').delete().eq('id', id)
      if (delErr) throw delErr
      setDocs(prev => prev.filter(d => d.id !== id))
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
          <label className="block text-sm font-medium text-fg mb-2">Document Type</label>
          <select value={docType} onChange={e => setDocType(e.target.value as Document['type'])}
            className="w-full sm:w-64 rounded-lg border border-border bg-bg p-3 text-fg mb-4 focus:outline-none focus:ring-2 focus:ring-accent/30">
            {DOC_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>

          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
              dragOver ? 'border-accent bg-accent-muted' : 'border-border hover:border-border-hover'
            }`}
          >
            <Upload className="w-10 h-10 mx-auto mb-3 text-fg-muted" />
            <p className="text-fg-secondary font-medium">{uploading ? 'Uploading...' : 'Drop files here or click to upload'}</p>
            <p className="text-fg-muted text-sm mt-1">PDF, JPG, PNG up to 10MB</p>
          </div>
          <input id="file-input" type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f) }} />
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-pulse text-fg-muted">Loading documents...</div></div>
        ) : docs.length > 0 ? (
          <div className="space-y-3">
            {docs.map(doc => (
              <div key={doc.id} className="card p-4 flex items-center gap-4">
                <FileText className="w-8 h-8 text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-fg truncate">{doc.name}</p>
                  <p className="text-sm text-fg-muted">
                    {DOC_TYPES.find(t => t.value === doc.type)?.label} · {formatSize(doc.file_size)}
                  </p>
                </div>
                <div className="flex gap-2">
                  {doc.file_url && (
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-bg-secondary transition-colors" aria-label="Download">
                      <Download size={16} className="text-fg-secondary" />
                    </a>
                  )}
                  <button onClick={() => handleDelete(doc.id)} className="p-2 rounded-lg hover:bg-bg-secondary transition-colors" aria-label="Delete">
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
