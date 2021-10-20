import { User } from '../types/user'

export const POKEMONS_PER_PAGE = 12
export const CURRENT_USER_STORAGE_KEY = 'pokedex__user'
export const FAVORITE_POKEMONS_STORAGE_KEY = 'pokedex__favorites'

export const DUMMY_USERS: User[] = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Doe' },
  { id: 3, firstName: 'Will', lastName: 'Smith' },
]
