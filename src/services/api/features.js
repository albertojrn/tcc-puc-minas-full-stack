import axios from 'axios'
import { buildQueryString } from '../../utils/buildQueryString'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createFeatures(body, token) {
  const url = `${v1BaseUrl}/features`
  const result = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}

export async function deleteFeatures(id, token) {
  const url = `${v1BaseUrl}/features/${id}`
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}

export async function readFeatures(id, reqQuery = {}) {
  const queryString = buildQueryString(reqQuery)
  const url = `${v1BaseUrl}/features${id ? `/${id}` : ''}${queryString}`
  const result = await axios.get(url)
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}

export async function updateFeatures(id, body, token) {
  const url = `${v1BaseUrl}/features/${id}`
  const result = await axios.put(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}
