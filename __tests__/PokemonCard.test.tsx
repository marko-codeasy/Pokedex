import { render, screen } from '@testing-library/react'
import PokemonCard from '../components/PokemonCard'

const mockedPokemon = {
  id: 1,
  name: 'bulbasaur',
  types: ['grass', 'poison'],
  stats: { hp: 45, attack: 49, defense: 49, 'special-attack': 65, 'special-defense': 65, speed: 45 },
}

describe('Test rendering PokemonCard component', () => {
  beforeEach(() => {
    render(
      <PokemonCard
        id={mockedPokemon.id}
        name={mockedPokemon.name}
        types={mockedPokemon.types}
        stats={mockedPokemon.stats}
        captured={false}
      />
    )
  })

  it('render type 1', () => {
    const pokemonType = screen.getByText('GRASS')

    expect(pokemonType).toBeInTheDocument()
  })

  it('render type 2', () => {
    const pokemonType = screen.getByText('POISON')

    expect(pokemonType).toBeInTheDocument()
  })

  it('render name', () => {
    const pokemonName = screen.getByText('Bulbasaur')

    expect(pokemonName).toBeInTheDocument()
  })

  it('render pokemon image', () => {
    const image = screen.getByRole('img')

    expect(image).toHaveAttribute('alt', 'bulbasaur')
  })
})
