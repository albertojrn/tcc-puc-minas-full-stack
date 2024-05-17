import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { useDashboardContext } from '../../contexts/DashboardContext'

function DialogYesNo({ text, title, onYes }) {
  const { setDashboardParams } = useDashboardContext()
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='standard' onClick={() => setDashboardParams({ openDialog: false })}>Não</Button>
        <Button color='standard' onClick={onYes}>Sim</Button>
      </DialogActions>
    </>
  )
}

export default DialogYesNo
