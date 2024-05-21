import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createFeatures(body) {
  const url = `${v1BaseUrl}/features`
  const result = await axios.post(url, body)
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function deleteFeatures(id) {
  const url = `${v1BaseUrl}/features/${id}`
  const result = await axios.delete(url)
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function readFeatures(id) {
  const url = `${v1BaseUrl}/features${id ? `/${id}` : ''}`
  const result = await axios.get(url)
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function updateFeatures(id, body) {
  const url = `${v1BaseUrl}/features/${id}`
  const result = await axios.put(url, body)
    .then(res => res)
    .catch(error => error.response)
  return result
}
