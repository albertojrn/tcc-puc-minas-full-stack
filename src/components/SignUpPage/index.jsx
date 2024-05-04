import React from 'react'
import { Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../styles'
import SignUpFormFields from './components/SignUpFormFields'

function SignUpPage() {
  return (
    <MainGridContainer
      alignItems='center'
      container
      drawBorder
      marginTop={{ md: '32PX' }}
      maxWidth={{ md: '40%' }}
      spacing={2}
    >
      <GridItem item xs={12}>
        <Typography component='div' variant='h4' align='center'>
          Crie seu cadastro
        </Typography>
        <Typography component='div' variant='body2' align='center'>
          *campos obrigatórios
        </Typography>
      </GridItem>
      <SignUpFormFields />
    </MainGridContainer>
  )
}

export default SignUpPage
