import type { Status, Task } from '../types/task'

const STATUS_LABELS: Record<Status, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

const ALL_STATUSES: Status[] = ['TODO', 'IN_PROGRESS', 'DONE']

interface TaskCardProps {
  task: Task
  onStatusChange: (id: string, status: Status) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const otherStatuses = ALL_STATUSES.filter((status) => status !== task.status)

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <div className="task-card-actions">
        {otherStatuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusChange(task.id, status)}
          >
            Move to {STATUS_LABELS[status]}
          </button>
        ))}
        <button
          type="button"
          className="delete"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
