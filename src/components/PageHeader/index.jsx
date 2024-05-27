import React from 'react'
import { Stack, Typography } from '@mui/material'

function PageHeader({ title }) {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Typography variant='h4'>
        {title}
      </Typography>
    </Stack>
  )
}

export default PageHeader
