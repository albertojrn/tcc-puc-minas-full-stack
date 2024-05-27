import { FormControl, FormLabel, NativeSelect } from '@mui/material'
import React, { useState } from 'react'
import FormField from '../../../../../FormField'
import { GridItem, MainGridContainer } from '../../../../../../styles'

function CardMethod({ paymentMethod, setPaymentMethod }) {
  const [cardNumber, setCardNumber] = useState('1111 1111 1111 1111')
  const [validThrough, setValidThrough] = useState('11/11')
  const [code, setCode] = useState('11/11')
  const [cardName, setCardName] = useState('João José da Silva')

  return (
    <MainGridContainer container columnSpacing={1} rowSpacing={2}>
      <GridItem item xs={12}>
        <FormField
          disabled
          field='cardNumber'
          fullWidth
          label='Número do Cartão'
          inputProps={{
            maxLength: 19
          }}
          onlyNumbers
          pattern='9999 9999 9999 9999'
          placeholder='____ ____ ____ ____'
          required
          setField={setCardNumber}
          type='text'
          value={cardNumber}
        />
      </GridItem>
      <GridItem item xs={8}>
        <FormField
          disabled
          field='validThrough'
          fullWidth
          label='Validade'
          inputProps={{
            maxLength: 5
          }}
          onlyNumbers
          pattern='99/99'
          placeholder='__/__'
          required
          setField={setValidThrough}
          type='text'
          value={validThrough}
        />
      </GridItem>
      <GridItem item xs={4}>
        <FormField
          disabled
          field='code'
          fullWidth
          label='Cód.'
          inputProps={{
            maxLength: 3
          }}
          onlyNumbers
          pattern='999'
          placeholder='___'
          required
          setField={setCode}
          type='text'
          value={code}
        />
      </GridItem>
      <GridItem item xs={12}>
        <FormField
          disabled
          field='cardName'
          fullWidth
          label='Nome no cartão'
          required
          setField={setCardName}
          type='text'
          value={cardName}
        />
      </GridItem>
      <GridItem item xs={12}>
        <FormControl fullWidth>
          <FormLabel component='legend'>Selecione as Parcelas</FormLabel>
          <NativeSelect
            size='small'
            onChange={(e) => setPaymentMethod(prev => ({ ...prev, installments: e.target.value }))}
            value={paymentMethod?.installments ?? ''}
          >
            {[1, 2, 3]?.map(item => (
              <option key={item} value={item}>{`${item}x sem juros`}</option>
            ))}
          </NativeSelect>
        </FormControl>
      </GridItem>
    </MainGridContainer>
  )
}

export default CardMethod
