import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ComparisonTable } from '../ComparisonTable'

describe('ComparisonTable', () => {
  const props = {
    headers: ['Feature', 'Option A', 'Option B'],
    rows: [
      { label: 'Speed', values: ['Fast', 'Slow'] },
      { label: 'Cost', values: ['$10', '$20'] },
    ],
  }

  it('renders headers', () => {
    render(<ComparisonTable {...props} />)
    expect(screen.getByText('Feature')).toBeInTheDocument()
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })

  it('renders row labels and values', () => {
    render(<ComparisonTable {...props} />)
    expect(screen.getByText('Speed')).toBeInTheDocument()
    expect(screen.getByText('Fast')).toBeInTheDocument()
    expect(screen.getByText('$20')).toBeInTheDocument()
  })

  it('renders a table element', () => {
    render(<ComparisonTable {...props} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})
