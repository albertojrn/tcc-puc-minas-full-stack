import React from 'react'
import { IconButton, Stack } from '@mui/material'
import { Delete } from '@mui/icons-material'

function ProductVariationsToolbox({ groupedVariation, setVariations }) {
  function deleteVariation() {
    setVariations(prev => prev.filter(
      variation => (
        !(variation.primaryColor === groupedVariation.primaryColor
        && variation.secondaryColor === groupedVariation.secondaryColor)
      )
    ))
  }

  return (
    <Stack direction='row' edge='end' spacing={0}>
      <IconButton size='small' onClick={deleteVariation}>
        <Delete />
      </IconButton>
    </Stack>
  )
}

export default ProductVariationsToolbox
