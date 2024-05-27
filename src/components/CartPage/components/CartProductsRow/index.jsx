import React, { useEffect, useRef, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { GridItem, ListImgThumb } from '../../../../styles'
import FormField from '../../../FormField'
import { formatPrice } from '../../../../utils/formatMethods'
import { updateCartProduct } from '../../../../services/api/cart'
import { useUserContext } from '../../../../contexts/UserContext'

function CartProductsRow({ cartItem, cartProductsInfo, featuresValues, isCheckoutPage }) {
  const [quantity, setQuantity] = useState(cartItem.quantity)
  const prevQuantity = useRef(cartItem.quantity)
  const timeout = useRef(null)
  const updatingQuantity = useRef(false)
  const { cart, token, setUser } = useUserContext()
  const product = cartProductsInfo?.[cartItem.product_id]
  const thumb = product?.images?.[0]
  const title = product?.title ?? ''
  const productVariation = product?.variations?.find(variation => (
    variation.size === cartItem.size_id
    && variation.primaryColor === cartItem.primary_color_id
    && variation.secondaryColor === cartItem.secondary_color_id
  ))
  const totalPrice = productVariation?.price * quantity
  const itemSize = featuresValues?.find(featVal => featVal.id === cartItem.size_id)?.name
  const itemPrimaryColor = featuresValues?.find(featVal => featVal.id === cartItem.primary_color_id)?.name
  const itemSecondaryColor = cartItem.secondary_color_id
    ? featuresValues?.find(featVal => featVal.id === cartItem.primary_color_id)?.name
    : ''
  const sizeText = `Cor: ${itemPrimaryColor} ${itemSecondaryColor ? ` / ${itemSecondaryColor} ` : ''}Tam: ${itemSize}`

  async function handleUpdateQuantity() {
    if (quantity) {
      if (timeout.current && !updatingQuantity.current) clearTimeout(timeout.current)
      timeout.current = setTimeout(async () => {
        const user_id = cartItem.user_id
        const product_id = cartItem.product_id
        const primary_color_id = cartItem.primary_color_id
        const secondary_color_id = cartItem.secondary_color_id
        const size_id = cartItem.size_id
        updatingQuantity.current = true
        const res = await updateCartProduct(
          user_id,
          product_id,
          primary_color_id,
          secondary_color_id,
          size_id,
          { quantity },
          token
        )
        if (res.status === 200 && res.data) {
          const newCart = structuredClone(cart)
          const changedItem = newCart.find(item => (
            item.user_id === cartItem.user_id
            && item.product_id === cartItem.product_id
            && item.primary_color_id === cartItem.primary_color_id
            && item.secondary_color_id === cartItem.secondary_color_id
            && item.size_id === cartItem.size_id
          ))
          changedItem.quantity = res.data.quantity
          setUser({ cart: newCart })
        }
        updatingQuantity.current = false
      }, 1000)
    }
  }

  useEffect(() => {
    if (quantity !== undefined
        && quantity !== null
        && prevQuantity.current !== quantity
        && !isCheckoutPage) {
      prevQuantity.current = quantity
      handleUpdateQuantity()
    }
  }, [quantity])

  return (
    <>
      {!isCheckoutPage
        && (
          <GridItem display={{ xs: 'none', md: 'block' }} item md={1.4}>
            {thumb
                && <ListImgThumb src={`${process.env.PUBLIC_URL}/images/${thumb}`} alt={thumb.slice(0, 5)} />}
          </GridItem>
        )}
      <GridItem item xs={7.5} md={isCheckoutPage ? 7.5 : 7.1}>
        <Stack direction='column'>
          <Typography noWrap variant='body1'>
            {title}
          </Typography>
          <Typography variant='body2'>
            {sizeText}
          </Typography>
        </Stack>
      </GridItem>
      <GridItem item xs={2.5} md={1.5}>
        {isCheckoutPage
          ? (
            <Typography align='right' variant='body1'>
              {`x ${quantity}`}
            </Typography>
          )
          : (
            <FormField
              field='quantity'
              fullWidth
              inputProps={{
                min: 1,
                step: 1,
              }}
              label='Qtd'
              onBlurNum={1}
              padding='12px 8px'
              required
              setField={setQuantity}
              type='number'
              value={quantity}
            />
          )}
      </GridItem>
      <GridItem item xs={isCheckoutPage ? 3 : 2}>
        <Stack direction='column' spacing={0}>
          <Typography align='right' variant='caption'>
            Total:
          </Typography>
          <Typography align='right' variant='body2' fontWeight='bold'>
            {formatPrice(totalPrice)}
          </Typography>
        </Stack>
      </GridItem>
    </>
  )
}

export default CartProductsRow
