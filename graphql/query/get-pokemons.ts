import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
  query (
    $offset: Int
    $limit: Int
    $where: pokemon_v2_pokemonspecies_bool_exp
    $orderBy: [pokemon_v2_pokemonspecies_order_by!]
  ) {
    pokemons: pokemon_v2_pokemonspecies(offset: $offset, limit: $limit, where: $where, order_by: $orderBy) {
      id
      name
      info: pokemon_v2_pokemons_aggregate(limit: 3) {
        nodes {
          stats: pokemon_v2_pokemonstats {
            base_stat
            stat: pokemon_v2_stat {
              name
            }
          }
          types: pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              name
            }
          }
        }
      }
    }
    pokemonCount: pokemon_v2_pokemonspecies_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`
