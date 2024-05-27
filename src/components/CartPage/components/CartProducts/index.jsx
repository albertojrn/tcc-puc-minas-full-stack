import React from 'react'
import { useUserContext } from '../../../../contexts/UserContext'
import { CustomDivider, GridItem, MainGridContainer } from '../../../../styles'
import CartProductsRow from '../CartProductsRow'

function CartProducts({ cartProductsInfo, featuresValues, isCheckoutPage }) {
  const { cart } = useUserContext()
  return (
    <MainGridContainer container drawBorder={!isCheckoutPage} spacing={1} alignItems='center'>
      {cart?.map((cartItem, i) => (
        <React.Fragment key={`${cartItem.product_id}${cartItem.primary_color_id}${cartItem.secondary_color_id}${cartItem.size_id}`}>
          <CartProductsRow
            cartItem={cartItem}
            cartProductsInfo={cartProductsInfo}
            featuresValues={featuresValues}
            isCheckoutPage={isCheckoutPage}
          />
          { i < cart.length - 1
            && (
              <GridItem item xs={12}>
                <CustomDivider color='rgba(0, 0, 0, 0.3)' />
              </GridItem>
            )}
        </React.Fragment>
      ))}
    </MainGridContainer>
  )
}

export default CartProducts
