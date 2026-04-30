import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EmailCapture from '../EmailCapture'

describe('EmailCapture', () => {
  it('renders banner variant with title', () => {
    render(<EmailCapture variant="banner" title="Subscribe Now" description="Get updates" />)
    expect(screen.getByText('Subscribe Now')).toBeInTheDocument()
    expect(screen.getByText('Get updates')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
  })

  it('renders inline variant', () => {
    render(<EmailCapture variant="inline" title="Stay Updated" />)
    expect(screen.getByText('Stay Updated')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
  })

  it('has required email input', () => {
    render(<EmailCapture variant="inline" />)
    expect(screen.getByPlaceholderText('your@email.com')).toBeRequired()
  })
})
