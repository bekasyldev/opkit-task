import { useState } from 'react'
import type { ReactNode } from 'react'
import * as authApi from '../lib/auth'
import type { LoginDto, RegisterDto } from '../types/auth'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('access_token'),
  )

  function persist(accessToken: string) {
    localStorage.setItem('access_token', accessToken)
    setToken(accessToken)
  }

  async function login(dto: LoginDto) {
    const res = await authApi.login(dto)
    persist(res.access_token)
  }

  async function register(dto: RegisterDto) {
    const res = await authApi.register(dto)
    persist(res.access_token)
  }

  function logout() {
    localStorage.removeItem('access_token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
