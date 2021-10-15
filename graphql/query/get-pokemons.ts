import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
  query (
    $offset: Int
    $orderBy: [pokemon_v2_pokemonspecies_order_by!]
    $limit: Int
    $where: pokemon_v2_pokemonspecies_bool_exp
  ) {
    pokemons: pokemon_v2_pokemonspecies(offset: $offset, order_by: $orderBy, limit: $limit, where: $where) {
      id
      name
      stats: pokemon_v2_pokemons_aggregate(limit: 1) {
        nodes {
          height
          weight
          types: pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              name
            }
          }
        }
      }
    }
  }
`
