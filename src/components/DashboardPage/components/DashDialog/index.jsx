import React from 'react'
import { useDashboardContext } from '../../../../contexts/DashboardContext'
import NewProductVariation from './components/NewProductVariation'
import { DialogContainer } from './styles'

function DashDialog() {
  const { openDialog, dialogPage, setDashboardData } = useDashboardContext()

  return (
    <DialogContainer
      open={openDialog}
      onClose={() => setDashboardData({ openDialog: false })}
      PaperProps={{
        component: 'form',
      }}
    >
      {dialogPage === 0 && <NewProductVariation />}
    </DialogContainer>
  )
}

export default DashDialog
