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
    <div>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Poxed using PokeAPI GraphQL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{<pre>{JSON.stringify(pokemons, null, 2)}</pre>}</main>
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
      limit: 20,
    },
  })

  return {
    props: {
      pokemons: data.pokemons,
    },
  }
}

export default Home
