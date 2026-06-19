import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function TasksPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Tasks</h1>
      <button type="button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  )
}
