import React from 'react'
import { MenuItem } from '@mui/material'
import { DICTIONARY } from '../../../../constants/dictionary'

function LoggedInMenuItems() {
  return (
    <>
      <MenuItem onClick={() => null}>{DICTIONARY.MY_ACCOUNT}</MenuItem>
      <MenuItem onClick={() => null}>{DICTIONARY.LEAVE}</MenuItem>
    </>
  )
}

export default LoggedInMenuItems
