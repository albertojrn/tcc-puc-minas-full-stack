import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../styles'
import { formatPrice } from '../../../../utils/formatMethods'
import { useUserContext } from '../../../../contexts/UserContext'
import { CheckoutButton } from './styles'

function CheckoutTotals({
  cartProductsInfo,
  paymentMethod,
  selectedAddressId,
  shippingFee
}) {
  const { cart, id, token } = useUserContext()
  let totalProducts = 0
  for (const cartItem of cart) {
    const product = cartProductsInfo?.[cartItem.product_id]
    const variation = product?.variations.find(item => (
      item.size === cartItem.size_id
      && item.primaryColor === cartItem.primary_color_id
      && item.secondaryColor === cartItem.secondary_color_id
    ))
    const unPrice = variation?.price ?? 0
    const totalPrice = cartItem.quantity * unPrice
    totalProducts += totalPrice
  }
  const cartTotals = totalProducts + (shippingFee?.fee ?? 0)

  function placeOrder() {
    const orderData = {
      user_id: id,
      shipping_fee: shippingFee.fee,
      shipping_method: shippingFee.name,
      shipping_days: shippingFee.workingDays,
      shipping_address_id: selectedAddressId,
      payment_method: paymentMethod.method,
      total_products: totalProducts,
      installments: paymentMethod.installments,
      items: []
    }
    for (const cartItem of cart) {
      const {
        primary_color_id,
        secondary_color_id,
        size_id,
        quantity,
        product_id,
      } = cartItem
      const variation = cartProductsInfo[product_id].variations.find(item => (
        item.primaryColor === primary_color_id
        && item.secondaryColor === secondary_color_id
        && item.size === size_id
      ))
      const itemData = {
        primary_color_id,
        secondary_color_id,
        size_id,
        quantity,
        product_id,
        price: variation.price
      }
      if (!itemData.secondary_color_id) itemData.secondary_color_id = -1
      orderData.items.push(itemData)
    }
    console.log({orderData})
  }

  return (
    <MainGridContainer container spacing={1} alignItems='center'>
      <GridItem item xs={12}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='body1'>
            Total em produtos
          </Typography>
          <Typography align='right' variant='body1' fontWeight='bold'>
            {formatPrice(totalProducts)}
          </Typography>
        </Stack>
      </GridItem>
      <GridItem item xs={12}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='body1'>
            Total em frete
          </Typography>
          <Typography align='right' variant='body1' fontWeight='bold'>
            {shippingFee?.fee === 0 || shippingFee?.fee ? formatPrice(shippingFee?.fee) : '-'}
          </Typography>
        </Stack>
      </GridItem>
      <GridItem item xs={12}>
        <Stack direction='column'>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='body1' fontWeight='bold' fontSize='large'>
              Total
            </Typography>
            <Typography align='right' variant='body1' fontWeight='bold' fontSize='large'>
              {formatPrice(cartTotals)}
            </Typography>
          </Stack>
        </Stack>
      </GridItem>
      <GridItem item xs={12}>
        <Stack direction='column'>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='body1'>
              Forma de Pagamento:
            </Typography>
            <Typography align='right' variant='body1'>
              {paymentMethod?.method ?? '-'}
            </Typography>
          </Stack>
          {paymentMethod?.method === 'Cartão de Crédito'
            && (
              <Typography align='right' variant='body2'>
                {paymentMethod?.installments ? `${paymentMethod.installments}x sem juros` : '-'}
              </Typography>
            )}
        </Stack>
      </GridItem>
      <GridItem item xs={12}>
        <Link to='/checkout'>
          <CheckoutButton onClick={placeOrder} variant='container' fullWidth>Finalizar compra</CheckoutButton>
        </Link>
      </GridItem>
    </MainGridContainer>
  )
}

export default CheckoutTotals
