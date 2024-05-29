export function sortByObjProp(a, b, prop) {
  if (typeof a[prop] === 'string') return a[prop].localeCompare(b[prop])
  if (typeof a[prop] === 'number') return a[prop] - b[prop]
}
