import React from 'react'
import { Button } from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import { CartButtonContainer } from './styles'
import { createCartProduct } from '../../../../services/api/cart'
import { useUserContext } from '../../../../contexts/UserContext'

function AddToCartButton({ productId, selectedQuantity, selectedVariation, setError }) {
  const { cart, id, token, setUser } = useUserContext()

  async function onHandleClick() {
    const newError = {}
    if (!selectedVariation) newError.variation = 'Selecione cor e tamanho.'
    if (!selectedQuantity) newError.quantity = 'Escolha uma quantidade para colocar no carrinho.'
    setError(newError)
    if (!Object.keys(newError).length) {
      const res = await createCartProduct(
        {
          primary_color_id: selectedVariation.primaryColor,
          product_id: productId,
          quantity: selectedQuantity,
          secondary_color_id: selectedVariation.secondaryColor,
          size_id: selectedVariation.size,
          user_id: id,
        },
        token
      )
      if (res.status === 201 && res.data) {
        setUser({ cart: [...cart, res.data] })
      }
    }
  }

  return (
    <CartButtonContainer>
      <Button
        fullWidth
        onClick={onHandleClick}
        startIcon={<AddShoppingCart />}
        variant='contained'
      >
        Adicionar ao carrinho
      </Button>
    </CartButtonContainer>
  )
}

export default AddToCartButton
