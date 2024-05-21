import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { useDashboardContext } from '../../contexts/DashboardContext'

function DialogRetry({ text, title, onRetry }) {
  const { setDashboardParams } = useDashboardContext()

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='standard' onClick={() => setDashboardParams({ openDialog: false })}>Cancelar</Button>
        <Button color='standard' onClick={onRetry}>Tentar Novamente</Button>
      </DialogActions>
    </>
  )
}

export default DialogRetry
