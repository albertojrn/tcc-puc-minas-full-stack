import React from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { GridItem, MainGridContainer } from '../../styles'
import { ConfirmationContainer } from './styles'
import { useStoreContext } from '../../contexts/StoreContext'
import Redirect from '../Redirect'

function OrderConfirmationPage() {
  const { orderConfirmationSlug } = useStoreContext()
  const { slug } = useParams()

  if (!orderConfirmationSlug || orderConfirmationSlug !== slug) return <Redirect to='/' />

  return (
    <MainGridContainer container spacing={2} maxWidth={{ md: '1200px' }}>
      <GridItem item xs={12}>
        <Typography align='center' variant='h6'>
          PEDIDO
          <br />
          CONFIRMADO
        </Typography>
      </GridItem>
      <GridItem item xs={12}>
        <ConfirmationContainer direction='column' justifyContent='center' alignItems='center'>
          <CheckCircle color='success' />
        </ConfirmationContainer>
      </GridItem>
      <GridItem item xs={12}>
        <Typography align='center' variant='body1'>
          Seu pedido foi realizado com sucesso.
          <br />
          Estamos processando o pagamento e em breve você receberá mais detalhes por email.
        </Typography>
      </GridItem>
      <GridItem item xs={12}>
        <Typography align='center' variant='h6'>
          Obrigado ;)
        </Typography>
      </GridItem>
    </MainGridContainer>
  )
}

export default OrderConfirmationPage
