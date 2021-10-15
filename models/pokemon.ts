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

export interface Pokemon {
  id: number
  name: string
  types: string[]
}
