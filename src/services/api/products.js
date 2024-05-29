import axios from 'axios'
import { buildQueryString } from '../../utils/buildQueryString'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createProducts(body, token) {
  const url = `${v1BaseUrl}/products`
  const result = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}

export async function deleteProducts(id, token) {
  const url = `${v1BaseUrl}/products/${id}`
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}

export async function readProducts(id, reqQuery = {}) {
  const queryString = buildQueryString(reqQuery)
  const url = `${v1BaseUrl}/products${(id || id === 0) ? `/${id}` : ''}${queryString}`
  const result = await axios.get(url)
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}

export async function updateProducts(id, body, token) {
  const url = `${v1BaseUrl}/products/${id}`
  const result = await axios.put(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}
