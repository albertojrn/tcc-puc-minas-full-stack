import React, { useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack
} from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../styles'
import FormField from '../../../FormField'
import { formatPrice } from '../../../../utils/formatMethods'
import { validateFields } from '../../../../utils/formMethods'
import { CONSTRAINTS } from './constants/validationParams'
import { useUserContext } from '../../../../contexts/UserContext'

function ShippingCalculator({ isCheckoutPage, shippingFee, selectedAddressId, setShippingFee }) {
  const { addresses } = useUserContext()
  const selectedZipCode = selectedAddressId
    && addresses?.find(address => address.id === selectedAddressId)?.zip_code
  const [error, setError] = useState({})
  const [originZipCode, setOriginZipCode] = useState('')
  const [feesOptions, setFeesOptions] = useState([])

  function handleShippingCalculation(skipValidation) {
    let validation = {}
    if (!skipValidation) {
      validation = validateFields({ originZipCode }, CONSTRAINTS)
      setError(validation.error)
    }
    if (validation.passed || skipValidation) {
      const options = [
        {
          fee: 10.90,
          name: 'PAC',
          workingDays: 7,
        },
        {
          fee: 23.90,
          name: 'Sedex',
          workingDays: 2,
        },
        {
          fee: 39,
          name: 'Sedex 10',
          workingDays: 1,
        },
      ]
      setShippingFee(options[0])
      setFeesOptions(options)
    }
  }

  useEffect(() => {
    handleShippingCalculation(true)
  }, [selectedZipCode])

  return (
    <MainGridContainer container drawBorder={!isCheckoutPage} spacing={1} alignItems='center'>
      {!selectedZipCode
        && (
          <GridItem item xs={12}>
            <Stack direction='row' spacing={2} alignItems='stretch' justifyContent='stretch'>
              <FormField
                error={error}
                field='originZipCode'
                label='CEP (somente números)'
                onlyNumbers
                padding='12px 14px'
                pattern='99999-999'
                placeholder='_____-___'
                required
                setError={setError}
                setField={setOriginZipCode}
                type='text'
                value={originZipCode}
              />
              <Button variant='contained' onClick={handleShippingCalculation}>OK</Button>
            </Stack>
          </GridItem>
        )}
      {!!feesOptions?.length
        && (
          <GridItem item xs={12}>
            <FormControl>
              <FormLabel>Opções de frete</FormLabel>
              <RadioGroup
                value={shippingFee?.name}
                onChange={(e) => setShippingFee(feesOptions.find(o => o.name === e.target.value))}
              >
                {feesOptions.map((option => (
                  <FormControlLabel
                    control={<Radio size='small' />}
                    key={option.name}
                    label={`${option.name} (${option.workingDays} dias úteis) - ${formatPrice(option.fee)}`}
                    value={option.name}
                  />
                )))}
              </RadioGroup>
            </FormControl>
          </GridItem>
        )}
    </MainGridContainer>
  )
}

export default ShippingCalculator
