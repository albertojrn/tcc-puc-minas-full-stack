import React from 'react'
import { DrawerContainer } from './styles'
import MobileDrawer from './components/MobileDrawer'
import DesktopDrawer from './components/DesktopDrawer'

function DashDrawer({ open, handleDrawerClose, handleDrawerTransitionEnd, setContentId }) {
  return (
    <DrawerContainer component='nav'>
      <MobileDrawer
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        open={open}
        setContentId={setContentId}
      />
      <DesktopDrawer setContentId={setContentId} />
    </DrawerContainer>
  )
}

export default DashDrawer
