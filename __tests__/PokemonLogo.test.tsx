import { render, screen } from '@testing-library/react'
import PokemonLogo from '../components/PokemonLogo'

describe('Test rendering PokemonLogo component', () => {
  it('logo must have src and alt', () => {
    render(<PokemonLogo />)
    const logo = screen.getByRole('img')

    expect(logo).toHaveAttribute('src')
    expect(logo).toHaveAttribute('alt', 'logo')
  })
})
