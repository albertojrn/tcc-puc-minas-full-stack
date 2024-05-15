import React from 'react'
import { Modal } from '@mui/material'
import { CenterModalContainer } from '../../../../styles'
import { useDashboardContext } from '../../../../contexts/DashboardContext'
import ProductRegistry from './components/ProductRegistry'
import TopToolbar from './components/TopToolbar'

function DashModal() {
  const { modalPage, openModal, setDashboardData } = useDashboardContext()

  return (
    <Modal
      open={openModal}
      onClose={() => setDashboardData({ openModal: false })}
    >
      <CenterModalContainer width='70%' height='80%'>
        <TopToolbar />
        {modalPage === 'product'
          && <ProductRegistry />}
      </CenterModalContainer>
    </Modal>
  )
}

export default DashModal
