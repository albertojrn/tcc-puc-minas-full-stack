import React from 'react'
import { Button } from '@mui/material'
import { useDashboardContext } from '../../../../../../contexts/DashboardContext'

function AddButton({ page }) {
  const { setDashboardData } = useDashboardContext
  function handleOnAddClick() {
    setDashboardData({ openModal: true, modalPage: page })
  }

  return <Button variant='contained' onClick={handleOnAddClick}>Novo</Button>
}

export default AddButton
