import React from 'react'
import { Typography } from '@mui/material'
import { COLUMNS } from '../../constants/gridParams'
import { GridItem } from '../../../../../../../../styles'
import { formatPrice } from '../../../../../../../../utils/formatMethods'

function TotalRow({ orders }) {
  const quantity = []
  const shippingFee = []
  const total = []

  for (const order of orders) {
    quantity.push(order.items.map(item => item.quantity).reduce((a, b) => a + b, 0))
    shippingFee.push(order.shipping_fee)
    total.push(order.total_products)
  }

  function format(i) {
    if (i === 0) return 'Totais'
    if (i === 2) return quantity.reduce((a, b) => a + b, 0)
    return formatPrice(
      i === 5
        ? shippingFee.reduce((a, b) => a + b, 0)
        : total.reduce((a, b) => a + b, 0)
    )
  }

  return (
    COLUMNS.map((column, i) => (
      [0, 2, 5, 6].includes(i)
        ? (
          <GridItem item key={column.id} align={column.align} hideInMobile={column.hideInMobile} {...column.sizes}>
            <Typography
              fontWeight='bold'
              variant='body1'
            >
              {format(i)}
            </Typography>
          </GridItem>
        )
        : <GridItem item key={column.id} align={column.align} hideInMobile={column.hideInMobile} {...column.sizes} />
    ))
  )
}

export default TotalRow
