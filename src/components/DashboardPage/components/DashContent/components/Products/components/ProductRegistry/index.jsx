import React, { useState } from 'react'
import { IconButton, Stack, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { GridItem, MainGridContainer } from '../../../../../../../../styles'
import ProductImage from '../ProductImage'
import ProductFormFields from '../ProductFormFields'
import AddImageButton from '../ProductImage/components/AddImageButton'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'

function ProductRegistry() {
  const [selectedImages, setSelectedImages] = useState([])
  const { setDashboardParams } = useDashboardContext()

  return (
    <MainGridContainer container spacing={2}>
      <GridItem item xs={12}>
        <Stack direction='row' justifyContent='space-between' alignItems='cnter'>
          <Typography variant='h5'>Novo Produto</Typography>
          <IconButton onClick={() => setDashboardParams({ openModal: false })}>
            <Close />
          </IconButton>
        </Stack>
      </GridItem>
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
