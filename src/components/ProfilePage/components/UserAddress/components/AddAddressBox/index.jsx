import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { CardContainer } from '../../styles'
import { useStoreContext } from '../../../../../../contexts/StoreContext'
import AddNewAddress from '../AddNewAddress'

function AddAddressBox() {
  const { setStorePersistent } = useStoreContext()

  function openFormDialog() {
    setStorePersistent({
      dialogChild: (
        <AddNewAddress />
      ),
      openDialog: true,
    })
  }

  return (
    <CardContainer
      cursor='pointer'
      onClick={openFormDialog}
      preventUserSelection
    >
      <Stack direction='column' alignItems='center' justifyContent='center'>
        <Add />
        <Typography align='center' variant='body2' fontSize='small'>
          Novo
          <br />
          Endereço
        </Typography>
      </Stack>
    </CardContainer>
  )
}

export default AddAddressBox
