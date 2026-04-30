import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FaqAccordion from '../FaqAccordion'

const sections = [{
  title: 'General',
  items: [
    { question: 'Question 1?', answer: 'Answer 1' },
    { question: 'Question 2?', answer: 'Answer 2' },
  ],
}]

describe('FaqAccordion', () => {
  it('renders section title and questions', () => {
    render(<FaqAccordion sections={sections} />)
    expect(screen.getByText('General')).toBeInTheDocument()
    expect(screen.getByText('Question 1?')).toBeInTheDocument()
    expect(screen.getByText('Question 2?')).toBeInTheDocument()
  })

  it('expands answer on click', () => {
    render(<FaqAccordion sections={sections} />)
    const btn = screen.getByText('Question 1?')
    expect(btn.closest('button')).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(btn)
    expect(btn.closest('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses on second click', () => {
    render(<FaqAccordion sections={sections} />)
    const btn = screen.getByText('Question 1?')
    fireEvent.click(btn)
    fireEvent.click(btn)
    expect(btn.closest('button')).toHaveAttribute('aria-expanded', 'false')
  })
})
