import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LetterBuilder from '../LetterBuilder'

describe('LetterBuilder', () => {
  it('renders the first step with profession select', () => {
    render(<LetterBuilder />)
    expect(screen.getByText('Select TN Profession')).toBeInTheDocument()
    expect(screen.getByText('Employer Letter Builder')).toBeInTheDocument()
  })

  it('disables Next when no profession selected', () => {
    render(<LetterBuilder />)
    expect(screen.getByText('Next')).toBeDisabled()
  })

  it('enables Next after selecting a profession', () => {
    render(<LetterBuilder />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Engineer' } })
    expect(screen.getByText('Next')).not.toBeDisabled()
  })

  it('shows profession details after selection', () => {
    render(<LetterBuilder />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Engineer' } })
    expect(screen.getByText(/USMCA Name:/)).toBeInTheDocument()
  })

  it('progresses to company step', () => {
    render(<LetterBuilder />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Accountant' } })
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Company Information')).toBeInTheDocument()
  })
})
