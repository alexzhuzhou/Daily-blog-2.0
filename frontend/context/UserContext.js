'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    }
  }, [user, token])

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
