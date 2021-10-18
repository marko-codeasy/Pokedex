import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
  query ($offset: Int, $limit: Int, $where: pokemon_v2_pokemonspecies_bool_exp) {
    pokemons: pokemon_v2_pokemonspecies(offset: $offset, limit: $limit, where: $where) {
      id
      name
      stats: pokemon_v2_pokemons_aggregate(limit: 1) {
        nodes {
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
