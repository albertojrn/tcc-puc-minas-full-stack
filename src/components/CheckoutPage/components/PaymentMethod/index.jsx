import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PaymentOptions from './components/PaymentOptions'
import PixMethod from './components/PixMethod'
import SlipMethod from './components/SlipMethod'
import CardMethod from './components/CardMethod'

function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  const [paymentOptions, setPaymentOptions] = useState('pix')

  useEffect(() => {
    if (paymentOptions === 'pix') setPaymentMethod({ method: 'Pix', installments: 1 })
    else if (paymentOptions === 'slip') setPaymentMethod({ method: 'Boleto', installments: 1 })
    else if (paymentOptions === 'card') setPaymentMethod({ method: 'Cartão de Crédito', installments: 1 })
  }, [paymentOptions])

  return (
    <Stack direction='column' spacing={2}>
      <PaymentOptions
        paymentOptions={paymentOptions}
        setPaymentOptions={setPaymentOptions}
      />
      <Typography variant='body1'>
        Detalhes:
      </Typography>
      {paymentOptions === 'pix'
        && <PixMethod />}
      {paymentOptions === 'slip'
        && <SlipMethod />}
      {paymentOptions === 'card'
        && <CardMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />}
    </Stack>
  )
}

export default PaymentMethod
