import { apiFetch } from './api'
import type { CreateTaskDto, Task, UpdateTaskDto } from '../types/task'

export function getTasks() {
  return apiFetch<Task[]>('/tasks')
}

export function createTask(dto: CreateTaskDto) {
  return apiFetch<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify(dto),
  })
}

export function updateTask(id: string, dto: UpdateTaskDto) {
  return apiFetch<Task>(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(dto),
  })
}

export function deleteTask(id: string) {
  return apiFetch<void>(`/tasks/${id}`, {
    method: 'DELETE',
  })
}
