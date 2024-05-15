import React from 'react'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useDashboardContext } from '../../../../../../contexts/DashboardContext'
import { ToolboxContainer } from './styles'

function TopToolbar() {
  const { setDashboardData } = useDashboardContext()

  return (
    <ToolboxContainer direction='row' justifyContent='end'>
      <IconButton size='small' onClick={() => setDashboardData({ openModal: false })}>
        <Close />
      </IconButton>
    </ToolboxContainer>
  )

}

export default TopToolbar
