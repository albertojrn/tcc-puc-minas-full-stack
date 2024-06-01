import React, { useEffect, useState } from 'react'
import DashNavBar from './components/DashNavBar'
import { DashboardContainer } from './styles'
import DashDrawer from './components/DashDrawer'
import DashContent from './components/DashContent'
import DashModal from './components/DashModal'
import { DashboardContextProvider } from '../../contexts/DashboardContext'
import { DashboardDataContextProvider } from '../../contexts/DashboardDataContext'
import DashDialog from './components/DashDialog'

function DashboardPage() {
  const [contentId, setContentId] = useState(0)
  const [open, setOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

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

  useEffect(() => {
    if (open) setOpen(false)
  }, [contentId])

  return (
    <DashboardContextProvider>
      <DashboardDataContextProvider>
        <DashboardContainer>
          <DashNavBar handleDrawerToggle={handleDrawerToggle} />
          <DashDrawer
            handleDrawerClose={handleDrawerClose}
            handleDrawerTransitionEnd={handleDrawerTransitionEnd}
            open={open}
            setContentId={setContentId}
          />
          <DashContent contentId={contentId} />
          <DashModal />
          <DashDialog />
        </DashboardContainer>
      </DashboardDataContextProvider>
    </DashboardContextProvider>
  )
}

export default DashboardPage
