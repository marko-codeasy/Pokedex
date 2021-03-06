import { useContext, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from '@apollo/client'

import { GET_POKEMONS } from '../graphql/query/get-pokemons'
import { GetPokemonsQueryData, Pokemon, toPokemonModel } from '../types/pokemon'
import PokemonCard from '../components/PokemonCard'
import { useFavoritePokemons } from '../hooks/use-favorite-pokemons'
import { UserContext } from '../providers/UserProvider'

const Favorites: NextPage = () => {
  const { currentUser } = useContext(UserContext)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [favoritePokemons, toggleFavoritePokemon] = useFavoritePokemons(currentUser.id)

  const { loading } = useQuery<GetPokemonsQueryData>(GET_POKEMONS, {
    variables: {
      where: {
        id: {
          _in: favoritePokemons,
        },
      },
    },
    onCompleted: (data) => {
      setPokemons(data.pokemons.map(toPokemonModel))
    },
  })

  if (pokemons.length === 0 && !loading) {
    return (
      <div className="min-h-screen flex justify-center text-xl font-semibold mt-12">
        You don&apos;t have captured Pokemons
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Pokedex - Favorites</title>
        <meta name="description" content="Poxed using PokeAPI GraphQL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <section style={{ opacity: loading ? 0.5 : 1 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                {...pokemon}
                captured={favoritePokemons.includes(pokemon.id)}
                onCaptured={toggleFavoritePokemon}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Favorites
