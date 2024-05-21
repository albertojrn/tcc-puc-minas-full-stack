import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function authUser(body) {
  const url = `${v1BaseUrl}/auth/login`
  const result = await axios.post(url, body)
    .then(res => res)
    .catch(error => error?.response)
  return result
}
