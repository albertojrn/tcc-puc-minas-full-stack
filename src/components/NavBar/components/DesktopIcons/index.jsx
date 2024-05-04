import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton, Menu } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { IconsContainer, LoginButton } from './styles'
import { useUserContext } from '../../../../contexts/UserContext'
import LoggedInMenuItems from '../LoggedInMenuItems'
import { DICTIONARY } from '../../../../constants/dictionary'

function DesktopIcons() {
  const [anchor, setAnchor] = useState(null)
  const { isLoggedIn } = useUserContext()

  return (
    <>
      <IconsContainer>
        {isLoggedIn
          ? (
            <IconButton
              size='large'
              edge='end'
              onClick={(e) => setAnchor(e.currentTarget)}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          )
          : (
            <Link to='/login'>
              <LoginButton>
                {DICTIONARY.SIGN_UP}
              </LoginButton>
            </Link>
          )
        }
      </IconsContainer>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'top',
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
        <LoggedInMenuItems />
      </Menu>
    </>
  )
}

export default DesktopIcons
