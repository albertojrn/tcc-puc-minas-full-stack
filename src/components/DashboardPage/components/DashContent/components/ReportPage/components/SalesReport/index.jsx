import React from 'react'
import { Button, Typography } from '@mui/material'
import { CustomDivider, GridItem, MainGridContainer } from '../../../../../../../../styles'
import GridListHeader from '../../../GridListHeader'
import { COLUMNS } from '../../constants/gridParams'
import { formatPrice } from '../../../../../../../../utils/formatMethods'
import TotalRow from '../TotalRow'
import { COLORS } from '../../../../../../../../constants/theme'
import { exportToPdf } from '../../utils/exportToPdf'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'

function SalesReport({ orders, from, to }) {
  const { setLoading } = useLoadingContext()
  const data = orders.map(order => (
    {
      date: new Date(order.date).toLocaleDateString(),
      id: order.id,
      quantityProducts: order.items.map(item => item.quantity).reduce((a, b) => a + b, 0),
      payment_method: order.payment_method,
      installments: order.payment_method === 'Cartão de Crédito' ? order.installments : '-',
      shipping_fee: order.shipping_fee,
      total_products: order.total_products,
    }
  ))

  function format(val, prop) {
    if (prop === 'installments' && val !== '-') return `${val}x`
    if (['total_products', 'shipping_fee'].includes(prop)) return formatPrice(val)
    return val
  }

  return (
    <>
      <GridItem item xs={12}>
        <Button onClick={() => { exportToPdf('UrbanSneakersSalesReport-root', setLoading) }} color='standard'>Exportar como pdf</Button>
      </GridItem>
      <MainGridContainer container spacing={2} alignItems='center' id='UrbanSneakersSalesReport-root'>
        <GridItem item xs={12}>
          <Typography
            variant='h5'
          >
            {`Relatório de vendas - Período (${new Date(`${from} 00:00:00`).toLocaleDateString()} a ${new Date(`${to} 00:00:00`).toLocaleDateString()})`}
          </Typography>
        </GridItem>
        <GridItem item xs={12}>
          <CustomDivider color={COLORS.urbanBlack} thickness={3} />
        </GridItem>
        <GridListHeader columns={COLUMNS} />
        <GridItem item xs={12}>
          <CustomDivider color={COLORS.urbanBlack} thickness={3} />
        </GridItem>
        {data?.map(order => (
          <React.Fragment key={order.id}>
            {COLUMNS.map(column => (
              <GridItem item key={column.id} align={column.align} hideInMobile={column.hideInMobile} {...column.sizes}>
                <Typography
                  variant='body1'
                >
                  {format(order[column.id], column.id)}
                </Typography>
              </GridItem>
            ))}
          </React.Fragment>
        ))}
        <GridItem item xs={12}>
          <CustomDivider color={COLORS.urbanBlack} thickness={3} />
        </GridItem>
        <TotalRow orders={orders} />
      </MainGridContainer>
    </>
  )
}

export default SalesReport
