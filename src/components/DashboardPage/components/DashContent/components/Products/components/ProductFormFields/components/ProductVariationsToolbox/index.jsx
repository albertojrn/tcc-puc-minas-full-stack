import React from 'react'
import { IconButton, Stack } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'

function ProductVariationsToolbox({ index, setVariations }) {
  function deleteVariation() {
    setVariations(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <Stack direction='row' edge='end' spacing={0}>
      <IconButton size='small'>
        <Edit />
      </IconButton>
      <IconButton size='small' onClick={deleteVariation}>
        <Delete />
      </IconButton>
    </Stack>
  )
}

export default ProductVariationsToolbox
