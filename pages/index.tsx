import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent } from 'react'

import client from '../graphql/client'
import { GET_POKEMONS } from '../graphql/query/get-pokemons'
import { Pokemon } from '../models/pokemon'

interface HomeProps {
  pokemons: Pokemon[]
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const Home: NextPage<HomeProps> = ({ pokemons }: HomeProps) => {
  return (
    <div className="min-h-screen bg-blue-200">
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Poxed using PokeAPI GraphQL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        <img
          className="object-center object-cover h-24"
          src="https://www.pinclipart.com/picdir/big/379-3791327_pokemon-logos-png-vector-pokemon-logo-transparent-background.png"
          alt="logo"
        />
      </div>
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
            <div
              key={pokemon.id}
              className="w-full bg-white rounded-lg p-4 flex flex-col justify-center items-center shadow"
            >
              <div className="mb-2">
                <img
                  className="object-center object-cover rounded-full h-36 w-36"
                  src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`}
                  alt="photo"
                />
              </div>
              <div className="text-center mb-4">
                <p className="text-xl text-gray-700 font-bold mb-2">{capitalize(pokemon.name)}</p>
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="inline-block rounded-full text-gray-600 bg-gray-100 px-2 py-1 text-xss font-bold mr-3"
                  >
                    {type.toUpperCase()}
                  </span>
                ))}
              </div>
              <div>
                <label className="flex justify-start items-start">
                  <div className="bg-white border-2 rounded border-gray-300 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-300">
                    <input type="checkbox" className="opacity-0 absolute cursor-pointer" />
                    <svg className="fill-current hidden w-4 h-4 text-blue-300 pointer-events-none" viewBox="0 0 20 20">
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  </div>
                  <div className="select-none text-gray-400 cursor-pointer">Captured</div>
                </label>
              </div>
            </div>
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
