import React from 'react'
import { Button, Divider, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../../../styles'

function ProductRegister() {
  return (
    <MainGridContainer container drawBorder spacing={2}>
      <GridItem item xs={12}>
        <Typography component='' variant='h5'>
          Produtos
          &nbsp;
          <Button variant='contained'>Novo</Button>
        </Typography>
      </GridItem>
      <GridItem item xs={12}>
        <Divider />
      </GridItem>
    </MainGridContainer>
  )
}

export default ProductRegister
