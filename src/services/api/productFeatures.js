import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createProductFeatures(body) {
  const url = `${v1BaseUrl}/product-features`
  const result = await axios.post(url, body)
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function deleteProductFeatures(product_id, feature_values_id) {
  const url = `${v1BaseUrl}/product-features/${product_id}/${feature_values_id}`
  const result = await axios.delete(url)
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function readProductFeatures(product_id, feature_values_id) {
  const url = `${v1BaseUrl}/product-features${(product_id) ? `/${product_id}` : ''}${(feature_values_id) ? `/${feature_values_id}` : ''}`
  const result = await axios.get(url)
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function updateProductFeatures(product_id, feature_values_id, body) {
  const url = `${v1BaseUrl}/product-features/${product_id}/${feature_values_id}`
  const result = await axios.put(url, body)
    .then(res => res)
    .catch(error => error.response)
  return result
}
