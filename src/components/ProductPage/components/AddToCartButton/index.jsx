import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { AddShoppingCart, CheckCircleOutline } from '@mui/icons-material'
import { CartButtonContainer } from './styles'
import { createCartProduct, updateCartProduct } from '../../../../services/api/cart'
import { useUserContext } from '../../../../contexts/UserContext'

function AddToCartButton({ productId, selectedQuantity, selectedVariation, setError }) {
  const [showAddedIcon, setShowAddedIcon] = useState(false)
  const { cart, id, token, setUser } = useUserContext()
  const location = useLocation()
  const navigate = useNavigate()

  async function onHandleClick() {
    const newError = {}
    if (!selectedVariation) newError.variation = 'Selecione cor e tamanho.'
    if (!selectedQuantity) newError.quantity = 'Escolha uma quantidade para colocar no carrinho.'
    if (!Object.keys(newError).length) {
      if (!token) return navigate(`/login?redirectUrl=${location.pathname}`)
      const primary_color_id = selectedVariation.primaryColor
      const product_id = productId
      const quantity = selectedQuantity
      const secondary_color_id = selectedVariation.secondaryColor
      const size_id = selectedVariation.size
      const user_id = id
      const cartItem = cart.find(item => (
        item.primary_color_id === primary_color_id
        && item.secondary_color_id === secondary_color_id
        && item.product_id === product_id
        && item.user_id === user_id
        && item.size_id === size_id
      ))
      let res
      if (cartItem) {
        res = await updateCartProduct(
          user_id,
          product_id,
          primary_color_id,
          secondary_color_id,
          size_id,
          { quantity: cartItem.quantity + quantity },
          token
        )
      }
      else {
        res = await createCartProduct(
          {
            primary_color_id,
            product_id,
            quantity,
            secondary_color_id,
            size_id,
            user_id,
          },
          token
        )
      }
      if (res.status === 201 && res.data) {
        setUser({ cart: [...cart, res.data] })
        setShowAddedIcon(true)
      }
      else if (res.status === 200 && res.data) {
        const newCart = structuredClone(cart)
        newCart[cart.indexOf(cartItem)].quantity = res.data.quantity
        setUser({ cart: newCart })
        setShowAddedIcon(true)
      }
      else newError.cart = 'Não foi possível adicionar ao carrinho. Tente novamente.'
    }
    setError(newError)
  }

  useEffect(() => {
    let hideTimeout
    if (showAddedIcon) {
      hideTimeout = setTimeout(() => setShowAddedIcon(false), 500)
    }
    return (
      () => {
        if (hideTimeout) clearInterval(hideTimeout)
      }
    )
  }, [showAddedIcon])

  return (
    <CartButtonContainer showAddedIcon={showAddedIcon}>
      <Button
        color={showAddedIcon ? 'success' : 'primary'}
        fullWidth
        onClick={onHandleClick}
        startIcon={showAddedIcon ? <CheckCircleOutline /> : <AddShoppingCart />}
        variant='contained'
      >
        Adicionar ao carrinho
      </Button>
    </CartButtonContainer>
  )
}

export default AddToCartButton
