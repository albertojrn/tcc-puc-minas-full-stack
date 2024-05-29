import { Stack } from '@mui/material'
import React from 'react'
import { LoadButton } from './styles'

function LoadMoreButton({
  loadingProducts,
  productsCount,
  productsLength,
  setProductsPage,
}) {
  function handleChangePage() {
    if (productsLength < productsCount) {
      setProductsPage(prev => prev + 1)
    }
  }

  return (
    <Stack direction='column' alignItems='center'>
      <LoadButton
        disabled={productsLength === productsCount || loadingProducts}
        onClick={handleChangePage}
        variant='contained'
      >
        Carregar Mais Produtos
      </LoadButton>
    </Stack>
  )
}

export default LoadMoreButton
