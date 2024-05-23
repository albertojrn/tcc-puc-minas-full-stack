import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import AddButton from '../AddButton'
import { GridItem } from '../../../../../../styles'

function ContentHeader({ page, title }) {
  return (
    <>
      <GridItem item xs={12}>
        <Stack direction='row' spacing={1}>
          <Typography component='' variant='h5'>
            {title}
          &nbsp;
          </Typography>
          <AddButton page={page} />
        </Stack>
      </GridItem>
      <GridItem item xs={12}>
        <Divider />
      </GridItem>
    </>
  )
}

export default ContentHeader
