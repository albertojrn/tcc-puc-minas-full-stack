import { Stack } from '@mui/material'
import React, { useState } from 'react'
import ImageSlider from './components/ImageSlider'
import ThumbsContainer from './components/ThumbsContainer'

function ProductImage({ isRegistry = null, selectedImages, setSelectedImages, height }) {
  const [sliderIndex, setSliderIndex] = useState(0)

  return (
    <Stack direction='column' justifyContent='center' spacing={3}>
      <ImageSlider
        isRegistry={isRegistry}
        options={{
          controls: false,
          indicators: false,
          interval: null,
        }}
        selectedImages={selectedImages}
        setSliderIndex={setSliderIndex}
        sliderIndex={sliderIndex}
        height={height}
      />
      <ThumbsContainer
        isRegistry={isRegistry}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        setSliderIndex={setSliderIndex}
        sliderIndex={sliderIndex}
      />
    </Stack>
  )
}

export default ProductImage
