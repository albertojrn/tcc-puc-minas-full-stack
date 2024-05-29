import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createFeatureValues(body, token) {
  const url = `${v1BaseUrl}/feature-values`
  const result = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}

export async function deleteFeatureValues(id, token) {
  const url = `${v1BaseUrl}/feature-values/${id}`
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}

export async function readFeatureValues(id) {
  const url = `${v1BaseUrl}/feature-values${id ? `/${id}` : ''}`
  const result = await axios.get(url)
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}

export async function updateFeatureValues(id, body, token) {
  const url = `${v1BaseUrl}/feature-values/${id}`
  const result = await axios.put(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}
