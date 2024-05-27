import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createUserAddress(body, token) {
  const url = `${v1BaseUrl}/address`
  const result = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function deleteUserAddress(id, token) {
  const url = `${v1BaseUrl}/address/${id}`
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function readUserAddress(user_id, token) {
  const url = `${v1BaseUrl}/address${(user_id) ? `/${user_id}` : ''}`
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function updateUserAddress(id, body, token) {
  const url = `${v1BaseUrl}/address/${id}`
  const result = await axios.put(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result
}
