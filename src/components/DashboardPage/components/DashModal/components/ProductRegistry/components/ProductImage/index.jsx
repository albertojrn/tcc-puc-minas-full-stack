import { Stack } from '@mui/material'
import React from 'react'
import ImageSlider from './components/ImageSlider'
import ThumbsContainer from './components/ThumbsContainer'
import AddImageButton from './components/AddImageButton'

function ProductImage({ isRegistry = null }) {
  return (
    <Stack direction='column' justifyContent='center'>
      <ImageSlider />
      <ThumbsContainer />
      {isRegistry && <AddImageButton />}
    </Stack>
  )
}

export default ProductImage
