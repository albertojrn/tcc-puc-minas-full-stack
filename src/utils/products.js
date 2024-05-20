import { readProducts } from '../services/api/products'
import { PRODUCTS_PER_PAGE } from '../components/DashboardPage/components/DashContent/components/Products/components/ProductsList/constants/searchParams'

export async function loadProducts(products, page, setDashboardData, setError) {
  const limit = PRODUCTS_PER_PAGE
  const offset = (page - 1) * PRODUCTS_PER_PAGE
  if (!products[page]?.length) {
    const res = await readProducts(null, { limit, offset })
    if (res.status === 200 && res.data.length) {
      setDashboardData({ products: { ...products, [page]: res.data } })
      if (setError) setError('')
    }
    else if (setError) setError('Tivemos um problema ao carregar os produtos.')
  }
}
