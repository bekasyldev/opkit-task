import { createContext } from 'react'
import type { LoginDto, RegisterDto } from '../types/auth'

export interface AuthContextValue {
  token: string | null
  login: (dto: LoginDto) => Promise<void>
  register: (dto: RegisterDto) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
