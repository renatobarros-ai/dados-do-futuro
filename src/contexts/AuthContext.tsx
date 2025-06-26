/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (username: string, password: string): boolean => {
    const validUsername = import.meta.env.VITE_AUTH_USERNAME || 'massa'
    const validPassword = import.meta.env.VITE_AUTH_PASSWORD || 'sohipren'
    
    if (username === validUsername && password === validPassword) {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
