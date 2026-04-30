import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EligibilityChecker from '../EligibilityChecker'

describe('EligibilityChecker', () => {
  it('renders first question', () => {
    render(<EligibilityChecker />)
    expect(screen.getByText('Are you a Canadian citizen?')).toBeInTheDocument()
  })

  it('progresses through steps when answering yes', () => {
    render(<EligibilityChecker />)
    fireEvent.click(screen.getByText('Yes'))
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Do you have a job offer from a U.S. employer?')).toBeInTheDocument()
  })

  it('disables next when no answer selected', () => {
    render(<EligibilityChecker />)
    const nextBtn = screen.getByText('Next')
    expect(nextBtn).toBeDisabled()
  })

  it('enables next after selecting answer', () => {
    render(<EligibilityChecker />)
    fireEvent.click(screen.getByText('Yes'))
    const nextBtn = screen.getByText('Next')
    expect(nextBtn).not.toBeDisabled()
  })

  it('shows not eligible if not Canadian', () => {
    render(<EligibilityChecker />)
    // Step 1: Not Canadian
    fireEvent.click(screen.getByText('No'))
    fireEvent.click(screen.getByText('Next'))
    // Step 2: Has job offer
    fireEvent.click(screen.getByText('Yes'))
    fireEvent.click(screen.getByText('Next'))
    // Step 3: Education
    fireEvent.click(screen.getByText("Bachelor's"))
    fireEvent.click(screen.getByText('Next'))
    // Step 4: Field
    fireEvent.change(screen.getByPlaceholderText(/Computer Science/), { target: { value: 'Computer Science' } })
    fireEvent.click(screen.getByText('Next'))
    // Step 5: Title
    fireEvent.change(screen.getByPlaceholderText(/Software Engineer/), { target: { value: 'Software Engineer' } })
    fireEvent.click(screen.getByText('See Results'))
    expect(screen.getByText('Not Eligible')).toBeInTheDocument()
  })
})
