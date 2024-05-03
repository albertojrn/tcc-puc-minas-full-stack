import React from 'react'
import { MenuItem } from '@mui/material'
import { DICTIONARY } from '../../../../constants/dictionary'

function LoggedOutMenuItems() {
  return (
    <>
      <MenuItem onClick={() => null}>{DICTIONARY.SIGN_UP}</MenuItem>
    </>
  )
}

export default LoggedOutMenuItems
