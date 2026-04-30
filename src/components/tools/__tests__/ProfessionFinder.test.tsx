import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProfessionFinder from '../ProfessionFinder'

describe('ProfessionFinder', () => {
  it('renders search input and category filters', () => {
    render(<ProfessionFinder />)
    expect(screen.getByLabelText('Search professions')).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Filter by category' })).toBeInTheDocument()
  })

  it('shows all 63 professions by default', () => {
    render(<ProfessionFinder />)
    expect(screen.getByText('63 professions found')).toBeInTheDocument()
  })

  it('filters by search text', () => {
    render(<ProfessionFinder />)
    fireEvent.change(screen.getByLabelText('Search professions'), { target: { value: 'engineer' } })
    expect(screen.queryByText('63 professions found')).not.toBeInTheDocument()
    expect(screen.getByText('Engineer')).toBeInTheDocument()
  })

  it('filters by category', () => {
    render(<ProfessionFinder />)
    fireEvent.click(screen.getByRole('button', { name: 'Medical' }))
    expect(screen.getByText('12 professions found')).toBeInTheDocument()
  })

  it('shows empty state for no matches', () => {
    render(<ProfessionFinder />)
    fireEvent.change(screen.getByLabelText('Search professions'), { target: { value: 'xyznonexistent' } })
    expect(screen.getByText('0 professions found')).toBeInTheDocument()
  })

  it('expands accordion on click', () => {
    render(<ProfessionFinder />)
    const firstButton = screen.getAllByRole('button').find(b => b.getAttribute('aria-expanded') !== null)
    expect(firstButton).toHaveAttribute('aria-expanded', 'false')
    if (firstButton) fireEvent.click(firstButton)
    expect(firstButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses accordion on second click', () => {
    render(<ProfessionFinder />)
    const firstButton = screen.getAllByRole('button').find(b => b.getAttribute('aria-expanded') !== null)
    if (firstButton) {
      fireEvent.click(firstButton)
      expect(firstButton).toHaveAttribute('aria-expanded', 'true')
      fireEvent.click(firstButton)
      expect(firstButton).toHaveAttribute('aria-expanded', 'false')
    }
  })

  it('searches by common job title', () => {
    render(<ProfessionFinder />)
    fireEvent.change(screen.getByLabelText('Search professions'), { target: { value: 'Software' } })
    expect(screen.getByText('Engineer')).toBeInTheDocument()
  })
})
