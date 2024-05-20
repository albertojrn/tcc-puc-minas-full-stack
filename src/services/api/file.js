import axios from 'axios'

const v1BaseUrl = `${process.env.REACT_APP_API_HOST}/api/v1`

export async function createFile(body) {
  const url = `${v1BaseUrl}/file`
  const result = await axios.post(
    url,
    body,
    {
      headers: {
        // 'Content-Type': 'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD'
        'Content-Type': 'multipart/form-data'
      }
    }
  )
    .then(res => res)
    .catch(error => error)
  return result
}
