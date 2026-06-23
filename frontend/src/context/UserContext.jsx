import { createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const API = import.meta.env.VITE_API_URL

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/api/currentUser`)
      if (response.data.status) {
        setUser(response.data)
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [API])

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  const logout = async () => {
    try {
      await axios.post(`${API}/api/logout`)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
    }
  }

  return (
    <UserContext.Provider value={{ user, loading, logout, refetchUser: fetchCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}
