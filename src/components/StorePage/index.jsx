import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GridItem, MainGridContainer } from '../../styles'
import Sidebar from './components/Sidebar'
import { useLoadingContext } from '../../contexts/LoadingContext'
import { PRODUCTS_PER_PAGE } from './constants/params'
import { readProducts } from '../../services/api/products'
import ProductsGrid from './components/ProductsGrid'
import SideBarDrawer from './components/SideBarDrawer'

function StorePage() {
  const [availableFeaturesValues, setAvailableFeaturesValues] = useState([])
  const [productsPage, setProductsPage] = useState(1)
  const [products, setProducts] = useState([])
  const [productsCount, setProductsCount] = useState(0)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const fetchingProducts = useRef(false)
  const { setLoading } = useLoadingContext()
  const [searchParams] = useSearchParams()
  const selectedFeatures = searchParams.getAll('fv').map(f => Number(f))
  const searchquery = searchParams.get('searchquery')

  async function fetchProducts() {
    if (!fetchingProducts.current) {
      setLoadingProducts(true)
      fetchingProducts.current = true
      setLoading({ show: true })
      const offset = (productsPage - 1) * PRODUCTS_PER_PAGE
      const query = {
        count: true,
        limit: PRODUCTS_PER_PAGE,
        offset,
        featurevalues: selectedFeatures,
        searchquery
      }
      const res = await readProducts(null, query)
      if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
        const newProducts = res.data
        const newAvailableFeaturesValues = Array.from(
          new Set(
            newProducts.flatMap(product => [
              ...product.selectedFeatures.flatMap(feature => feature),
              ...product.variations.flatMap(variation => [variation.size, variation.primaryColor, variation.secondaryColor])
            ])
              .filter(val => val)
          )
        )
        if (newProducts[0].count) setProductsCount(newProducts[0].count)
        setProducts(prev => (productsPage === 1 ? newProducts : [...prev, ...newProducts]))
        setAvailableFeaturesValues(newAvailableFeaturesValues)
      }
      else {
        setProductsCount(0)
        setProducts([])
      }
      setLoading({ show: false })
      fetchingProducts.current = false
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    if (productsPage) {
      fetchProducts()
    }
  }, [productsPage])

  useEffect(() => {
    if (productsPage === 1) fetchProducts()
    else setProductsPage(1)
  }, [selectedFeatures.join()])

  return (
    <MainGridContainer container maxWidth={{ md: '1200px' }} spacing={3}>
      <SideBarDrawer
        availableFeaturesValues={availableFeaturesValues}
        selectedFeatures={selectedFeatures}
      />
      <GridItem hideInMobile item xs={3}>
        <Sidebar
          availableFeaturesValues={availableFeaturesValues}
          selectedFeatures={selectedFeatures}
        />
      </GridItem>
      <GridItem item xs={12} md={9}>
        <ProductsGrid
          loadingProducts={loadingProducts}
          products={products}
          productsCount={productsCount}
          setProductsPage={setProductsPage}
        />
      </GridItem>
    </MainGridContainer>
  )

}

export default StorePage
