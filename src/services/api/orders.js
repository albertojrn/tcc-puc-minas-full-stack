import axios from 'axios'
import { buildQueryString } from '../../utils/buildQueryString'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createOrders(body, token) {
  const url = `${v1BaseUrl}/orders`
  const result = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}

export async function deleteOrders(id, token) {
  const url = `${v1BaseUrl}/orders/${id}`
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}

export async function readOrders(user_id, token, reqQuery = {}) {
  const queryString = buildQueryString(reqQuery)
  const url = `${v1BaseUrl}/orders${(user_id || user_id === 0) ? `/${user_id}` : ''}${queryString}`
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}

export async function updateOrders(id, body, token) {
  const url = `${v1BaseUrl}/orders/${id}`
  const result = await axios.put(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}
