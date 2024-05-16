import React, { useEffect } from 'react'
import { useDashboardContext } from '../../../../contexts/DashboardContext'
import { DialogContainer } from './styles'

function DashDialog() {
  const { dialogChild, openDialog, setDashboardParams } = useDashboardContext()

  useEffect(() => {
    if (!openDialog && dialogChild) setDashboardParams({ dialogChild: null })
  }, [openDialog])

  return (
    <DialogContainer
      open={openDialog}
      onClose={() => setDashboardParams({ openDialog: false })}
      PaperProps={{
        component: 'form',
      }}
    >
      {dialogChild}
    </DialogContainer>
  )
}

export default DashDialog
