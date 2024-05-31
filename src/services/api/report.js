import axios from 'axios'
import { buildQueryString } from '../../utils/buildQueryString'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function readReport(user_id, token, reqQuery = {}) {
  const queryString = buildQueryString(reqQuery)
  const url = `${v1BaseUrl}/report${(user_id || user_id === 0) ? `/${user_id}` : ''}${queryString}`
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => error.response)
  return result ?? {}
}
