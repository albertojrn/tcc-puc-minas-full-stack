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

export async function readProducts(id, reqQuery) {
  let queryString = ''
  const queryProps = Object.keys(reqQuery)
  if (queryProps.length) {
    queryString += '?'
    for (let i = 0; i < queryProps.length; i++) {
      const prop = queryProps[i]
      queryString += `${i !== 0 ? '&' : ''}${prop}=${reqQuery[prop]}`
    }
  }
  const url = `${v1BaseUrl}/products${(id || id === 0) ? `/${id}` : ''}${queryString}`
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
