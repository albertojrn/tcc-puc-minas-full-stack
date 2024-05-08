import React from 'react'
import { MobileDrawerContainer } from './styles'
import DrawerItems from '../DrawerItems'

function MobileDrawer({ open, handleDrawerClose, handleDrawerTransitionEnd, setContentId }) {
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
      <DrawerItems setContentId={setContentId} />
    </MobileDrawerContainer>
  )
}

export default MobileDrawer
