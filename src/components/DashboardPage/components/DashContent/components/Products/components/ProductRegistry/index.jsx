import React, { useState } from 'react'
import { Stack } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../../../../../styles'
import ProductImage from '../ProductImage'
import ProductFormFields from '../ProductFormFields'
import AddImageButton from '../ProductImage/components/AddImageButton'

function ProductRegistry() {
  const [selectedImages, setSelectedImages] = useState([])
  console.log({selectedImages})

  return (
    <MainGridContainer container spacing={2}>
      <GridItem item xs={12} md={5}>
        <Stack direction='column' spacing={1}>
          <ProductImage isRegistry selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
          <AddImageButton selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
        </Stack>
      </GridItem>
      <GridItem item xs={12} md={7}>
        <ProductFormFields selectedImages={selectedImages} />
      </GridItem>
    </MainGridContainer>
  )
}

export default ProductRegistry
