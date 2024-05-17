import React, { useEffect } from 'react'
import { Modal } from '@mui/material'
import { CenterModalContainer } from '../../../../styles'
import { useDashboardContext } from '../../../../contexts/DashboardContext'
import TopToolbar from './components/TopToolbar'

function DashModal() {
  const { blockModal, modalChild, openModal, setDashboardParams } = useDashboardContext()

  useEffect(() => {
    if (!openModal) {
      const newParams = {}
      if (blockModal) newParams.blockModal = false
      if (modalChild) newParams.modalChild = null
      if (Object.keys(newParams).length) setDashboardParams(newParams)
    }
  }, [openModal])

  return (
    <Modal
      open={openModal}
      onClose={() => !blockModal && setDashboardParams({ openModal: false })}
    >
      <CenterModalContainer width='70%' height='80%'>
        <TopToolbar />
        {modalChild}
      </CenterModalContainer>
    </Modal>
  )
}

export default DashModal
