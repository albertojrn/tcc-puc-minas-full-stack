import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createProducts(body) {
  const url = `${v1BaseUrl}/products`
  const result = await axios.post(url, body)
    .then(res => res)
    .catch(error => error)
  return result
}

export async function deleteProducts(id) {
  const url = `${v1BaseUrl}/products/${id}`
  const result = await axios.delete(url)
    .then(res => res)
    .catch(error => error)
  return result
}

export async function readProducts(id) {
  const url = `${v1BaseUrl}/products${id ? `/${id}` : ''}`
  const result = await axios.get(url)
    .then(res => res)
    .catch(error => error)
  return result
}

export async function updateProducts(id, body) {
  const url = `${v1BaseUrl}/products/${id}`
  const result = await axios.put(url, body)
    .then(res => res)
    .catch(error => error)
  return result
}
