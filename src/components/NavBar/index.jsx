import React from 'react'
import { useLocation } from 'react-router-dom'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { ContentContainer, LogoContainer, MiddleContentContainer, MobileSearchFormContainer } from './styles'
import SearchForm from './components/SearchForm'
import DesktopIcons from './components/DesktopIcons'
import MobileIcons from './components/MobileIcons'
import logo from '../../assets/images/logo_urban_350x200.jpg'
import { NAVBAR_HIDE_PART_ON_ROUTES, NAVBAR_HIDE_ON_ROUTES } from '../../constants/routesNotAllowed'
import { AppBarContainer } from '../../styles'
import { useStoreContext } from '../../contexts/StoreContext'
import AppBarMenu from './components/AppBarMenu'

function NavBar() {
  const { openMobileSearchField, setStorePersistent } = useStoreContext()
  const location = useLocation()
  if (NAVBAR_HIDE_ON_ROUTES.includes(location.pathname)) return null
  const showContent = !NAVBAR_HIDE_PART_ON_ROUTES.includes(location.pathname)

  return (
    <AppBarContainer color='primary'>
      <AppBar position='static'>
        <Toolbar>
          {showContent
            && (
              <IconButton
                color='inherit'
                edge='start'
                size='large'
                onClick={() => setStorePersistent({ openMenu: true })}
              >
                <Menu />
              </IconButton>
            )}
          <ContentContainer
            alignItems='center'
            direction='row'
            justifyContent='space-evenly'
            spacing={3}
          >
            <LogoContainer>
              <a href='/'>
                <img src={logo} alt='logo' />
              </a>
            </LogoContainer>
            {showContent
              && (
                <>
                  <MiddleContentContainer direction='column' spacing={1}>
                    <SearchForm />
                    <AppBarMenu />
                  </MiddleContentContainer>
                  <DesktopIcons />
                  <MobileIcons />
                </>
              )}
          </ContentContainer>
        </Toolbar>
        <MobileSearchFormContainer open={openMobileSearchField}>
          <SearchForm />
        </MobileSearchFormContainer>
      </AppBar>
    </AppBarContainer>
  )
}

export default NavBar
