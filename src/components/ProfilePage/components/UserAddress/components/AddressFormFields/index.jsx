import React from 'react'
import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@mui/material'
import FormField from '../../../../../FormField'
import { Color, GridItem, MainGridContainer } from '../../../../../../styles'
import { BR_STATES_LIST } from '../../constants/brStatesList'

function AddressFormFields({
  address1,
  address1Num,
  address2,
  addressState,
  city,
  error,
  setAddress1,
  setAddress1Num,
  setAddress2,
  setAddressState,
  setCity,
  setError,
  setZipCode,
  zipCode,
}) {
  return (
    <MainGridContainer container spacing={2}>
      <GridItem item xs={12} sm={8}>
        <FormField
          autoComplete='address-line1'
          error={error}
          field='address1'
          fullWidth
          label='Endereço (Rua, Av...)'
          required
          setError={setError}
          setField={setAddress1}
          value={address1}
        />
      </GridItem>
      <GridItem item xs={12} sm={4}>
        <FormField
          error={error}
          field='address1Num'
          fullWidth
          label='Num.'
          required
          setError={setError}
          setField={setAddress1Num}
          value={address1Num}
        />
      </GridItem>
      <GridItem item xs={12} sm={8}>
        <FormField
          autoComplete='address-line2'
          error={error}
          field='address2'
          fullWidth
          label='Complemento (Casa, Ap, Bloco...)'
          required
          setError={setError}
          setField={setAddress2}
          value={address2}
        />
      </GridItem>
      <GridItem item xs={12} sm={4}>
        <FormField
          error={error}
          field='zipCode'
          label='CEP (somente números)'
          onlyNumbers
          pattern='99999-999'
          placeholder='_____-___'
          required
          setError={setError}
          setField={setZipCode}
          type='text'
          value={zipCode}
        />
      </GridItem>
      <GridItem item xs={12} sm={8}>
        <FormField
          autoComplete='address-level2'
          error={error}
          field='city'
          fullWidth
          label='Cidade'
          required
          setError={setError}
          setField={setCity}
          value={city}
        />
      </GridItem>
      <GridItem item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Estado*</InputLabel>
          <NativeSelect
            onChange={(e) => setAddressState(e.target.value)}
            value={addressState}
          >
            {BR_STATES_LIST.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </NativeSelect>
          {error?.addressState && <FormHelperText><Color color='red'>{error?.addressState}</Color></FormHelperText>}
        </FormControl>
      </GridItem>
    </MainGridContainer>
  )
}

export default AddressFormFields
