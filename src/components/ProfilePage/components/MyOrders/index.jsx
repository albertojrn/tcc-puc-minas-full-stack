import React from 'react'
import { GridItem, MainGridContainer } from '../../../../styles'
import OrdersList from './components/OrdersList'

function MyOrders() {
  return (
    <MainGridContainer container spacing={2}>
      <GridItem item xs={12}>
        <OrdersList />
      </GridItem>
    </MainGridContainer>
  )
}

export default MyOrders
