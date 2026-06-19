const API_URL = 'http://localhost:8000'
const HTTP_NO_CONTENT = 204

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem('access_token')

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    const message = body?.message ?? res.statusText
    throw new ApiError(Array.isArray(message) ? message.join(', ') : message, res.status)
  }

  if (res.status === HTTP_NO_CONTENT) return undefined as T

  return res.json() as Promise<T>
}
