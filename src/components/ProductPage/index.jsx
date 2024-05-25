import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { readProducts } from '../../services/api/products'
import { MainGridContainer } from '../../styles'
import ProductPageHeader from './components/ProductPageHeader'
import ProductAboveTheFold from './components/ProductAboveTheFold'

function ProductPage() {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  async function fetchProduct() {
    setLoading(true)
    const res = await readProducts(id)
    setLoading(false)
    if (res?.data?.[0]?.id) setProduct(res.data[0])
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <MainGridContainer container spacing={1} maxWidth={{ md: '1200px' }}>
      <ProductPageHeader title={product?.title} />
      <ProductAboveTheFold product={product} />
    </MainGridContainer>
  )
}

export default ProductPage
