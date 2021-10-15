import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent } from 'react'

import client from '../graphql/client'
import { GET_POKEMONS } from '../graphql/query/get-pokemons'
import { Pokemon } from '../models/pokemon'
import PokemonCard from '../components/PokemonCard'
import PokemonLogo from '../components/PokemonLogo'

interface HomeProps {
  pokemons: Pokemon[]
}

const Home: NextPage<HomeProps> = ({ pokemons }: HomeProps) => {
  return (
    <div className="min-h-screen bg-blue-200">
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Poxed using PokeAPI GraphQL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokemonLogo />
      <form
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-4"
        onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}
      >
        <div className="flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
          <input className="text-base text-gray-500 flex-grow outline-none px-2 " type="text" placeholder="Search..." />
          <div className="flex items-center rounded-lg mx-auto ">
            <button className="bg-blue-400 text-white text-base rounded-lg px-4 py-2 font-thin">Search</button>
          </div>
        </div>
      </form>
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
  const { data } = await client.query<any>({
    query: GET_POKEMONS,
    variables: {
      orderBy: {
        id: 'asc',
      },
      offset: 0,
      limit: 18,
    },
  })

  const pokemons = data.pokemons.map(({ id, name, stats }: any) => ({
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
