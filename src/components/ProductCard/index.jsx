import React from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { CardContainer, LinkContainer } from './styles'
import { formatPrice } from '../../utils/formatMethods'

function ProductCard({
  variations,
  title,
  url,
}) {
  console.log({variations})
  const lowestPrice = Math.min(...variations.map(variation => variation.price))
  return (
    <LinkContainer to={url}>
      <CardContainer direction='column' spacing={1}>
        <div className='ProductCardImg-root'>
          <img src={`${process.env.PUBLIC_URL}/images/1716037704529-nike-revo-7-fem-1.jpg`} alt='banner_img' />
        </div>
        <Divider />
        <Typography className='ProductCardTitle-root' component='div'>
          {title}
        </Typography>
        <Divider />
        <Stack direction='row' alignItems='start' justifyContent='space-between'>
          <Typography className='ProductCardPrice-label' component='div'>
            A partir de:
          </Typography>
          <Typography align='right' className='ProductCardPrice-root' component='div'>
            {formatPrice(lowestPrice)}
          </Typography>
        </Stack>
      </CardContainer>
    </LinkContainer>
  )
}

export default ProductCard
