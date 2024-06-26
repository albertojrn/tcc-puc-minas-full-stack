import React, { useState } from 'react'
import { IconButton, Menu } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { IconsContainer } from './styles'
import { useUserContext } from '../../../../contexts/UserContext'
import LoggedInMenuItems from '../LoggedInMenuItems'
import LoggedOutMenuItems from '../LoggedOutMenuItems'

function MobileIcons() {
  const [anchor, setAnchor] = useState(null)
  const { token } = useUserContext()

  return (
    <>
      <IconsContainer>
        <IconButton
          size="large"
          onClick={(e) => setAnchor(e.currentTarget)}
          color="inherit"
        >
          <MoreVert />
        </IconButton>
      </IconsContainer>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        {token
          ? <LoggedInMenuItems setAnchor={setAnchor} />
          : <LoggedOutMenuItems setAnchor={setAnchor}/>}
      </Menu>
    </>
  )
}

export default MobileIcons
