import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Checklist } from '../Checklist'

describe('Checklist', () => {
  const items = ['Item 1', 'Item 2', 'Item 3']

  it('renders all items', () => {
    render(<Checklist items={items} />)
    items.forEach(item => expect(screen.getByText(item)).toBeInTheDocument())
  })

  it('renders title when provided', () => {
    render(<Checklist items={items} title="My List" />)
    expect(screen.getByText('My List')).toBeInTheDocument()
  })

  it('toggles checkbox on click', () => {
    render(<Checklist items={items} />)
    const checkbox = screen.getAllByRole('checkbox')[0]
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
    fireEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('toggles checkbox on Enter key', () => {
    render(<Checklist items={items} />)
    const checkbox = screen.getAllByRole('checkbox')[0]
    fireEvent.keyDown(checkbox, { key: 'Enter' })
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('toggles checkbox on Space key', () => {
    render(<Checklist items={items} />)
    const checkbox = screen.getAllByRole('checkbox')[0]
    fireEvent.keyDown(checkbox, { key: ' ' })
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('updates progress count', () => {
    render(<Checklist items={items} />)
    expect(screen.getByText('0 of 3 completed')).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('checkbox')[0])
    expect(screen.getByText('1 of 3 completed')).toBeInTheDocument()
  })

  it('has progressbar with correct values', () => {
    render(<Checklist items={items} />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuemin', '0')
    expect(progressbar).toHaveAttribute('aria-valuemax', '3')
    expect(progressbar).toHaveAttribute('aria-valuenow', '0')
  })
})
