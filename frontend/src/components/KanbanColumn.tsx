import type { Status, Task } from '../types/task'
import { TaskCard } from './TaskCard'

interface KanbanColumnProps {
  label: string
  tasks: Task[]
  onStatusChange: (id: string, status: Status) => void
  onDelete: (id: string) => void
}

export function KanbanColumn({
  label,
  tasks,
  onStatusChange,
  onDelete,
}: KanbanColumnProps) {
  return (
    <div className="kanban-column">
      <h2>
        {label} <span className="count">{tasks.length}</span>
      </h2>
      <div className="kanban-column-tasks">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}
