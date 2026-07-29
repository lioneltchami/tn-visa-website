import { existsSync } from 'fs'
import { join, resolve } from 'path'
import { describe, expect, it } from 'vitest'
import {
  ALL_PRODUCTS,
  allProductFiles,
  formatPrice,
  getProduct,
  isProductId,
  PRODUCTS,
} from '@/lib/products'

const SOURCE_DIR = resolve(__dirname, '../../../products')

describe('product catalog', () => {
  it('exposes every product with a price and at least one file', () => {
    for (const product of ALL_PRODUCTS) {
      expect(product.priceCents).toBeGreaterThan(0)
      expect(product.files.length).toBeGreaterThan(0)
      expect(product.features.length).toBeGreaterThan(0)
    }
  })

  it('points every file at markdown that exists on disk', () => {
    for (const file of allProductFiles()) {
      expect(file.filename.endsWith('.pdf')).toBe(true)
      expect(file.path.endsWith('.pdf')).toBe(true)

      for (const source of file.sources) {
        expect(existsSync(join(SOURCE_DIR, source)), `missing ${source}`).toBe(true)
      }
    }
  })

  it('bundles the interview kit and letter pack into the complete guide', () => {
    const completePaths = PRODUCTS['complete-guide'].files.map((file) => file.path)

    expect(completePaths).toContain(PRODUCTS['interview-kit'].files[0].path)
    expect(completePaths).toContain(PRODUCTS['letter-templates'].files[0].path)
  })

  it('deduplicates shared files', () => {
    const paths = allProductFiles().map((file) => file.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('validates product ids', () => {
    expect(isProductId('interview-kit')).toBe(true)
    expect(isProductId('free-lunch')).toBe(false)
    expect(getProduct('letter-templates')?.priceCents).toBe(2900)
    expect(getProduct({ id: 'interview-kit' })).toBeNull()
  })

  it('formats prices as whole dollars', () => {
    expect(formatPrice(4900)).toBe('$49')
  })
})
