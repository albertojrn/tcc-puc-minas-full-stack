import React from 'react'
import { Button } from '@mui/material'
import { useDashboardContext } from '../../../../../../contexts/DashboardContext'
import ProductRegistry from '../Products/components/ProductRegistry'
import { AddButtonContainer } from './styles'
import AddFeature from '../Features/components/AddFeature'
import AddUser from '../Users/components/AddUser'

function AddButton({ page, attr = {} }) {
  const { setDashboardParams } = useDashboardContext()

  function handleOnAddClick() {
    const data = {}
    if (page === 'product') {
      data.modalChild = <ProductRegistry {...attr} />
      data.openModal = true
      data.blockModal = true
    }
    else if (page === 'features') {
      data.dialogChild = <AddFeature {...attr} />
      data.openDialog = true
    }
    else if (page === 'users') {
      data.modalChild = <AddUser {...attr} />
      data.openModal = true
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
