import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../../../../../styles'
import ProductImage from '../../../../../../../ProductImage'
import ProductFormFields from '../ProductFormFields'
import AddImageButton from '../../../../../../../ProductImage/components/AddImageButton'

function ProductRegistry({ product }) {
  const [selectedImages, setSelectedImages] = useState(product?.images ?? [])

  return (
    <MainGridContainer container spacing={2}>
      <GridItem item xs={12}>
        <Typography variant='h5'>{`${product ? 'Editar' : 'Novo'} Produto`}</Typography>
      </GridItem>
      <GridItem item xs={12} md={5}>
        <Stack direction='column' spacing={1}>
          <ProductImage isRegistry selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
          <AddImageButton selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
        </Stack>
      </GridItem>
      <GridItem item xs={12} md={7}>
        <ProductFormFields selectedImages={selectedImages} product={product} />
      </GridItem>
    </MainGridContainer>
  )
}

export default ProductRegistry
