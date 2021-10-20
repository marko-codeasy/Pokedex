import React, { createContext, useState, useEffect, FC } from 'react'
import { User } from '../types/user'

type UserContextState = {
  currentUser: User | null
  setCurrentUser: (user: User) => void
}

const contextDefaultValues: UserContextState = {
  currentUser: null,
  setCurrentUser: () => undefined,
}

export const UserContext = createContext<UserContextState>(contextDefaultValues)

const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState({} as User)

  useEffect(() => {
    const storedCurrentUserString = localStorage.getItem('currentUser')
    if (!storedCurrentUserString) {
      return
    }

    const storedCurrentUser: User = JSON.parse(storedCurrentUserString)
    setUser(storedCurrentUser)
  }, [])

  return (
    <UserContext.Provider
      value={{
        currentUser: user,
        setCurrentUser: (user: User) => {
          localStorage.setItem('currentUser', JSON.stringify(user))
          setUser(user)
        },
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
