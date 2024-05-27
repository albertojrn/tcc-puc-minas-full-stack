import React from 'react'
import { Stack, Typography } from '@mui/material'
import { CardContainer } from '../../styles'

function AddressCard({ address = {}, selectedAddressId, setSelectedAddressId }) {
  const address1 = address.address_1 ?? '-'
  const address1Num = address.address_1_num ?? '-'
  const address2 = address.address_2 ?? '-'
  const zipCode = address.zip_code ?? '-'
  const city = address.city ?? '-'
  const state = address.state ?? '-'

  return (
    <CardContainer
      cursor='pointer'
      onClick={() => setSelectedAddressId(address.id)}
      selected={address.id === selectedAddressId}
    >
      <Stack direction='column' spacing={1}>
        <Typography noWrap variant='body1' fontWeight='bold'>
          {`${address1}`}
        </Typography>
        <Typography noWrap variant='body1'>
          {`Número: ${address1Num}`}
        </Typography>
        <Typography noWrap variant='body2'>
          {`${address2} - CEP: ${zipCode}`}
        </Typography>
        <Typography noWrap variant='body2'>
          {`${city} - ${state}`}
        </Typography>
      </Stack>
    </CardContainer>
  )
}

export default AddressCard
