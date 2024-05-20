import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createProductImages(body) {
  const url = `${v1BaseUrl}/product-images`
  const result = await axios.post(url, body)
    .then(res => res)
    .catch(error => error)
  return result
}

export async function deleteProductImages(product_id, name) {
  const url = `${v1BaseUrl}/product-images/${product_id}/${name}`
  const result = await axios.delete(url)
    .then(res => res)
    .catch(error => error)
  return result
}

export async function readProductImages(product_id, name) {
  const url = `${v1BaseUrl}/product-images${(product_id) ? `/${product_id}` : ''}${(product_id && name) ? `/${name}` : ''}`
  const result = await axios.get(url)
    .then(res => res)
    .catch(error => error)
  return result
}

export async function updateProductImages(product_id, name, body) {
  const url = `${v1BaseUrl}/product-images/${product_id}/${name}`
  const result = await axios.put(url, body)
    .then(res => res)
    .catch(error => error)
  return result
}
