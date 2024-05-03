import React from 'react'
import { useLocation } from 'react-router-dom'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { BarContainer, LogoContainer } from './styles'
import SearchForm from './components/SearchForm'
import DesktopIcons from './components/DesktopIcons'
import MobileIcons from './components/MobileIcons'
import logo from '../../assets/images/logo_letters.png'

function NavBar() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <BarContainer>
      <AppBar position='static'>
        <Toolbar>
          {!isLoginPage
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
          {!isLoginPage
            && (
              <>
                <SearchForm />
                <DesktopIcons />
                <MobileIcons />
              </>
            )}
        </Toolbar>
      </AppBar>
    </BarContainer>
  )
}

export default NavBar
