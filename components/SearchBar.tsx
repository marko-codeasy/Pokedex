import { ChangeEvent, FormEvent, useState } from 'react'

interface Props {
  onSearch: (searchTerm: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-4" onSubmit={handleSearch}>
      <div className="flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
        <input
          className="text-base text-gray-500 flex-grow outline-none px-2 "
          type="text"
          placeholder="Search..."
          onInput={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
        />
        <div className="flex items-center rounded-lg mx-auto ">
          <button className="bg-blue-400 text-white text-base rounded-lg px-4 py-2 font-thin">Search</button>
        </div>
      </div>
    </form>
  )
}
