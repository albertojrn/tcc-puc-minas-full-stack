import React, { useState } from 'react'
import { Menu, MenuItem, Stack, Typography } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { CardContainer } from '../../styles'
import { MenuButton } from './styles'
import { useStoreContext } from '../../../../../../contexts/StoreContext'
import AddNewAddress from '../AddNewAddress'
import { deleteUserAddress } from '../../../../../../services/api/address'
import { useUserContext } from '../../../../../../contexts/UserContext'
import DialogRetry from '../../../../../DialogRetry'
import DialogYesNo from '../../../../../DialogYesNo'
import { useLoadingContext } from '../../../../../../contexts/LoadingContext'

function AddressCard({ address = {}, selectedAddressId, setSelectedAddressId }) {
  const [anchorMenu, setAnchorMenu] = useState(null)
  const { setStorePersistent } = useStoreContext()
  const { addresses, id, token, setUser } = useUserContext()
  const { setLoading } = useLoadingContext()
  const address1 = address.address_1 ?? '-'
  const address1Num = address.address_1_num ?? '-'
  const address2 = address.address_2 ?? '-'
  const zipCode = address.zip_code ?? '-'
  const city = address.city ?? '-'
  const state = address.state ?? '-'

  function openEditFormDialog() {
    setStorePersistent({
      dialogChild: (
        <AddNewAddress address={address} />
      ),
      openDialog: true,
    })
    setAnchorMenu(null)
  }

  async function handleDeleteAddress() {
    setLoading({ show: true })
    const res = await deleteUserAddress(address.id, id, token)
    if (res.status === 204) {
      const newAddresses = structuredClone(addresses).filter(a => a.id !== address.id)
      setUser({ addresses: newAddresses })
    }
    else if (res?.data?.error) {
      setStorePersistent({
        dialogChild: (
          <DialogRetry
            text={`Não foi possível excluir o endereço '${address1}'. Tente novamente.`}
            title='Atenção'
            onRetry={handleDeleteAddress}
            setDialogParams={setStorePersistent}
          />
        ),
        openDialog: true,
      })
    }
    setLoading({ show: false })
  }

  function confirmDeleteAddress() {
    setStorePersistent({ openDialog: false })
    setAnchorMenu(null)
    handleDeleteAddress()
  }

  function openDeleteConfirmation() {
    setAnchorMenu(null)
    setStorePersistent({
      dialogChild: (
        <DialogYesNo
          onYes={confirmDeleteAddress}
          text={`Tem certeza de que deseja excluir o produto '${address1}'?`}
          title='PRECISAMOS DA SUA CONFIRMAÇÃO'
          setDialogParams={setStorePersistent}
        />
      ),
      openDialog: true,
    })
  }

  return (
    <CardContainer
      cursor='pointer'
      onClick={() => setSelectedAddressId && setSelectedAddressId(address.id)}
      selected={address.id === selectedAddressId}
    >
      <Stack direction='column' spacing={1}>
        <Typography variant='body1' fontWeight='bold'>
          {`${address1}`}
        </Typography>
        <Typography variant='body1'>
          {`Número: ${address1Num}`}
        </Typography>
        <Typography variant='body2'>
          {`${address2} - CEP: ${zipCode}`}
        </Typography>
        <Typography variant='body2'>
          {`${city} - ${state}`}
        </Typography>
      </Stack>
      <MenuButton onClick={(e) => setAnchorMenu(e.currentTarget)}>
        <MoreVert />
      </MenuButton>
      <Menu
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={() => setAnchorMenu(null)}
      >
        <MenuItem onClick={openEditFormDialog}>Editar</MenuItem>
        <MenuItem onClick={openDeleteConfirmation}>Excluir</MenuItem>
      </Menu>
    </CardContainer>
  )
}

export default AddressCard
