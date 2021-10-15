import type { NextPage } from 'next'
import Head from 'next/head'

import client from '../graphql/client'
import { GET_POKEMONS } from '../graphql/query/get-pokemons'
import { Pokemon } from '../models/pokemon'

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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pokemons.map(({ id, name }) => (
            <div key={id} className="w-full bg-white rounded-lg p-4 flex flex-col justify-center items-center shadow">
              <div className="mb-2">
                <img
                  className="object-center object-cover rounded-full h-36 w-36"
                  src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${name}.png`}
                  alt="photo"
                />
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-700 font-bold mb-2">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
                <p className="text-base text-gray-400 font-normal">Grass, Poison</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* <main>{<pre>{JSON.stringify(pokemons, null, 2)}</pre>}</main> */}
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query<{ pokemons: Pokemon[] }>({
    query: GET_POKEMONS,
    variables: {
      orderBy: {
        id: 'asc',
      },
      limit: 18,
    },
  })

  return {
    props: {
      pokemons: data.pokemons,
    },
  }
}

export default Home
