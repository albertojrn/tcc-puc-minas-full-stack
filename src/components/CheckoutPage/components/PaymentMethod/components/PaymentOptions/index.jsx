import React from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

function PaymentOptions({ paymentOptions, setPaymentOptions }) {
  return (
    <FormControl required color='info'>
      <FormLabel>Selecione</FormLabel>
      <RadioGroup
        value={paymentOptions}
        onChange={(e) => setPaymentOptions(e.target.value)}
      >
        <FormControlLabel value='pix' control={<Radio />} label='PIX' />
        <FormControlLabel value='slip' control={<Radio />} label='Boleto' />
        <FormControlLabel value='card' control={<Radio />} label='Cartão de Crédito' />
      </RadioGroup>
    </FormControl>
  )
}

export default PaymentOptions
