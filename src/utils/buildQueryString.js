export const buildQueryString = (query) => {
  let queryString = ''
  const queryProps = Object.keys(query)
  if (queryProps.length) {
    queryString += '?'
    for (let i = 0; i < queryProps.length; i++) {
      const prop = queryProps[i]
      if (Array.isArray(query[prop])) {
        for (const [a, item] of query[prop].entries()) {
          if (item !== undefined && item !== null) {
            queryString += `${i !== 0 || a !== 0 ? '&' : ''}${prop}=${item}`
          }
        }
      }
      else if (query[prop] !== undefined && query[prop] !== null) {
        queryString += `${i !== 0 ? '&' : ''}${prop}=${query[prop]}`
      }
    }
  }
  if (queryString === '?') queryString = ''
  return queryString
}
