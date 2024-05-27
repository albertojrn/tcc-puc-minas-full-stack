import { readProducts } from '../services/api/products'
import { ITEMS_PER_PAGE } from '../components/DashboardPage/constants/searchParams'

export async function loadProducts(products, page, setDashboardData, setError) {
  const limit = ITEMS_PER_PAGE
  const offset = (page - 1) * ITEMS_PER_PAGE
  if (!products[page]?.length) {
    const res = await readProducts(null, { limit, offset })
    if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
      setDashboardData({ products: { ...products, [page]: res.data } })
      if (setError) setError('')
    }
    else if (setError) setError('Tivemos um problema ao carregar os produtos.')
  }
}

export async function getProductsInfo(id, onlyinfo) {
  const query = {}
  if (onlyinfo) query.onlyinfo = onlyinfo
  const res = await readProducts(id, query)
  if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
    return res.data[0]
  }
  return res.data
}
