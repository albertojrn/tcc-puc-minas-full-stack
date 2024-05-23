import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createUsers(body) {
  const url = `${v1BaseUrl}/users`
  const result = await axios.post(url, body)
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function deleteUsers(id, token) {
  const url = `${v1BaseUrl}/users/${id}`
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function readUsers(id, token, reqQuery = {}) {
  let queryString = ''
  const queryProps = Object.keys(reqQuery)
  if (queryProps.length) {
    queryString += '?'
    for (let i = 0; i < queryProps.length; i++) {
      const prop = queryProps[i]
      queryString += `${i !== 0 ? '&' : ''}${prop}=${reqQuery[prop]}`
    }
  }
  const url = `${v1BaseUrl}/users${(id || id === 0) ? `/${id}` : ''}${queryString}`
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function updateUsers(id, body, token) {
  const url = `${v1BaseUrl}/users/${id}`
  const result = await axios.put(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result
}
