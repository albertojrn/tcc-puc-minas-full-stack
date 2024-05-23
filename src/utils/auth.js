import { authGoogleUser, authUser } from '../services/api/auth'

export async function loginUser(body, setError) {
  const res = await authUser(body)
  if (res.status === 200 && res.data.token) {
    if (typeof setError === 'function') setError({})
    return res.data
  }
  if (typeof setError === 'function') {
    if ((res.status === 200 || res.status === 500) && res.data.error) {
      setError({ password: res.data.error.message })
    }
    else if (res.status === 400 && res.data.error) {
      setError({ email: res.data.error.message })
    }
    else if (res.status === 409) {
      setError({ email: 'Esse email já está sendo utilizado por outro usuário.' })
    }
  }
}

export async function loginGoogleUser(token, setError) {
  const res = await authGoogleUser(token)
  if (res.status === 200 && res.data.token) {
    if (typeof setError === 'function') setError('')
    return res.data
  }
  if (typeof setError === 'function') {
    if ((res.status === 200 || res.status === 500) && res.data.error) {
      setError(res.data.error.message)
    }
    else if (res.status === 400 && res.data.error) {
      setError(res.data.error.message)
    }
    else if (res.status === 409) {
      setError('Já existe um cadastro com esse email. Entre com a sua senha.')
    }
  }
}
