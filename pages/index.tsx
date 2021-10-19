import { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useLazyQuery } from '@apollo/client'

import client from '../graphql/client'
import { GET_POKEMONS } from '../graphql/query/get-pokemons'

import { GetPokemonsQueryData, Pokemon } from '../types/pokemon'
import PokemonCard from '../components/PokemonCard'
import SearchBar, { SearchEvent } from '../components/SearchBar'
import Paginator from '../components/Paginator'
import { Pagination } from '../types/pagination'

const POKEMONS_PER_PAGE = 12
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

interface PokemonFilter {
  searchTerm: string
  selectedType: string
}

interface Props {
  pokemons: Pokemon[]
  pokemonCount: number
}

const Home: NextPage<Props> = ({ pokemons: initialPokemons, pokemonCount }: Props) => {
  const isMounted = useRef(false)

  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons)
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: POKEMONS_PER_PAGE,
    total: pokemonCount,
  })
  const [filter, setFilter] = useState<PokemonFilter>({ searchTerm: '', selectedType: '' })

  const [getPokemons, { loading }] = useLazyQuery<GetPokemonsQueryData>(GET_POKEMONS, {
    variables: {
      limit: POKEMONS_PER_PAGE,
    },
    onCompleted: (data) => {
      setPokemons(data.pokemons.map(toPokemonModel))
      setPagination({ ...pagination, total: data.pokemonCount.aggregate.count })
    },
  })

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    getPokemons({
      variables: {
        offset: (pagination.page - 1) * POKEMONS_PER_PAGE,

        where: {
          name: { _iregex: `^${filter.searchTerm}` },
          pokemon_v2_pokemons: {
            pokemon_v2_pokemontypes: {
              pokemon_v2_type: {
                name: {
                  ...(filter.selectedType && { _eq: filter.selectedType }),
                },
              },
            },
          },
        },
      },
    })
  }, [pagination.page, filter])

  const handleSearch = ({ searchTerm, selectedType }: SearchEvent) => {
    setPagination({ ...pagination, page: 1 })
    setFilter({ searchTerm, selectedType })
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Poxed using PokeAPI GraphQL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <SearchBar onSearch={handleSearch} />
        {pokemons.length > 0 && (
          <div className="flex justify-center">
            <Paginator {...pagination} onPageChange={(page) => setPagination({ ...pagination, page })} />
          </div>
        )}
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
      orderBy: {
        id: 'asc',
      },
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
