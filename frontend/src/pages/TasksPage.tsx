import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ApiError } from '../lib/api'
import * as tasksApi from '../lib/tasks'
import type { Status } from '../types/task'
import { KanbanColumn } from '../components/KanbanColumn'
import { useTaskStore } from '../store/taskStore'

const COLUMNS: { status: Status; label: string }[] = [
  { status: 'TODO', label: 'To Do' },
  { status: 'IN_PROGRESS', label: 'In Progress' },
  { status: 'DONE', label: 'Done' },
]

export function TasksPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const tasks = useTaskStore((state) => state.tasks)
  const setTasks = useTaskStore((state) => state.setTasks)
  const addTask = useTaskStore((state) => state.addTask)
  const updateTask = useTaskStore((state) => state.updateTask)
  const removeTask = useTaskStore((state) => state.removeTask)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    tasksApi
      .getTasks()
      .then(setTasks)
      .catch((err) => setError(err instanceof ApiError ? err.message : 'Failed to load tasks'))
      .finally(() => setLoading(false))
  }, [setTasks])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const task = await tasksApi.createTask({
        title,
        description: description || undefined,
      })
      addTask(task)
      setTitle('')
      setDescription('')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to create task')
    }
  }

  async function handleStatusChange(id: string, status: Status) {
    setError(null)
    try {
      const updated = await tasksApi.updateTask(id, { status })
      updateTask(id, updated)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update task')
    }
  }

  async function handleDelete(id: string) {
    setError(null)
    try {
      await tasksApi.deleteTask(id)
      removeTask(id)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to delete task')
    }
  }

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <h1>Tasks</h1>
        <button type="button" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <form className="new-task-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add task</button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="kanban-board">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.status}
              label={column.label}
              tasks={tasks.filter((task) => task.status === column.status)}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
