import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useLazyQuery } from '@apollo/client'
import { GET_POKEMONS } from '../graphql/query/get-pokemons'
import { GetPokemonsQueryData, Pokemon } from '../types/pokemon'
import client from '../graphql/client'
import PokemonCard from '../components/PokemonCard'

const toPokemonModel = ({ id, name, info }: GetPokemonsQueryData['pokemons'][0]) => {
  return {
    id,
    name: name,
    types: Array.from(
      new Set(
        info.nodes
          .map((node) => node.types)
          .flat()
          .map(({ type }) => type.name)
      )
    ),
  }
}

const Favorites: NextPage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  const [getPokemons, { loading }] = useLazyQuery<GetPokemonsQueryData>(GET_POKEMONS, {
    onCompleted: (data) => {
      setPokemons(data.pokemons.map(toPokemonModel))
    },
  })

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
              <PokemonCard key={pokemon.id} {...pokemon} captured={false} onCaptured={(id) => alert(id)} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Favorites
