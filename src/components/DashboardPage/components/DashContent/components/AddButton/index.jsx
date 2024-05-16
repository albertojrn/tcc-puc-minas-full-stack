import React from 'react'
import { Button } from '@mui/material'
import { useDashboardContext } from '../../../../../../contexts/DashboardContext'
import ProductRegistry from '../Products/components/ProductRegistry'
import { AddButtonContainer } from './styles'
import AddFeature from '../Features/components/AddFeature'

function AddButton({ page, attr = {} }) {
  const { setDashboardParams } = useDashboardContext()

  function handleOnAddClick() {
    const data = {}
    if (page === 'product') {
      data.modalChild = <ProductRegistry {...attr} />
      data.openModal = true
    }
    if (page === 'features') {
      data.dialogChild = <AddFeature {...attr} />
      data.openDialog = true
    }
    setDashboardParams(data)
  }

  return (
    <AddButtonContainer>
      <Button variant='contained' onClick={handleOnAddClick}>Novo</Button>
    </AddButtonContainer>
  )
}

export default AddButton
