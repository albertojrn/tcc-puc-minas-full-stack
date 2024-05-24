import React from 'react'
import { GridItem } from '../../styles'
import { Title } from './styles'

function GridTitle({ title }) {
  return (
    <GridItem item xs={12}>
      <Title>
        {title}
      </Title>
    </GridItem>
  )
}

export default GridTitle
