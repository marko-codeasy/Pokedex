import { useEffect, useState } from 'react'

const FAVORITE_POKEMONS_STORAGE_KEY = 'favorite-pokemons'

export function useFavoritePokemons(userId: number) {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(getFavoritePokemonsPerUser())
  }, [userId])

  const getFavoritePokemonsFromStorage = (): Record<string, number[]> | never => {
    const favoritePokemonsStorage = localStorage.getItem(FAVORITE_POKEMONS_STORAGE_KEY)

    return favoritePokemonsStorage ? (JSON.parse(favoritePokemonsStorage) as Record<string, number[]>) : {}
  }

  const saveFavoritePokemonsToStorage = (pokemons: number[]) => {
    const favoritePokemons = getFavoritePokemonsFromStorage()

    localStorage.setItem(FAVORITE_POKEMONS_STORAGE_KEY, JSON.stringify({ ...favoritePokemons, [userId]: pokemons }))
  }

  const getFavoritePokemonsPerUser = () => {
    const favoritePokemonsPerUser = getFavoritePokemonsFromStorage()

    return favoritePokemonsPerUser[userId] || []
  }

  const toggleFavoritePokemon = (pokemonId: number) => {
    try {
      let userFavoritePokemons = getFavoritePokemonsPerUser()

      const pokemonIndex = userFavoritePokemons.indexOf(pokemonId)
      if (pokemonIndex !== -1) {
        userFavoritePokemons = [
          ...userFavoritePokemons.slice(0, pokemonIndex),
          ...userFavoritePokemons.slice(pokemonIndex + 1),
        ]
      } else {
        userFavoritePokemons = [...userFavoritePokemons, pokemonId]
      }

      setFavoritePokemons(userFavoritePokemons)
      saveFavoritePokemonsToStorage(userFavoritePokemons)
    } catch (ignore) {}
  }

  return [favoritePokemons, toggleFavoritePokemon] as const
}
