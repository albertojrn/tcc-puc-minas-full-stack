import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createCartProduct(body, token) {
  const url = `${v1BaseUrl}/cart`
  const result = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function deleteCartProduct(user_id, product_id, primary_color_id, secondary_color_id, size_id, token) {
  const url = `${v1BaseUrl}/cart/${user_id}/${product_id}/${primary_color_id}/${secondary_color_id}/${size_id}`
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function readCartProduct(user_id, token) {
  const url = `${v1BaseUrl}/cart${(user_id) ? `/${user_id}` : ''}`
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result
}

export async function updateCartProduct(user_id, product_id, primary_color_id, secondary_color_id, size_id, body, token) {
  const url = `${v1BaseUrl}/cart/${user_id}/${product_id}/${primary_color_id}/${secondary_color_id}/${size_id}`
  const result = await axios.put(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result
}
