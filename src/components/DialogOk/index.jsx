import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function DialogOk({ text, title, setDialogParams, onOk }) {
  function handleOkClick() {
    if (typeof onOk === 'function') onOk()
    setDialogParams({ openDialog: false })
  }

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='standard' onClick={handleOkClick}>Ok</Button>
      </DialogActions>
    </>
  )
}

export default DialogOk
