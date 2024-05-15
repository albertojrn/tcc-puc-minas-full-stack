import { Stack } from '@mui/material'
import React, { useState } from 'react'
import ImageSlider from './components/ImageSlider'
import ThumbsContainer from './components/ThumbsContainer'
import AddImageButton from './components/AddImageButton'

function ProductImage({ isRegistry = null }) {
  const [sliderIndex, setSliderIndex] = useState(0)

  return (
    <Stack direction='column' justifyContent='center'>
      <ImageSlider sliderIndex={sliderIndex} setSliderIndex={setSliderIndex} />
      <ThumbsContainer sliderIndex={sliderIndex} setSliderIndex={setSliderIndex} />
      {isRegistry && <AddImageButton />}
    </Stack>
  )
}

export default ProductImage
