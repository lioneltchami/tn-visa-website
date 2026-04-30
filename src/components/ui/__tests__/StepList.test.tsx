import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StepList } from '../StepList'

describe('StepList', () => {
  const steps = [
    { title: 'Step One', description: 'First description' },
    { title: 'Step Two', description: 'Second description' },
  ]

  it('renders all steps', () => {
    render(<StepList steps={steps} />)
    expect(screen.getByText('Step One')).toBeInTheDocument()
    expect(screen.getByText('Step Two')).toBeInTheDocument()
  })

  it('renders step numbers', () => {
    render(<StepList steps={steps} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('renders descriptions', () => {
    render(<StepList steps={steps} />)
    expect(screen.getByText('First description')).toBeInTheDocument()
    expect(screen.getByText('Second description')).toBeInTheDocument()
  })
})
