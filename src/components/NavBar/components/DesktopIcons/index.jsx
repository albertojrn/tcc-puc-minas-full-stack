import React, { useState } from 'react'
import { Badge, IconButton, Menu, Stack } from '@mui/material'
import { AccountCircle, ShoppingCart } from '@mui/icons-material'
import { IconsContainer, LoginContainer, LoginText } from './styles'
import { useUserContext } from '../../../../contexts/UserContext'
import LoggedInMenuItems from '../LoggedInMenuItems'
import { CustomLink } from '../../../../styles'

function DesktopIcons() {
  const [anchor, setAnchor] = useState(null)
  const { cart, token } = useUserContext()
  const quantities = cart.map(item => item.quantity)
  const cartTotal = quantities.reduce((a, b) => a + b, 0)

  return (
    <>
      <IconsContainer>
        {token
          ? (
            <Stack direction='row' alignItems='center' spacing={1}>
              <IconButton
                className='hideInMobile'
                color='inherit'
                edge='end'
                onClick={(e) => setAnchor(e.currentTarget)}
                size='large'
              >
                <AccountCircle />
              </IconButton>
              <CustomLink color='inherit' textDecoration='none' to='/cart'>
                <IconButton
                  color='inherit'
                  edge='end'
                  size='large'
                >
                  <Badge badgeContent={cartTotal} color='primary'>
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </CustomLink>
            </Stack>
          )
          : (
            <CustomLink className='hideInMobile' color='inherit' textDecoration='none' to='/login'>
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
          horizontal: 'right',
        }}
        className='hideInMobile'
        keepMounted
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <LoggedInMenuItems setAnchor={setAnchor} />
      </Menu>
    </>
  )
}

export default DesktopIcons
