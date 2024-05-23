export const updateListPagesOnEdit = async (list, page, item, readItem, token) => {
  const newList = { ...list }
  let newListPage = structuredClone(newList[page])
  let currentItem
  for (const li of newListPage) {
    if (li.id === item.id) {
      currentItem = li
      break
    }
  }
  const index = newListPage.indexOf(currentItem)
  const newP = await readItem(item.id, token).then(response => response.data?.[0])
  if (newP) {
    newListPage = [
      ...newListPage.slice(0, index),
      newP,
      ...newListPage.slice(index + 1)
    ]
    newList[page] = newListPage
    return newList
  }
}
