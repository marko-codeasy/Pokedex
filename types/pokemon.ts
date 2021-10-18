export interface Pokemon {
  id: number
  name: string
  types: string[]
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

/* TODO: generate graphql types using apollo codegen */
export interface GetPokemonsQueryData {
  pokemons: {
    id: number
    name: string
    stats: {
      nodes: {
        height: number
        weight: number
        types: {
          type: {
            name: string
          }
        }[]
      }[]
    }
  }[]
}
