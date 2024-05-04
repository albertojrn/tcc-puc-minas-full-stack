import React from 'react'
import { MobileDrawerContainer } from './styles'
import DrawerItems from '../DrawerItems'

function MobileDrawer({ open, handleDrawerClose, handleDrawerTransitionEnd }) {
  return (
    <MobileDrawerContainer
      variant='temporary'
      open={open}
      onTransitionEnd={handleDrawerTransitionEnd}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <DrawerItems />
    </MobileDrawerContainer>
  )
}

export default MobileDrawer
