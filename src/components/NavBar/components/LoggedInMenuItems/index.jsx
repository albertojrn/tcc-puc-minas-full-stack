import React from 'react'
import { MenuItem } from '@mui/material'
import { DICTIONARY } from '../../../../constants/dictionary'
import { CustomLink } from '../../../../styles'
import { useUserContext } from '../../../../contexts/UserContext'

function LoggedInMenuItems({ setAnchor }) {
  const { logoutUser } = useUserContext()

  function handleLogout() {
    setAnchor(null)
    logoutUser()
  }

  return (
    <>
      <CustomLink color='black' textDecoration='none' to='/my-profile'>
        <MenuItem onClick={() => setAnchor(null)}>{DICTIONARY.MY_ACCOUNT}</MenuItem>
      </CustomLink>
      <MenuItem onClick={handleLogout}>{DICTIONARY.LEAVE}</MenuItem>
    </>
  )
}

export default LoggedInMenuItems
