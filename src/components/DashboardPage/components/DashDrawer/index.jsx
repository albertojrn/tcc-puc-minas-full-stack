import React from 'react'
import { DrawerContainer } from './styles'
import MobileDrawer from './components/MobileDrawer'
import DesktopDrawer from './components/DesktopDrawer'

function DashDrawer({ open, handleDrawerClose, handleDrawerTransitionEnd }) {
  return (
    <DrawerContainer component='nav'>
      <MobileDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
      />
      <DesktopDrawer />
    </DrawerContainer>
  )
}

export default DashDrawer
