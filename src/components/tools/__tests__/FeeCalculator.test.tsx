import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FeeCalculator from '../FeeCalculator'

describe('FeeCalculator', () => {
  it('renders with default POE land border fees', () => {
    render(<FeeCalculator />)
    expect(screen.getByText('POE Processing Fee')).toBeInTheDocument()
    // Total shown in the gradient-text span
    expect(screen.getByText('$80')).toBeInTheDocument()
  })

  it('shows only processing fee for airport', () => {
    render(<FeeCalculator />)
    fireEvent.change(screen.getByDisplayValue('POE — Land Border'), { target: { value: 'poe-airport' } })
    // $50 appears in both line item and total
    expect(screen.getAllByText('$50')).toHaveLength(2)
    expect(screen.queryByText('I-94 (Land Border)')).not.toBeInTheDocument()
  })

  it('shows I-129 fees for large employer', () => {
    render(<FeeCalculator />)
    fireEvent.change(screen.getByDisplayValue('POE — Land Border'), { target: { value: 'i-129' } })
    // $1,615 appears in both line item and total
    expect(screen.getAllByText('$1,615')).toHaveLength(2)
  })

  it('adds premium processing fee', () => {
    render(<FeeCalculator />)
    const toggleLabel = screen.getByText('Premium Processing ($2,965)')
    const toggle = toggleLabel.closest('div')!.querySelector('button')!
    fireEvent.click(toggle)
    expect(screen.getByText('$3,045')).toBeInTheDocument()
  })

  it('calculates dependent fees', () => {
    render(<FeeCalculator />)
    const increaseBtn = screen.getByLabelText('Increase dependents')
    fireEvent.click(increaseBtn)
    fireEvent.click(increaseBtn)
    expect(screen.getByText('$140')).toBeInTheDocument()
  })

  it('does not charge dependents at airport', () => {
    render(<FeeCalculator />)
    const increaseBtn = screen.getByLabelText('Increase dependents')
    fireEvent.click(increaseBtn)
    fireEvent.change(screen.getByDisplayValue('Land Border ($30/person)'), { target: { value: 'airport' } })
    // $80 appears only as total (50 + 30 for main applicant)
    expect(screen.getByText('$80')).toBeInTheDocument()
  })
})
