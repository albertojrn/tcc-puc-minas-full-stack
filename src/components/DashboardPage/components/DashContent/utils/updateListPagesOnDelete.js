import { ITEMS_PER_PAGE } from '../../../constants/searchParams'

export const updateListPagesOnDelete = (list, page, item) => {
  const changedList = { ...list }
  changedList[page] = changedList[page].filter(i => i.id !== item.id)
  const plainList = []
  const listPages = Object.keys(changedList)
  for (const u of listPages) {
    plainList.push(...changedList[u])
  }
  const newList = {}
  let a = 1
  for (let i = 0; i < plainList.length; i++) {
    if (!newList[a]) newList[a] = []
    const newLength = newList[a].push(plainList[i])
    if (newLength === ITEMS_PER_PAGE) a++
  }
  return newList
}
