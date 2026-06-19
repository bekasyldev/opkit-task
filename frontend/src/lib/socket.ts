import { io, Socket } from 'socket.io-client'
import { useTaskStore } from '../store/taskStore'
import type { Status } from '../types/task'

const SOCKET_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

interface TaskUpdatedPayload {
  id: string
  status: Status
  timestamp: string
}

let socket: Socket | null = null

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL)

    socket.on('connect', () => console.log('[WS] connected:', socket?.id))

    socket.on('task:updated', (payload: TaskUpdatedPayload) => {
      useTaskStore.getState().updateTask(payload.id, { status: payload.status })
    })
  }
  return socket
}