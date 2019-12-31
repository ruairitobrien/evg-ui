import React, { createContext, useState, useEffect } from 'react'
import { init } from './identity'
import User from 'user/User'
import Auth from './Auth'
export const AuthContext = createContext({} as Auth)

interface AuthContextProviderProps {
  children: any
}

const toUser = (loggedInUser: any): User | undefined => {
  if (loggedInUser) {
    return {
      email: loggedInUser.email,
      user_metadata: {
        avatar_url: loggedInUser.avatar_url,
        full_name: loggedInUser.full_name
      }
    }
  } else {
    return undefined
  }
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const initializeAuth = () => {
      const auth = init()
      const loggedInUser = toUser(auth.currentUser())

      if (loggedInUser) {
        setUser(loggedInUser)
      } else {
        auth.open()
      }

      auth.on('login', user => setUser(toUser(user)))
      auth.on('error', err => console.log('Auth error', err))
      auth.on('logout', () => {
        setUser(undefined)
        auth.open()
      })
    }

    initializeAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider
