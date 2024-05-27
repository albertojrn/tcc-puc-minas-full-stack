import { Stack, Typography } from '@mui/material'
import React from 'react'
import { formatPrice } from '../../../../../../utils/formatMethods'

function OrderTotals({ order }) {
  return (
    <Stack direction='column' spacing={1}>
      <Typography align='right' variant='body2'>
        {`Valor total em produtos: ${formatPrice(order.total_products || 0)}`}
      </Typography>
      <Typography align='right' variant='body2'>
        {`Valor do frete: ${formatPrice(order.shipping_fee || 0)}`}
      </Typography>
      <Typography align='right' variant='body2'>
        {`Desconto (-): ${formatPrice(order.discount || 0)}`}
      </Typography>
      <Typography align='right' variant='h6' fontWeight='bold'>
        {`Total pago: ${formatPrice((order.total_products || 0) + (order.shipping_fee || 0) + (order.discount || 0))}`}
      </Typography>
    </Stack>
  )
}

export default OrderTotals
