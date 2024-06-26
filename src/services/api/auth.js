import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function authUser(body) {
  const url = `${v1BaseUrl}/auth/login`
  const result = await axios.post(url, body)
    .then(res => res)
    .catch(error => error?.response)
  return result ?? {}
}

export async function authGoogleUser(token) {
  const url = `${v1BaseUrl}/auth/login-google`
  const result = await axios.post(url, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error?.response)
  return result ?? {}
}

export async function validateUser(token) {
  const url = `${v1BaseUrl}/auth/validate`
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error?.response)
  return result ?? {}
}
