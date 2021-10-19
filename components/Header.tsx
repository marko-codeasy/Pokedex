import { ChangeEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import PokemonLogo from '../components/PokemonLogo'

interface User {
  id: number
  firstName: string
  lastName: string
}

const dummyUsers: User[] = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Doe' },
  { id: 3, firstName: 'Will', lastName: 'Smith' },
]

export default function Header(): JSX.Element | null {
  const [selectedUserId, setSelectedUserId] = useState<number>(1)

  useEffect(() => {
    const storedCurrentUserString = localStorage.getItem('currentUser')
    if (!storedCurrentUserString) {
      return
    }

    const storedCurrentUser: User = JSON.parse(storedCurrentUserString)
    setSelectedUserId(storedCurrentUser.id)
  }, [])

  const handleSelectedUser = (event: ChangeEvent<HTMLSelectElement>) => {
    const id = Number(event.target.value)
    setSelectedUserId(id)

    const user = dummyUsers.find((user) => user.id === id)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  return (
    <div className="flex justify-between pt-4">
      <Link href="/favorites">
        <a className="bg-white hover:bg-gray-100 text-black text-base rounded-lg px-4 py-2 ml-3 h-10">Favorites</a>
      </Link>

      <PokemonLogo />

      <div className="mr-3">
        <select
          className="text-base cursor-pointer text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
          value={selectedUserId}
          onChange={handleSelectedUser}
        >
          {dummyUsers.map(({ id, firstName, lastName }) => (
            <option key={id} value={id}>
              {firstName} {lastName}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
