import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { Looks3, Looks4, LooksOne, LooksTwo } from '@mui/icons-material'
import { fetchCartProductsInfo } from '../CartPage/utils/fetchCartProductsInfo'
import { useUserContext } from '../../contexts/UserContext'
import { CustomDivider, GridItem, MainGridContainer } from '../../styles'
import CartProducts from '../CartPage/components/CartProducts'
import UserAddress from '../ProfilePage/components/UserAddress'
import { COLORS } from '../../constants/theme'
import ShippingCalculator from '../CartPage/components/ShippingCalculator'
import PaymentMethod from './components/PaymentMethod'
import CheckoutTotals from './components/CheckoutTotals'

function CheckoutPage() {
  const [cartProductsInfo, setCartProductsInfo] = useState()
  const [featuresValues, setFeaturesValues] = useState()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState({})
  const [selectedAddressId, setSelectedAddressId] = useState()
  const [shippingFee, setShippingFee] = useState({})
  const { cart } = useUserContext()

  async function handleOnfetchCartProductsInfo() {
    fetchCartProductsInfo(setLoading, cart, setFeaturesValues, setCartProductsInfo)
  }

  useEffect(() => {
    handleOnfetchCartProductsInfo()
  }, [cart])

  return (
    <MainGridContainer container spacing={4} maxWidth={{ md: '1200px' }}>
      <GridItem item xs={12}>
        <LooksOne fontSize='large' />
      </GridItem>
      <GridItem item xs={12}>
        <UserAddress
          isCheckoutPage
          selectedAddressId={selectedAddressId}
          setSelectedAddressId={setSelectedAddressId}
        />
      </GridItem>
      <GridItem item xs={12}>
        <CustomDivider color={COLORS.urbanBlack} thickness='3px' />
      </GridItem>
      <GridItem item xs={12} md={3.5}>
        <MainGridContainer disabled={!selectedAddressId} container spacing={3}>
          <GridItem item xs={12}>
            <LooksTwo fontSize='large' />
          </GridItem>
          <GridItem item xs={12}>
            <Typography variant='h6'>
              Escolha o frete e revise os produtos
            </Typography>
          </GridItem>
          <GridItem item xs={12}>
            <ShippingCalculator
              isCheckoutPage
              shippingFee={shippingFee}
              setShippingFee={setShippingFee}
              selectedAddressId={selectedAddressId}
            />
          </GridItem>
        </MainGridContainer>
      </GridItem>
      <GridItem item xs={12} md={4}>
        <MainGridContainer disabled={!selectedAddressId} container spacing={3}>
          <GridItem item xs={12}>
            <Looks3 fontSize='large' />
          </GridItem>
          <GridItem item xs={12}>
            <Typography variant='h6'>
              Forma de pagamento
            </Typography>
          </GridItem>
          <GridItem item xs={12}>
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </GridItem>
        </MainGridContainer>
      </GridItem>
      <GridItem item xs={12} md={4.5}>
        <MainGridContainer disabled={!selectedAddressId} container spacing={3}>
          <GridItem item xs={12}>
            <Looks4 fontSize='large' />
          </GridItem>
          <GridItem item xs={12}>
            <Typography variant='h6'>
              Revise a sua compra
            </Typography>
          </GridItem>
          <GridItem item xs={12}>
            <CartProducts
              cartProductsInfo={cartProductsInfo}
              featuresValues={featuresValues}
              isCheckoutPage
            />
          </GridItem>
          <GridItem item xs={12}>
            <CheckoutTotals
              cartProductsInfo={cartProductsInfo}
              paymentMethod={paymentMethod}
              selectedAddressId={selectedAddressId}
              shippingFee={shippingFee}
            />
          </GridItem>
        </MainGridContainer>
      </GridItem>
    </MainGridContainer>
  )
}

export default CheckoutPage
