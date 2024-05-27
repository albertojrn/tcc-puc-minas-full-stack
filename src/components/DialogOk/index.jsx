import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function DialogOk({ text, title, setDialogParams }) {
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='standard' onClick={() => setDialogParams({ openDialog: false })}>Ok</Button>
      </DialogActions>
    </>
  )
}

export default DialogOk
