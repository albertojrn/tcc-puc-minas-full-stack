import { ITEMS_PER_PAGE } from '../components/DashboardPage/constants/searchParams'
import { readUsers } from '../services/api/users'

export async function loadUsers(users, page, setDashboardData, token, setError) {
  const limit = ITEMS_PER_PAGE
  const offset = (page - 1) * ITEMS_PER_PAGE
  if (!users[page]?.length) {
    const res = await readUsers(null, token, { limit, offset })
    if (res.status === 200 && res.data.length) {
      setDashboardData({ users: { ...users, [page]: res.data } })
      if (setError) setError('')
    }
    else if (setError) setError('Tivemos um problema ao carregar os usuários.')
  }
}
