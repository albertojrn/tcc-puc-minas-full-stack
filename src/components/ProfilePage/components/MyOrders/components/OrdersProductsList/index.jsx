import { Stack, Typography } from '@mui/material'
import React from 'react'
import { formatPrice } from '../../../../../../utils/formatMethods'

function OrdersProductsList({ orderItems = [], featuresValues = [], productsInfo = {} }) {
  let items = []
  if (featuresValues.length && Object.keys(productsInfo ?? {}).length) {
    items = orderItems.map(variation => {
      const product = productsInfo[variation.product_id]
      return {
        title: product.title,
        image: product.images[0],
        primaryColor: featuresValues.find(f => f.id === variation.primary_color_id)?.name ?? '-',
        secondaryColor: featuresValues.find(f => f.id === variation.secondary_color_id)?.name ?? '-',
        size: featuresValues.find(f => f.id === variation.size_id)?.name ?? '-',
        quantity: variation.quantity,
        price: variation.price,
      }
    })
  }

  return (
    <Stack direction='column' spacing={1}>
      {items.map(item => (
        <Stack direction='column' spacing={0} key={`${item.primaryColor}${item.secondaryColor}${item.size}`}>
          <Typography variant='body2'>
            {`${item.title} - ${formatPrice(item.price)}`}
          </Typography>
          <Typography variant='caption'>
            {`Cor: ${item.primaryColor}${item.secondaryColor !== '-' ? `/${item.secondaryColor}` : ''} - Tam: ${item.size} - Qtd: ${item.quantity}`}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}

export default OrdersProductsList
