import { apiFetch } from './api'
import type { AuthResponse, LoginDto, RegisterDto } from '../types/auth'

export function login(dto: LoginDto) {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(dto),
  })
}

export function register(dto: RegisterDto) {
  return apiFetch<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(dto),
  })
}
