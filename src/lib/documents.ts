import { randomUUID } from 'crypto'

export const DOCUMENT_BUCKET = 'documents'
export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024

const DOCUMENT_TYPES = new Set([
  'employer_letter',
  'degree',
  'transcript',
  'license',
  'i94',
  'passport',
  'other',
])

const ALLOWED_FILES: Record<string, ReadonlySet<string>> = {
  'application/pdf': new Set(['.pdf']),
  'image/jpeg': new Set(['.jpg', '.jpeg']),
  'image/png': new Set(['.png']),
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export type DocumentType =
  | 'employer_letter'
  | 'degree'
  | 'transcript'
  | 'license'
  | 'i94'
  | 'passport'
  | 'other'

export type ValidatedDocumentUpload = {
  name: string
  type: DocumentType
  extension: string
}

function extensionOf(filename: string): string {
  const index = filename.lastIndexOf('.')
  return index >= 0 ? filename.slice(index).toLowerCase() : ''
}

function safeName(filename: string): string {
  return filename.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 180)
}

export function validateDocumentUpload(
  file: Pick<File, 'name' | 'size' | 'type'>,
  documentType: unknown
): { value: ValidatedDocumentUpload } | { error: string } {
  if (!DOCUMENT_TYPES.has(documentType as string)) {
    return { error: 'Choose a valid document type.' }
  }

  if (!Number.isFinite(file.size) || file.size <= 0 || file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return { error: 'Documents must be between 1 byte and 10 MB.' }
  }

  const name = safeName(file.name)
  const extension = extensionOf(name)
  const allowedExtensions = ALLOWED_FILES[file.type]
  if (!name || !allowedExtensions || !allowedExtensions.has(extension)) {
    return { error: 'Only PDF, JPG, and PNG documents are supported.' }
  }

  return { value: { name, type: documentType as DocumentType, extension } }
}

export function createDocumentStoragePath(userId: string, extension: string): string {
  if (!UUID_RE.test(userId)) throw new Error('createDocumentStoragePath: invalid user id')
  if (!/^\.[a-z0-9]+$/i.test(extension)) throw new Error('createDocumentStoragePath: invalid extension')

  return `${userId}/${randomUUID()}${extension.toLowerCase()}`
}

export function isDocumentStoragePathOwnedBy(storagePath: string, userId: string): boolean {
  return storagePath.startsWith(`${userId}/`) && storagePath.split('/').length === 2
}
