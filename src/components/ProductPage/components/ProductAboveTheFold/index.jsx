import React from 'react'
import { GridItem } from '../../../../styles'
import ProductImage from '../../../ProductImage'
import ProductDetails from '../ProductDetails'

function ProductAboveTheFold({ product }) {
  const images = product?.images ?? []
  return (
    <>
      <GridItem item xs={12} md={5}>
        <ProductImage height='500px' selectedImages={images} />
      </GridItem>
      <GridItem item xs={12} md={7}>
        <ProductDetails product={product} />
      </GridItem>
    </>
  )
}

export default ProductAboveTheFold
