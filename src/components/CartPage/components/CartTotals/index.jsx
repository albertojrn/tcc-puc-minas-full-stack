import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../styles'
import { formatPrice } from '../../../../utils/formatMethods'
import { useUserContext } from '../../../../contexts/UserContext'
import { COLORS } from '../../../../constants/theme'
import { CheckoutButton } from './styles'

function CartTotals({ cartProductsInfo, shippingFee }) {
  const { cart } = useUserContext()
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

  return (
    <MainGridContainer backgroundColor={COLORS.mediumgray} container drawBorder spacing={1} alignItems='center'>
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
          <Typography align='right' variant='body2'>
            {`ou em 3x de ${cartTotals && typeof cartTotals === 'number' ? formatPrice(cartTotals / 3) : '-'}`}
          </Typography>
        </Stack>
      </GridItem>
      <GridItem item xs={12}>
        <Link to='/checkout'>
          <CheckoutButton variant='container' fullWidth>Continuar</CheckoutButton>
        </Link>
      </GridItem>
    </MainGridContainer>
  )
}

export default CartTotals
