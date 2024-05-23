import React from 'react'
import { Typography } from '@mui/material'
import { GridItem } from '../../../../../../styles'

function GridListHeader({ columns }) {
  return (
    <>
      {columns.map(column => (
        <GridItem item key={column.id} align={column.align} hideInMobile={column.hideInMobile} {...column.sizes}>
          <Typography
            fontWeight='bold'
            variant='body1'
          >
            {column.header}
          </Typography>
        </GridItem>
      ))}
    </>
  )
}

export default GridListHeader
