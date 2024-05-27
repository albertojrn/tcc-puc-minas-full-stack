import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../styles'
import PageHeader from '../PageHeader'
import { useUserContext } from '../../contexts/UserContext'
import CartProducts from './components/CartProducts'
import CartTotals from './components/CartTotals'
import ShippingCalculator from './components/ShippingCalculator'
import { fetchCartProductsInfo } from './utils/fetchCartProductsInfo'

function CartPage() {
  const [cartProductsInfo, setCartProductsInfo] = useState()
  const [featuresValues, setFeaturesValues] = useState()
  const [loading, setLoading] = useState(false)
  const [shippingFee, setShippingFee] = useState({})
  const { cart } = useUserContext()

  async function handleOnfetchCartProductsInfo() {
    fetchCartProductsInfo(setLoading, cart, setFeaturesValues, setCartProductsInfo)
  }

  useEffect(() => {
    handleOnfetchCartProductsInfo()
  }, [cart])

  return (
    <MainGridContainer container spacing={3} maxWidth={{ md: '1200px' }}>
      <GridItem item xs={12}>
        <PageHeader title='Carrinho' />
      </GridItem>
      {(!!featuresValues?.length && Object.keys(cartProductsInfo ?? {}).length)
        ? (
          <>
            <GridItem item xs={12} md={9}>
              <MainGridContainer container spacing={3}>
                <GridItem item xs={12}>
                  <CartProducts cartProductsInfo={cartProductsInfo} featuresValues={featuresValues} />
                </GridItem>
                <GridItem item xs={12} md={9}>
                  <ShippingCalculator setShippingFee={setShippingFee} shippingFee={shippingFee} />
                </GridItem>
                <GridItem display={{ xs: 'none', sm: 'none', md: 'block' }} item md={3} />
              </MainGridContainer>
            </GridItem>
            <GridItem item xs={12} md={3}>
              <CartTotals cartProductsInfo={cartProductsInfo} shippingFee={shippingFee} />
            </GridItem>
          </>
        )
        : (
          <GridItem item xs={12}>
            {(!loading)
              && (
              <Typography variant='h6'>
                O seu carrinho está vazio...
              </Typography>
              )}
          </GridItem>
        )}
    </MainGridContainer>
  )
}

export default CartPage
