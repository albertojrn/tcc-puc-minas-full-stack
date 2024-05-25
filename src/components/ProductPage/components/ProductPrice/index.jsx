import React from 'react'
import { PriceLabel } from './styles'

function ProductPrice({ price }) {
  return <PriceLabel align='left'>{price || 'R$ -'}</PriceLabel>
}

export default ProductPrice
