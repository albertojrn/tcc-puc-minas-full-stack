import React from 'react'
import { IconButton, Stack } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'

function FeatureCardToolbox({ featureValueId, name }) {
  return (
    <Stack direction='row' edge='end' spacing={0}>
      <IconButton size='small'>
        <Edit />
      </IconButton>
      <IconButton size='small'>
        <Delete />
      </IconButton>
    </Stack>
  )
}

export default FeatureCardToolbox
