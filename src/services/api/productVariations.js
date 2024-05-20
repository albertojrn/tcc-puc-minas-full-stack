import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createProductVariations(body) {
  const url = `${v1BaseUrl}/product-variations`
  const result = await axios.post(url, body)
    .then(res => res)
    .catch(error => error)
  return result
}

export async function deleteProductVariations(product_id, primary_color_id, secondary_color_id, size_id) {
  const url = `${v1BaseUrl}/product-variations/${product_id}/${primary_color_id}/${secondary_color_id}/${size_id}`
  const result = await axios.delete(url)
    .then(res => res)
    .catch(error => error)
  return result
}

export async function readProductVariations(product_id, primary_color_id, secondary_color_id, size_id) {
  const url = `${v1BaseUrl}/product-variations${(product_id) ? `/${product_id}` : ''}${(product_id && primary_color_id && secondary_color_id && size_id) ? `/${primary_color_id}/${secondary_color_id}/${size_id}` : ''}`
  const result = await axios.get(url)
    .then(res => res)
    .catch(error => error)
  return result
}

export async function updateProductVariations(product_id, primary_color_id, secondary_color_id, size_id, body) {
  const url = `${v1BaseUrl}/product-variations/${product_id}/${primary_color_id}/${secondary_color_id}/${size_id}`
  const result = await axios.put(url, body)
    .then(res => res)
    .catch(error => error)
  return result
}
