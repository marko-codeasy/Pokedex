import { ChangeEvent, FormEvent, useState } from 'react'

import { PokemonType } from '../types/pokemon'

export interface SearchEvent {
  searchTerm: string
  selectedType: string
}

interface Props {
  onSearch: (searchEvent: SearchEvent) => void
}

export default function SearchBar({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch({ searchTerm, selectedType })
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
        <input
          className="text-base text-gray-500 flex-grow outline-none px-2"
          type="text"
          placeholder="Search..."
          onInput={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
        />
        <div className="flex items-center rounded-lg mx-auto ">
          <select
            className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg mr-2"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedType(event.target.value)}
          >
            <option value="">All</option>
            {Object.entries(PokemonType).map(([name, value]) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
          <button className="bg-blue-400 text-white text-base rounded-lg px-4 py-2 font-thin">Search</button>
        </div>
      </div>
    </form>
  )
}
