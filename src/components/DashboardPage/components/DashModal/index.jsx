import React, { useEffect } from 'react'
import { Modal } from '@mui/material'
import { CenterModalContainer } from '../../../../styles'
import { useDashboardContext } from '../../../../contexts/DashboardContext'
import TopToolbar from './components/TopToolbar'

function DashModal() {
  const { modalChild, openModal, setDashboardParams } = useDashboardContext()

  useEffect(() => {
    if (!openModal && modalChild) setDashboardParams({ modalChild: null })
  }, [openModal])

  return (
    <Modal
      open={openModal}
      onClose={() => setDashboardParams({ openModal: false })}
    >
      <CenterModalContainer width='70%' height='80%'>
        <TopToolbar />
        {modalChild}
      </CenterModalContainer>
    </Modal>
  )
}

export default DashModal
