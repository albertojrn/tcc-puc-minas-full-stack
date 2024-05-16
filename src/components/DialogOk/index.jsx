import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { useDashboardContext } from '../../contexts/DashboardContext'

function DialogOk({ text, title }) {
  const { setDashboardParams } = useDashboardContext()
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='standard' onClick={() => setDashboardParams({ openDialog: false })}>Ok</Button>
      </DialogActions>
    </>
  )
}

export default DialogOk
