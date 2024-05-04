import React from 'react'
import { useLocation } from 'react-router-dom'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { LogoContainer } from './styles'
import SearchForm from './components/SearchForm'
import DesktopIcons from './components/DesktopIcons'
import MobileIcons from './components/MobileIcons'
import logo from '../../assets/images/logo_letters.png'
import { NAVBAR_HIDE_PART_ON_ROUTES, NAVBAR_HIDE_ON_ROUTES } from '../../constants/routesNotAllowed'
import { AppBarContainer } from '../../styles'

function NavBar() {
  const location = useLocation()
  if (NAVBAR_HIDE_ON_ROUTES.includes(location.pathname)) return null
  const showContent = !NAVBAR_HIDE_PART_ON_ROUTES.includes(location.pathname)

  return (
    <AppBarContainer>
      <AppBar position='static'>
        <Toolbar>
          {showContent
            && (
              <IconButton
                color='inherit'
                edge='start'
                size='large'
              >
                <Menu />
              </IconButton>
            )}
          <LogoContainer>
            <a href='/'>
              <img src={logo} alt='logo' />
            </a>
          </LogoContainer>
          {showContent
            && (
              <>
                <SearchForm />
                <DesktopIcons />
                <MobileIcons />
              </>
            )}
        </Toolbar>
      </AppBar>
    </AppBarContainer>
  )
}

export default NavBar
