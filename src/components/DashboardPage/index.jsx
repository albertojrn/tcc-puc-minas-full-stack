import React, { useState } from 'react'
import DashNavBar from './components/DashNavBar'
import { DashboardContainer } from './styles'
import DashDrawer from './components/DashDrawer'
import DashContent from './components/DashContent'

function DashboardPage() {
  const [open, setOpen] = useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

  function handleDrawerClose() {
    setIsClosing(true)
    setOpen(false)
  }

  function handleDrawerTransitionEnd() {
    setIsClosing(false)
  }

  function handleDrawerToggle() {
    if (!isClosing) {
      setOpen(prev => !prev)
    }
  }

  return (
    <DashboardContainer>
      <DashNavBar handleDrawerToggle={handleDrawerToggle} />
      <DashDrawer
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        open={open}
      />
      <DashContent />
    </DashboardContainer>
  )
}

export default DashboardPage