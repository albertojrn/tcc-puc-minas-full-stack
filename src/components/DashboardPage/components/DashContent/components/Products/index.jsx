import React from 'react'
import { Divider, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import AddButton from '../AddButton'

function Products() {
  return (
    <MainGridContainer container drawBorder spacing={2}>
      <GridItem item xs={12}>
        <Typography component='' variant='h5'>
          Produtos
          &nbsp;
          <AddButton page='product' />
        </Typography>
      </GridItem>
      <GridItem item xs={12}>
        <Divider />
      </GridItem>
    </MainGridContainer>
  )
}

export default Products
