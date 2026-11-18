import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import JobsBoard, { type JobListing } from '../JobsBoard'

const job: JobListing = {
  id: '1',
  slug: 'registered-nurse-taos',
  title: 'Registered Nurse',
  company_name: 'Taos Clinic',
  tn_profession: 'Registered Nurse',
  location: 'Taos, NM',
  salary_min: null,
  salary_max: null,
  remote_policy: 'onsite',
  employment_type: 'full_time',
  is_featured: false,
  posted_at: '2020-01-15T00:00:00.000Z',
}

describe('JobsBoard', () => {
  it('puts each job URL in the first render', () => {
    render(<JobsBoard jobs={[job]} />)

    expect(screen.queryByText('Loading jobs…')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Registered Nurse/ })).toHaveAttribute(
      'href',
      '/jobs/registered-nurse-taos'
    )
  })
})
