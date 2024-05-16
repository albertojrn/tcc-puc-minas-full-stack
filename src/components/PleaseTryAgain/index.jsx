import React from 'react'
import { Button, Stack, Typography } from '@mui/material'

function PleaseTryAgain({ text, onTryAgain }) {
  return (
    <Stack
      alignItems='center'
      direction='column'
      justifyContent='center'
      spacing={1}
    >
      <Typography align='center' variant='body1'>
        Ops.
        {` ${text}`}
        <br />
        Por favor tente novamente:
      </Typography>
      <Button variant='contained' onClick={onTryAgain}>Clique aqui</Button>
    </Stack>
  )
}

export default PleaseTryAgain
