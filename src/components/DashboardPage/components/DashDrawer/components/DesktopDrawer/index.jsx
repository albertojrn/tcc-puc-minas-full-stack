import React from 'react'
import { DesktopDrawerContainer } from './styles'
import DrawerItems from '../DrawerItems'

function DesktopDrawer() {
  return (
    <DesktopDrawerContainer
      variant='permanent'
      open
    >
      <DrawerItems />
    </DesktopDrawerContainer>
  )
}

export default DesktopDrawer
