import { describe, expect, it } from 'vitest'
import {
  createDocumentStoragePath,
  isDocumentStoragePathOwnedBy,
  MAX_DOCUMENT_SIZE_BYTES,
  validateDocumentUpload,
} from '@/lib/documents'

const USER_ID = '3f2504e0-4f89-11d3-9a0c-0305e82c3301'

function file(name: string, type: string, size = 1024) {
  return { name, type, size } as File
}

describe('private document helpers', () => {
  it('accepts supported files and normalizes the display name', () => {
    expect(validateDocumentUpload(file('  letter.PDF  ', 'application/pdf'), 'employer_letter')).toEqual({
      value: { name: 'letter.PDF', type: 'employer_letter', extension: '.pdf' },
    })
  })

  it('rejects unsupported types, mismatched extensions, and oversized files', () => {
    expect(validateDocumentUpload(file('letter.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'), 'degree')).toEqual({
      error: 'Only PDF, JPG, and PNG documents are supported.',
    })
    expect(validateDocumentUpload(file('letter.jpg', 'application/pdf'), 'degree')).toEqual({
      error: 'Only PDF, JPG, and PNG documents are supported.',
    })
    expect(validateDocumentUpload(file('letter.pdf', 'application/pdf', MAX_DOCUMENT_SIZE_BYTES + 1), 'degree')).toEqual({
      error: 'Documents must be between 1 byte and 10 MB.',
    })
  })

  it('rejects unknown document types', () => {
    expect(validateDocumentUpload(file('letter.pdf', 'application/pdf'), 'resume')).toEqual({
      error: 'Choose a valid document type.',
    })
  })

  it('generates a private path inside the owner folder', () => {
    const path = createDocumentStoragePath(USER_ID, '.pdf')
    expect(path).toMatch(new RegExp(`^${USER_ID}/[0-9a-f-]+\\.pdf$`, 'i'))
    expect(isDocumentStoragePathOwnedBy(path, USER_ID)).toBe(true)
    expect(isDocumentStoragePathOwnedBy(path, '11111111-1111-1111-1111-111111111111')).toBe(false)
  })

  it('rejects unsafe storage path inputs', () => {
    expect(() => createDocumentStoragePath('../not-a-user', '.pdf')).toThrow()
    expect(() => createDocumentStoragePath(USER_ID, '../pdf')).toThrow()
    expect(isDocumentStoragePathOwnedBy(`${USER_ID}/nested/file.pdf`, USER_ID)).toBe(false)
  })
})
