import { render, screen } from '@testing-library/react'
import Paginator from '../components/Paginator'

const mockedPaginatorOptions = { page: 1, perPage: 12, total: 100 }

describe('Test rendering Paginator component', () => {
  beforeEach(() => {
    render(
      <Paginator
        page={mockedPaginatorOptions.page}
        perPage={mockedPaginatorOptions.perPage}
        total={mockedPaginatorOptions.total}
        onPageChange={() => {}}
      />
    )
  })

  it('render disabled paginator button', () => {
    const prevButton = screen.getByText('Prev')

    expect(prevButton).toHaveAttribute('disabled')
  })

  it('render enabled paginator button', () => {
    const nextButton = screen.getByText('Next')

    expect(nextButton).not.toHaveAttribute('disabled')
  })
})
