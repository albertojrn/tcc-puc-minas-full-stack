import React from 'react'
import { DesktopDrawerContainer } from './styles'
import DrawerItems from '../DrawerItems'

function DesktopDrawer({ setContentId }) {
  return (
    <DesktopDrawerContainer
      variant='permanent'
      open
    >
      <DrawerItems setContentId={setContentId} />
    </DesktopDrawerContainer>
  )
}

export default DesktopDrawer
