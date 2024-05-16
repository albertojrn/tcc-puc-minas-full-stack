import React from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import AddButton from '../AddButton'

function Products() {
  return (
    <MainGridContainer container spacing={2}>
      <GridItem item xs={12}>
        <Stack direction='row' spacing={1}>
          <Typography component='' variant='h5'>
            Produtos
            &nbsp;
          </Typography>
          <AddButton page='product' />
        </Stack>
      </GridItem>
      <GridItem item xs={12}>
        <Divider />
      </GridItem>
    </MainGridContainer>
  )
}

export default Products
