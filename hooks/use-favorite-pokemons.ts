import { useEffect, useState } from 'react'

import { FAVORITE_POKEMONS_STORAGE_KEY } from '../util/constants'

export function useFavoritePokemons(userId: number) {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(getFavoritePokemonsByUser())
  }, [userId])

  const getFavoritePokemonsFromStorage = (): Record<string, number[]> | never => {
    const favoritePokemonsStorage = localStorage.getItem(FAVORITE_POKEMONS_STORAGE_KEY)
    return favoritePokemonsStorage ? (JSON.parse(favoritePokemonsStorage) as Record<string, number[]>) : {}
  }

  const saveFavoritePokemonsToStorage = (pokemons: number[]) => {
    const favoritePokemons = getFavoritePokemonsFromStorage()
    localStorage.setItem(FAVORITE_POKEMONS_STORAGE_KEY, JSON.stringify({ ...favoritePokemons, [userId]: pokemons }))
  }

  const getFavoritePokemonsByUser = () => {
    const favoritePokemonsByUser = getFavoritePokemonsFromStorage()
    return favoritePokemonsByUser[userId] || []
  }

  const toggleFavoritePokemon = (pokemonId: number) => {
    try {
      let userFavoritePokemons = getFavoritePokemonsByUser()

      const pokemon = userFavoritePokemons.find((id) => id === pokemonId)
      if (pokemon) {
        userFavoritePokemons = userFavoritePokemons.filter((id) => id !== pokemonId)
      } else {
        userFavoritePokemons = [...userFavoritePokemons, pokemonId]
      }

      setFavoritePokemons(userFavoritePokemons)
      saveFavoritePokemonsToStorage(userFavoritePokemons)
    } catch (ignore) {}
  }

  return [favoritePokemons, toggleFavoritePokemon] as const
}
