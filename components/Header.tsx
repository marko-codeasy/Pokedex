import { ChangeEvent, useEffect, useState } from 'react'
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
    <div className="flex justify-center pt-4">
      <PokemonLogo />

      <div className="absolute right-0 mr-2">
        <select
          className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg mr-2"
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
