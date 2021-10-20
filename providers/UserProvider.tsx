import React, { createContext, useState, useEffect, FC } from 'react'

import { CURRENT_USER_STORAGE_KEY, DUMMY_USERS } from '../util/constants'
import { User } from '../types/user'

type UserContextState = {
  currentUser: User
  setCurrentUser: (user: User) => void
}

const contextDefaultValues: UserContextState = {
  currentUser: DUMMY_USERS[0],
  setCurrentUser: () => undefined,
}

export const UserContext = createContext<UserContextState>(contextDefaultValues)

const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState(DUMMY_USERS[0])

  useEffect(() => {
    const storedCurrentUserString = localStorage.getItem(CURRENT_USER_STORAGE_KEY)
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
          localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user))
          setUser(user)
        },
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
