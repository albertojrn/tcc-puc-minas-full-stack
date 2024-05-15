import React from 'react'
import { Button } from '@mui/material'
import { useDashboardContext } from '../../../../../../contexts/DashboardContext'
import { AddButtonContainer } from './styles'

function AddButton({ page }) {
  const { setDashboardData } = useDashboardContext()
  function handleOnAddClick() {
    setDashboardData({ openModal: true, modalPage: page })
  }

  return (
    <AddButtonContainer>
      <Button variant='contained' onClick={handleOnAddClick}>Novo</Button>
    </AddButtonContainer>
  )
}

export default AddButton
