import React, { useEffect } from 'react'
import { Stack, Typography } from '@mui/material'
import { useUserContext } from '../../../../contexts/UserContext'
import { readUserAddress } from '../../../../services/api/address'
import { GridItem, MainGridContainer } from '../../../../styles'
import AddAddressBox from './components/AddAddressBox'
import AddressCard from './components/AddressCard'

function UserAddress({ isCheckoutPage, selectedAddressId, setSelectedAddressId }) {
  const { addresses, id, setUser, token } = useUserContext()

  async function loadUserData() {
    if (token) {
      const promises = []
      if (!addresses.length) {
        promises.push(readUserAddress(id, token))
        const res = await Promise.all(promises)
        if (res[0]?.status === 200 && Array.isArray(res[0]?.data) && res[0]?.data.length) {
          setUser(prev => ({ ...prev, addresses: res[0].data }))
          if (setSelectedAddressId) setSelectedAddressId(res[0].data[0].id)
        }
      }
      else if (setSelectedAddressId) setSelectedAddressId(addresses[0].id)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [token])

  return (
    <Stack direction='column' spacing={2} alignItems='stretch'>
      <Typography variant='h6'>
        {isCheckoutPage ? 'Selecione o endereço de entrega' : ''}
      </Typography>
      <MainGridContainer container columnSpacing={{ xs: 0, sm: 3 }} rowSpacing={{ xs: 3 }}>
        <GridItem isFlex item xs={12} sm={2}>
          <AddAddressBox />
        </GridItem>
        {addresses?.map(address => (
          <GridItem item isFlex direction='row' xs={12} sm={6} md={3} key={address.id}>
            <AddressCard
              address={address}
              selectedAddressId={selectedAddressId}
              setSelectedAddressId={setSelectedAddressId}
            />
          </GridItem>
        ))}
      </MainGridContainer>
    </Stack>
  )
}

export default UserAddress
