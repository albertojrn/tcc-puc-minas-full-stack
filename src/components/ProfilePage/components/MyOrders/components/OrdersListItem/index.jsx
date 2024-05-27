import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { CustomDivider, GridItem, MainGridContainer } from '../../../../../../styles'
import { CollapseContainer, OrderListItemContainer } from './styles'
import { fetchCartProductsInfo } from '../../../../../CartPage/utils/fetchCartProductsInfo'
import OrdersProductsList from '../OrdersProductsList'
import OrderTotals from '../OrderTotals'

function OrdersListItem({ order }) {
  const [collapse, setCollapse] = useState(false)
  const [featuresValues, setFeaturesValues] = useState()
  const [productsInfo, setProductsInfo] = useState()
  const [loading, setLoading] = useState(false)

  async function fetchParams() {
    fetchCartProductsInfo(setLoading, order.items, setFeaturesValues, setProductsInfo)
  }

  useEffect(() => {
    fetchParams()
  }, [])

  return (
    <OrderListItemContainer direction='column' spacing={2}>
      <Stack direction='row' alignItems='start' justifyContent='space-between' onClick={() => setCollapse(prev => !prev)}>
        <Stack direction='column'>
          <Typography variant='h6' fontWeight='bold'>
            {`Pedido: ${order.id}`}
          </Typography>
          <Typography variant='body2'>
            {`Data: ${new Date(order.date).toLocaleDateString()}`}
          </Typography>
        </Stack>
        <Typography className='OrdersListItem-status'>
          {`${order.status}`}
        </Typography>
      </Stack>
      <CollapseContainer in={collapse} timeout='auto'>
        <CustomDivider margin='0 0 12px 0' />
        <MainGridContainer container spacing={2}>
          <GridItem item xs={12} md={6}>
            <OrdersProductsList
              featuresValues={featuresValues}
              orderItems={order.items}
              productsInfo={productsInfo}
            />
          </GridItem>
          <GridItem item xs={12} md={6}>
            <OrderTotals order={order} />
          </GridItem>
        </MainGridContainer>
      </CollapseContainer>
    </OrderListItemContainer>
  )
}

export default OrdersListItem
