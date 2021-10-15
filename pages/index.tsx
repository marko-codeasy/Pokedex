import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useLazyQuery } from '@apollo/client'

import client from '../graphql/client'
import { GET_POKEMONS } from '../graphql/query/get-pokemons'

import { GetPokemonsQueryData, Pokemon } from '../models/pokemon'
import PokemonCard from '../components/PokemonCard'
import PokemonLogo from '../components/PokemonLogo'
import SearchBar from '../components/SearchBar'

const toPokemon = ({ id, name, stats }: GetPokemonsQueryData['pokemons'][0]) => ({
  id,
  name: name,
  types: stats.nodes[0].types.map((type) => type.type.name),
})

interface Props {
  pokemons: Pokemon[]
}

const Home: NextPage<Props> = ({ pokemons: initialPokemons }: Props) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons)
  const [getPokemons, { loading }] = useLazyQuery<GetPokemonsQueryData>(GET_POKEMONS, {
    variables: {
      orderBy: {
        id: 'asc',
      },
    },
    onCompleted: (data) => {
      setPokemons(data.pokemons.map(toPokemon))
    },
  })

  const handleSearch = (searchTerm: string) => {
    getPokemons({ variables: { limit: 12, offset: 0, where: { name: { _regex: `^${searchTerm}` } } } })
  }

  return (
    <div className="min-h-screen bg-blue-200">
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Poxed using PokeAPI GraphQL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokemonLogo />
      <SearchBar onSearch={handleSearch} />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-12" style={{ opacity: loading ? 0.5 : 1 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} {...pokemon} captured={false} onCaptured={(id) => alert(id)} />
          ))}
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query<GetPokemonsQueryData>({
    query: GET_POKEMONS,
    variables: {
      orderBy: {
        id: 'asc',
      },
      offset: 0,
      limit: 12,
    },
  })

  const pokemons = data.pokemons.map(toPokemon)

  return {
    props: {
      pokemons,
    },
  }
}

export default Home
