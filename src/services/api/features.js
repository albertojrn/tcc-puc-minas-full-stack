import axios from 'axios'

export async function getFeatures(id) {
  console.log(process.env.REACT_APP_API_HOST)
  const url = `${process.env.REACT_APP_API_HOST}/api/v1/features${id ? `/${id}` : ''}`
  const result = await axios.get(url)
    .then(res => res)
    .catch(error => error)
  return result
}
