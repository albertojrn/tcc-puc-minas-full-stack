import React, { useState } from 'react'
import { FormHelperText, Typography } from '@mui/material'
import { Color, CustomDivider, GridItem } from '../../../../styles'
import { DetailsContainer } from './styles'
import ProductDescription from '../ProductDescription'
import ProductVariations from '../ProductVariations'
import { formatPrice } from '../../../../utils/formatMethods'
import ProductPrice from '../ProductPrice'
import ProductQuantity from '../../ProductQuantity'
import AddToCartButton from '../AddToCartButton'

function ProductDetails({ product }) {
  const [error, setError] = useState({})
  const [selectedVariation, setSelectedVariation] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const description = product?.description ?? ''
  const price = formatPrice(selectedVariation?.price)
  const title = product?.title ?? ''
  const variations = product?.variations ?? []

  return (
    <DetailsContainer container spacing={2}>
      <GridItem item xs={12}>
        <Typography className='ProductDetailsTitle-root'>
          {title}
        </Typography>
      </GridItem>
      <GridItem item xs={12}>
        <CustomDivider color='rgba(0, 0, 0, 0.5)' />
      </GridItem>
      <GridItem item xs={12}>
        <ProductDescription description={description} />
      </GridItem>
      <GridItem item xs={12}>
        <CustomDivider color='rgba(0, 0, 0, 0.5)' />
      </GridItem>
      <GridItem item xs={12}>
        {!!variations?.length
          && (
          <ProductVariations
            selectedVariation={selectedVariation}
            setSelectedVariation={setSelectedVariation}
            variations={variations}
          />
          )}
        {error.variation
          && <FormHelperText><Color color='red'>{error.variation}</Color></FormHelperText>}
      </GridItem>
      <GridItem item xs={12}>
        <ProductPrice price={price} />
      </GridItem>
      <GridItem item xs={6} md={5}>
        <ProductQuantity
          error={error}
          selectedQuantity={selectedQuantity}
          setSelectedQuantity={setSelectedQuantity}
        />
      </GridItem>
      <GridItem item xs={4} md={5} />
      <GridItem item xs={12}>
        <AddToCartButton
          productId={product.id}
          selectedQuantity={selectedQuantity}
          selectedVariation={selectedVariation}
          setError={setError}
        />
        {error.cart
          && <FormHelperText><Color color='red'>{error.cart}</Color></FormHelperText>}
      </GridItem>
    </DetailsContainer>
  )
}

export default ProductDetails
