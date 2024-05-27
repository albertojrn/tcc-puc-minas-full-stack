import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function DialogYesNo({
  children,
  noLabel = 'Não',
  onYes = () => {},
  setDialogParams,
  text = '',
  title = '',
  yesLabel = 'Sim'
}) {
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children
          ?? (
            <DialogContentText>
              {text}
            </DialogContentText>
          )}
      </DialogContent>
      <DialogActions>
        <Button color='standard' onClick={() => setDialogParams({ openDialog: false })}>{noLabel}</Button>
        <Button color='standard' onClick={onYes}>{yesLabel}</Button>
      </DialogActions>
    </>
  )
}

export default DialogYesNo
