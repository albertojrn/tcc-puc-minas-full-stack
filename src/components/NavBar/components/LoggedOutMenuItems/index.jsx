import React from 'react'
import { MenuItem } from '@mui/material'
import { DICTIONARY } from '../../../../constants/dictionary'
import { CustomLink } from '../../../../styles'

function LoggedOutMenuItems({ setAnchor }) {
  return (
    <CustomLink color='black' textDecoration='none' to='/login'>
      <MenuItem onClick={() => setAnchor(null)}>{DICTIONARY.SIGN_UP}</MenuItem>
    </CustomLink>
  )
}

export default LoggedOutMenuItems
