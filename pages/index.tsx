import { useEffect, useRef, useState, useContext } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useLazyQuery } from '@apollo/client'

import client from '../graphql/client'
import { GET_POKEMONS } from '../graphql/query/get-pokemons'
import { POKEMONS_PER_PAGE } from '../util/constants'
import { GetPokemonsQueryData, Pokemon, toPokemonModel } from '../types/pokemon'
import PokemonCard from '../components/PokemonCard'
import SearchBar, { SearchEvent } from '../components/SearchBar'
import Paginator from '../components/Paginator'
import { Pagination } from '../types/pagination'
import { useFavoritePokemons } from '../hooks/use-favorite-pokemons'
import { UserContext } from '../providers/UserProvider'

interface Props {
  pokemons: Pokemon[]
  pokemonCount: number
}

const Home: NextPage<Props> = ({ pokemons: initialPokemons, pokemonCount }: Props) => {
  const isMounted = useRef(false)
  const { currentUser } = useContext(UserContext)
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons)
  const [favoritePokemons, toggleFavoritePokemon] = useFavoritePokemons(currentUser && currentUser.id)
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: POKEMONS_PER_PAGE,
    total: pokemonCount,
  })
  const [searchFilter, setSearchFilter] = useState<SearchEvent>({ searchTerm: '', selectedType: '', sortOrder: '' })

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
    const { searchTerm, selectedType, sortOrder } = searchFilter
    getPokemons({
      variables: {
        offset: (pagination.page - 1) * POKEMONS_PER_PAGE,
        orderBy: { ...(!!sortOrder && { name: sortOrder }) },
        where: {
          name: { _iregex: `^${searchTerm}` },
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
  }, [pagination.page, searchFilter.searchTerm, searchFilter.selectedType, searchFilter.sortOrder])

  const handleSearch = (searchEvent: Partial<SearchEvent>) => {
    setPagination({ ...pagination, page: 1 })
    setSearchFilter({ ...searchFilter, ...searchEvent })
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Poxed using PokeAPI GraphQL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <SearchBar {...searchFilter} onSearch={handleSearch} />
        <div className="flex justify-center h-14">
          <Paginator {...pagination} onPageChange={(page) => setPagination({ ...pagination, page })} />
        </div>
        <section style={{ opacity: loading ? 0.5 : 1 }}>
          {pokemons.length > 0 ? (
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
          ) : (
            <span className="flex justify-center text-xl font-semibold mt-8">No Pokemon found</span>
          )}
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
