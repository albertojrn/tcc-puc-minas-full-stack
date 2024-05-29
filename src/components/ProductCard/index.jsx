import React from 'react'
import { Stack, Typography } from '@mui/material'
import { CardContainer, LinkContainer } from './styles'
import { formatPrice } from '../../utils/formatMethods'
import { CustomDivider } from '../../styles'

function ProductCard({
  productId,
  title,
  variations,
  images
}) {
  const lowestPrice = Math.min(...variations.map(variation => variation.price))
  return (
    <LinkContainer to={`/product/${productId}`}>
      <CardContainer direction='column' spacing={1}>
        <div className='ProductCardImg-root'>
          <img src={`${process.env.PUBLIC_URL}/images/${images?.[0]}`} alt='banner_img' />
        </div>
        <CustomDivider />
        <Typography className='ProductCardTitle-root'>
          {`${title}`}
        </Typography>
        <CustomDivider />
        <Stack direction='column' spacing={0}>
          <Typography align='right' className='ProductCardPrice-label'>
            A partir de:
          </Typography>
          <Typography align='right' className='ProductCardPrice-root'>
            {formatPrice(lowestPrice)}
          </Typography>
        </Stack>
      </CardContainer>
    </LinkContainer>
  )
}

export default ProductCard
