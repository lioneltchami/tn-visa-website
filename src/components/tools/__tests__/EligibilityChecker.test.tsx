import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EligibilityChecker from '../EligibilityChecker'

describe('EligibilityChecker', () => {
  it('renders the first step asking about citizenship', () => {
    render(<EligibilityChecker />)
    expect(screen.getByText('What is your citizenship?')).toBeInTheDocument()
  })

  it('shows three citizenship options', () => {
    render(<EligibilityChecker />)
    expect(screen.getByText(/Canadian Citizen/)).toBeInTheDocument()
    expect(screen.getByText(/Mexican Citizen/)).toBeInTheDocument()
    expect(screen.getByText(/Other Nationality/)).toBeInTheDocument()
  })

  it('disables Continue when no option selected', () => {
    render(<EligibilityChecker />)
    expect(screen.getByText('Continue')).toBeDisabled()
  })

  it('enables Continue after selecting citizenship', () => {
    render(<EligibilityChecker />)
    fireEvent.click(screen.getByText(/Canadian Citizen/))
    expect(screen.getByText('Continue')).not.toBeDisabled()
  })

  it('progresses to job offer step', () => {
    render(<EligibilityChecker />)
    fireEvent.click(screen.getByText(/Canadian Citizen/))
    fireEvent.click(screen.getByText('Continue'))
    expect(screen.getByText(/Do you have a job offer/)).toBeInTheDocument()
  })

  it('progresses to education step', () => {
    render(<EligibilityChecker />)
    fireEvent.click(screen.getByText(/Canadian Citizen/))
    fireEvent.click(screen.getByText('Continue'))
    fireEvent.click(screen.getByText(/Yes, I have a job offer/))
    fireEvent.click(screen.getByText('Continue'))
    expect(screen.getByText('What is your highest education?')).toBeInTheDocument()
  })

  it('progresses to profession search step', () => {
    render(<EligibilityChecker />)
    fireEvent.click(screen.getByText(/Canadian Citizen/))
    fireEvent.click(screen.getByText('Continue'))
    fireEvent.click(screen.getByText(/Yes, I have a job offer/))
    fireEvent.click(screen.getByText('Continue'))
    fireEvent.click(screen.getByText("Bachelor's Degree"))
    fireEvent.click(screen.getByText('Continue'))
    expect(screen.getByText('Find your TN profession')).toBeInTheDocument()
  })

  it('shows search results when typing', () => {
    render(<EligibilityChecker />)
    // Navigate to step 3
    fireEvent.click(screen.getByText(/Canadian Citizen/))
    fireEvent.click(screen.getByText('Continue'))
    fireEvent.click(screen.getByText(/Yes, I have a job offer/))
    fireEvent.click(screen.getByText('Continue'))
    fireEvent.click(screen.getByText("Bachelor's Degree"))
    fireEvent.click(screen.getByText('Continue'))
    // Search
    fireEvent.change(screen.getByLabelText('Search professions'), { target: { value: 'engineer' } })
    expect(screen.getByText('Engineer')).toBeInTheDocument()
  })
})
