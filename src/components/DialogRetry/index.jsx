import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function DialogRetry({ text, title, onRetry, setDialogParams }) {

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='standard' onClick={() => setDialogParams({ openDialog: false })}>Cancelar</Button>
        <Button color='standard' onClick={onRetry}>Tentar Novamente</Button>
      </DialogActions>
    </>
  )
}

export default DialogRetry
