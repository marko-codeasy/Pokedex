import { ChangeEvent, useContext } from 'react'
import Link from 'next/link'

import { DUMMY_USERS } from '../util/constants'
import PokemonLogo from '../components/PokemonLogo'
import { UserContext } from '../providers/UserProvider'

export default function Header(): JSX.Element | null {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const handleSelectedUser = (event: ChangeEvent<HTMLSelectElement>) => {
    const id = Number(event.target.value)
    const user = DUMMY_USERS.find((user) => user.id === id)
    user && setCurrentUser(user)
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="flex justify-between pt-4">
      <Link href="/captured">
        <a className="bg-white hover:bg-gray-100 text-black text-base rounded-lg px-4 py-2 ml-3 h-10">Captured</a>
      </Link>

      <PokemonLogo />

      <div className="mr-3">
        <select
          className="text-base cursor-pointer text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
          value={currentUser.id}
          onChange={handleSelectedUser}
        >
          {DUMMY_USERS.map(({ id, firstName, lastName }) => (
            <option key={id} value={id}>
              {firstName} {lastName}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
