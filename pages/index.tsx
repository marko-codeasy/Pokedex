import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useLazyQuery } from '@apollo/client'

import client from '../graphql/client'
import { GET_POKEMONS } from '../graphql/query/get-pokemons'

import { GetPokemonsQueryData, Pokemon } from '../types/pokemon'
import PokemonCard from '../components/PokemonCard'
import PokemonLogo from '../components/PokemonLogo'
import SearchBar, { SearchEvent } from '../components/SearchBar'
import Paginator from '../components/Paginator'
import { Pagination } from '../types/pagination'

const toPokemonModel = ({ id, name, stats }: GetPokemonsQueryData['pokemons'][0]) => ({
  id,
  name: name,
  types: stats.nodes[0].types.map((type) => type.type.name),
})

const POKEMONS_PER_PAGE = 12

interface Props {
  pokemons: Pokemon[]
  pokemonCount: number
}

const Home: NextPage<Props> = ({ pokemons: initialPokemons, pokemonCount }: Props) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons)
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: POKEMONS_PER_PAGE,
    total: pokemonCount,
  })

  const [getPokemons, { loading }] = useLazyQuery<GetPokemonsQueryData>(GET_POKEMONS, {
    variables: {
      limit: POKEMONS_PER_PAGE,
    },
    onCompleted: (data) => {
      setPokemons(data.pokemons.map(toPokemonModel))
      setPagination({ ...pagination, total: data.pokemonCount.aggregate.count })
    },
  })

  const handleSearch = ({ searchTerm, selectedType }: SearchEvent) => {
    setPagination({ ...pagination, page: 0 })
    getPokemons({
      variables: {
        offset: 0,
        where: {
          name: { _regex: `^${searchTerm}` },
          pokemon_v2_pokemons: {
            pokemon_v2_pokemontypes: {
              pokemon_v2_type: {
                name: {
                  ...(selectedType && { _eq: selectedType }),
                },
              },
            },
          },
        },
      },
    })
  }

  return (
    <div className="min-h-screen bg-blue-200">
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Poxed using PokeAPI GraphQL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="mb-8">
          <PokemonLogo />
        </div>
        <SearchBar onSearch={handleSearch} />
        <div className="flex justify-center">
          <Paginator {...pagination} onPageChange={(page) => setPagination({ ...pagination, page })} />
        </div>
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

export async function getServerSideProps() {
  const { data } = await client.query<GetPokemonsQueryData>({
    query: GET_POKEMONS,
    variables: {
      offset: 0,
      limit: POKEMONS_PER_PAGE,
    },
  })

  const pokemons = data.pokemons.map(toPokemonModel)
  const pokemonCount = data.pokemonCount.aggregate.count

  return {
    props: {
      pokemons,
      pokemonCount,
    },
  }
}

export default Home
