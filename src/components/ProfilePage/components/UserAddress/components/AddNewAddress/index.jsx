import React, { useState } from 'react'
import { Button, DialogActions, DialogContent, DialogTitle, FormHelperText, Stack } from '@mui/material'

import { CONSTRAINTS } from '../AddressFormFields/constants/validationParams'
import { useStoreContext } from '../../../../../../contexts/StoreContext'
import { useUserContext } from '../../../../../../contexts/UserContext'
import { createUserAddress, updateUserAddress } from '../../../../../../services/api/address'
import AddressFormFields from '../AddressFormFields'
import { validateFields } from '../../../../../../utils/formMethods'
import { useLoadingContext } from '../../../../../../contexts/LoadingContext'
import SQL_ERROR_STATUS_DICT from '../../../../../../constants/sqlErrorStatusDict'
import { Color } from '../../../../../../styles'

function AddNewAddress({ address }) {
  const isUpdate = address !== undefined
  const [address1, setAddress1] = useState(address?.address_1 ?? '')
  const [address1Num, setAddress1Num] = useState(address?.address_1_num ?? '')
  const [address2, setAddress2] = useState(address?.address_2 ?? '')
  const [addressState, setAddressState] = useState(address?.state ?? 'AC')
  const [city, setCity] = useState(address?.city ?? '')
  const [error, setError] = useState({})
  const [zipCode, setZipCode] = useState(address?.zip_code ?? '')
  const { setStorePersistent } = useStoreContext()
  const { addresses, id, token, setUser } = useUserContext()
  const { setLoading } = useLoadingContext()

  async function createNewAddress() {
    const validationFields = {
      address1,
      address1Num,
      address2,
      city,
      addressState,
      zipCode,
    }
    const constraints = CONSTRAINTS
    const validation = validateFields(validationFields, constraints)
    setError(validation.error)
    if (validation.passed) {
      setLoading({ show: true })
      const body = {
        address_1: address1,
        address_1_num: address1Num,
        address_2: address2,
        city,
        state: addressState,
        user_id: id,
        zip_code: zipCode,
      }
      if (isUpdate) {
        if (body.address_1 === address.address_1) delete body.address_1
        if (body.address_1_num === address.address_1_num) delete body.address_1_num
        if (body.address_2 === address.address_2) delete body.address_2
        if (body.state === address.state) delete body.state
        if (body.city === address.city) delete body.city
        if (body.zip_code === address.zip_code) delete body.zip_code
        if (Object.keys(body).length === 1) {
          setLoading({ show: false })
          return setError({ create: 'Nenhuma alteração foi feita.' })
        }
      }
      const res = (
        isUpdate
          ? await updateUserAddress(address.id, body, token)
          : await createUserAddress(body, token)
      )
      setLoading({ show: false })
      if (res.status === 201 && res.data?.id) {
        const newAddrasses = structuredClone(addresses)
        newAddrasses.push(res.data)
        setUser({ addresses: newAddrasses })
        setStorePersistent({ openDialog: false })
      }
      else if (res.status === 200 && res.data) {
        const newAddrasses = structuredClone(addresses)
        const changedAddress = newAddrasses.find(item => item.id === address.id)
        const addressIndex = newAddrasses.indexOf(changedAddress)
        newAddrasses[addressIndex] = { ...newAddrasses[addressIndex], ...res.data }
        setUser({ addresses: newAddrasses })
        setStorePersistent({ openDialog: false })
      }
      else if (res?.data?.error) {
        const errorStatus = res.data.error.status
        const errorMessage = SQL_ERROR_STATUS_DICT[errorStatus]
        setError({ create: errorMessage ?? `Não foi possível ${isUpdate ? 'editar' : 'criar'} o endereço. Tente novamente.` })
      }
    }
  }

  return (
    <>
      <DialogTitle>{`${isUpdate ? 'Editar' : 'Novo'} Endereço`}</DialogTitle>
      <DialogContent>
        <AddressFormFields
          address1={address1}
          address1Num={address1Num}
          address2={address2}
          addressState={addressState}
          city={city}
          error={error}
          setAddress1={setAddress1}
          setAddress1Num={setAddress1Num}
          setAddress2={setAddress2}
          setAddressState={setAddressState}
          setCity={setCity}
          setError={setError}
          setZipCode={setZipCode}
          zipCode={zipCode}
        />
      </DialogContent>
      <DialogActions>
        <Stack direction='column' justifyContent='end'>
          <Stack direction='row' justifyContent='end' alignItems='center'>
            <Button color='standard' onClick={() => setStorePersistent({ openDialog: false })}>Cancelar</Button>
            <Button color='standard' onClick={createNewAddress}>Ok</Button>
          </Stack>
          {error.create && <FormHelperText><Color color='red'>{error.create}</Color></FormHelperText>}
        </Stack>
      </DialogActions>
    </>
  )
}

export default AddNewAddress
