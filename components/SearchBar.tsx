import { ChangeEvent, FormEvent, useState } from 'react'
import classNames from 'classnames'

import { PokemonType } from '../types/pokemon'
import { SortOrder } from '../types/sort-order'

export interface SearchEvent {
  searchTerm: string
  selectedType: string
  sortOrder: SortOrder
}

interface Props {
  searchTerm: string
  sortOrder: SortOrder
  onSearch: (searchEvent: Partial<SearchEvent>) => void
}

export default function SearchBar({ searchTerm: initialSearchTerm, sortOrder, onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm)

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch({ searchTerm })
  }

  const handleSelectedType = (event: ChangeEvent<HTMLSelectElement>) => {
    onSearch({ selectedType: event.target.value })
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
        <div className="flex items-center mr-4 text-gray-300">
          <svg
            onClick={() => onSearch({ sortOrder: sortOrder !== 'asc' ? 'asc' : '' })}
            xmlns="http://www.w3.org/2000/svg"
            className={classNames('h-5 w-5 cursor-pointer', { 'text-blue-300': sortOrder === 'asc' })}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
          </svg>
          <svg
            onClick={() => onSearch({ sortOrder: sortOrder !== 'desc' ? 'desc' : '' })}
            xmlns="http://www.w3.org/2000/svg"
            className={classNames('h-5 w-5 cursor-pointer', { 'text-blue-300': sortOrder === 'desc' })}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
          </svg>
        </div>

        <input
          className="text-base text-gray-500 flex-grow outline-none px-2"
          type="text"
          placeholder="Search..."
          onInput={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
        />
        <div className="flex items-center rounded-lg mx-auto">
          <select
            className="text-base cursor-pointer text-gray-800 outline-none border-2 px-4 py-2 rounded-lg mr-2"
            onChange={handleSelectedType}
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
