import { authUser } from '../services/api/auth'

export async function loginUser(body, setUser, setError, navigate, redirectUrl = '/') {
  const res = await authUser(body)
  if (res.status === 200 && res.data.token) {
    setUser(res.data)
    if (typeof navigate === 'function') return navigate(redirectUrl)
    if (typeof setError === 'function') setError({})
  }
  else if (typeof setError === 'function') {
    if ((res.status === 200 || res.status === 500) && res.data.error) {
      setError({ password: res.data.error.message })
    }
    else if (res.status === 400 && res.data.error) {
      setError({ email: res.data.error.message })
    }
  }
  return res
}
