import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import DialogYesNo from '../../../../../../../DialogYesNo'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import DialogRetry from '../../../../../../../DialogRetry'
import { deleteUsers } from '../../../../../../../../services/api/users'
import { useUserContext } from '../../../../../../../../contexts/UserContext'
import { updateListPagesOnDelete } from '../../../../utils/updateListPagesOnDelete'
import AddUser from '../AddUser'

function UsersListItemToolbox({ user, page }) {
  const [anchorMenu, setAnchorMenu] = useState(null)
  const { setDashboardParams } = useDashboardContext()
  const { users, setDashboardData } = useDashboardDataContext()
  const { setLoading } = useLoadingContext()
  const { token } = useUserContext()
  const open = Boolean(anchorMenu)

  function handleOpenEditUser() {
    setAnchorMenu(null)
    setDashboardParams({
      modalChild: (
        <AddUser user={user} />
      ),
      openModal: true,
    })
  }

  async function handleDeleteUser() {
    setLoading({ show: true })
    const res = await deleteUsers(user.id, token)
    if (res.status === 204) {
      const newUsers = updateListPagesOnDelete(users, page, user)
      setDashboardData({ users: newUsers })
    }
    else if (res?.data?.error) {
      setDashboardParams({
        dialogChild: (
          <DialogRetry
            text={`Não foi possível excluir o usuáirio ${user.name}. Tente novamente.`}
            title='Atenção'
            onRetry={handleDeleteUser}
          />
        ),
        openDialog: true,
      })
    }
    setLoading({ show: false })
  }

  function confirmDeleteUser() {
    setDashboardParams({ openDialog: false })
    setAnchorMenu(null)
    handleDeleteUser()
  }

  function openDeleteConfirmation() {
    setAnchorMenu(null)
    setDashboardParams({
      dialogChild: (
        <DialogYesNo
          onYes={confirmDeleteUser}
          text={`Tem certeza de que deseja excluir o usuário '${user.name}'?`}
          title='PRECISAMOS DA SUA CONFIRMAÇÃO'
        />
      ),
      openDialog: true,
    })
  }

  return (
    <>
      <IconButton onClick={(e) => setAnchorMenu(e.currentTarget)}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorMenu}
        open={open}
        onClose={() => setAnchorMenu(null)}
      >
        <MenuItem onClick={handleOpenEditUser}>Editar</MenuItem>
        <MenuItem onClick={openDeleteConfirmation}>Excluir</MenuItem>
      </Menu>
    </>
  )
}

export default UsersListItemToolbox
