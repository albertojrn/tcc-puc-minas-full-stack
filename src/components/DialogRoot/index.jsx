import React, { useEffect } from 'react'
import { DialogContainer } from './styles'
import { useStoreContext } from '../../contexts/StoreContext'

function DialogRoot() {
  const { dialogChild, openDialog, setStorePersistent } = useStoreContext()

  useEffect(() => {
    if (!openDialog && dialogChild) setStorePersistent({ dialogChild: null })
  }, [openDialog])

  return (
    <DialogContainer
      disableRestoreFocus
      open={openDialog}
      onClose={() => setStorePersistent({ openDialog: false })}
      PaperProps={{
        component: 'form',
      }}
    >
      {dialogChild}
    </DialogContainer>
  )
}

export default DialogRoot
