export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE'

export interface Task {
  id: string
  title: string
  description: string | null
  status: Status
  userId: string
  createdAt: string
  updatedAt: string
}

export interface CreateTaskDto {
  title: string
  description?: string
}

export interface UpdateTaskDto {
  title?: string
  description?: string
  status?: Status
}
