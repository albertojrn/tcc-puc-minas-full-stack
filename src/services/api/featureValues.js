import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createFeatureValues(body) {
  const url = `${v1BaseUrl}/feature-values`
  const result = await axios.post(url, body)
    .then(res => res)
    .catch(error => error)
  return result
}

export async function deleteFeatureValues(id) {
  const url = `${v1BaseUrl}/feature-values/${id}`
  const result = await axios.delete(url)
    .then(res => res)
    .catch(error => error)
  return result
}

export async function readFeatureValues(id) {
  const url = `${v1BaseUrl}/feature-values${id ? `/${id}` : ''}`
  const result = await axios.get(url)
    .then(res => res)
    .catch(error => error)
  return result
}

export async function updateFeatureValues(id, body) {
  const url = `${v1BaseUrl}/feature-values/${id}`
  const result = await axios.put(url, body)
    .then(res => res)
    .catch(error => error)
  return result
}
