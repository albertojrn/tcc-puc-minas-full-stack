import React from 'react'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import ProductImage from './components/ProductImage'

function ProductRegistry() {
  return (
    <MainGridContainer container spacing={2}>
      <GridItem item xs={12} md={5}>
        <ProductImage isRegistry />
      </GridItem>
    </MainGridContainer>
  )
}

export default ProductRegistry
