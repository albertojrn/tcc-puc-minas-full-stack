import React, { useState } from 'react'
import { IconButton, Menu } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { IconsContainer, LoginContainer, LoginText } from './styles'
import { useUserContext } from '../../../../contexts/UserContext'
import LoggedInMenuItems from '../LoggedInMenuItems'
import { CustomLink } from '../../../../styles'

function DesktopIcons() {
  const [anchor, setAnchor] = useState(null)
  const { token } = useUserContext()

  return (
    <>
      <IconsContainer>
        {token
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
            <CustomLink color='inherit' textDecoration='none' to='/login'>
              <LoginContainer direction='row' alignItems='center' spacing={1}>
                <AccountCircle />
                <LoginText color='inherit'>
                  Entre
                  <br />
                  ou Cadastre-se
                </LoginText>
              </LoginContainer>
            </CustomLink>
          )}
      </IconsContainer>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
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
