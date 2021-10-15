import type { NextPage } from 'next'
import Head from 'next/head'

import client from '../graphql/client'
import { GET_POKEMONS } from '../graphql/query/get-pokemons'

import { GetPokemonsQueryData, Pokemon } from '../models/pokemon'
import PokemonCard from '../components/PokemonCard'
import PokemonLogo from '../components/PokemonLogo'
import SearchBar from '../components/SearchBar'

interface Props {
  pokemons: Pokemon[]
}

const Home: NextPage<Props> = ({ pokemons }: Props) => {
  return (
    <div className="min-h-screen bg-blue-200">
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Poxed using PokeAPI GraphQL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokemonLogo />
      <SearchBar onSearch={(searchTerm) => alert(searchTerm)} />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
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

  const pokemons = data.pokemons.map(({ id, name, stats }) => ({
    id,
    name: name,
    types: stats.nodes[0].types.map((type: any) => type.type.name),
  }))

  return {
    props: {
      pokemons,
    },
  }
}

export default Home
