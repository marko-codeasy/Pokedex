export interface Pokemon {
  id: number
  name: string
  types: string[]
  stats: Record<string, number>
}

export enum PokemonType {
  Normal = 'normal',
  Fire = 'fire',
  Water = 'water',
  Grass = 'grass',
  Flying = 'flying',
  Fighting = 'fighting',
  Poison = 'poison',
  Electric = 'electric',
  Ground = 'ground',
  Rock = 'rock',
  Psychic = 'psychic',
  Ice = 'ice',
  Bug = 'bug',
  Ghost = 'ghost',
  Steel = 'steel',
  Dragon = 'dragon',
  Dark = 'dark',
  Fairy = 'fairy',
}

export const PokemonStatPrettifyMap: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Special Attack',
  'special-defense': 'Special Defense',
  speed: 'Speed',
}

/* TODO: generate graphql types using apollo codegen */
export interface GetPokemonsQueryData {
  pokemons: {
    id: number
    name: string
    info: {
      nodes: {
        height: number
        weight: number
        types: {
          type: {
            name: string
          }
        }[]
        stats: {
          base_stat: number
          stat: { name: string }
        }[]
      }[]
    }
  }[]
  pokemonCount: {
    aggregate: {
      count: number
    }
  }
}
