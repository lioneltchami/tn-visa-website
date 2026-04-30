import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SPTCalculator from '../SPTCalculator'

describe('SPTCalculator', () => {
  it('renders with empty state', () => {
    render(<SPTCalculator />)
    expect(screen.getByText('Substantial Presence Test')).toBeInTheDocument()
    expect(screen.queryByText('Formula')).not.toBeInTheDocument()
  })

  it('shows result when days entered', () => {
    render(<SPTCalculator />)
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '183' } })
    expect(screen.getByText('Formula')).toBeInTheDocument()
  })

  it('calculates non-resident correctly', () => {
    render(<SPTCalculator />)
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '120' } })
    fireEvent.change(inputs[1], { target: { value: '120' } })
    fireEvent.change(inputs[2], { target: { value: '120' } })
    expect(screen.getByText('You are NOT a U.S. tax resident')).toBeInTheDocument()
  })

  it('identifies tax resident when threshold met', () => {
    render(<SPTCalculator />)
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '183' } })
    fireEvent.change(inputs[1], { target: { value: '0' } })
    fireEvent.change(inputs[2], { target: { value: '0' } })
    expect(screen.getByText('You ARE a U.S. tax resident')).toBeInTheDocument()
  })

  it('requires 31 days in current year', () => {
    render(<SPTCalculator />)
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '20' } })
    fireEvent.change(inputs[1], { target: { value: '365' } })
    fireEvent.change(inputs[2], { target: { value: '365' } })
    expect(screen.getByText('You are NOT a U.S. tax resident')).toBeInTheDocument()
  })
})
