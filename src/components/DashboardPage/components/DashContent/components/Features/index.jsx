import React from 'react'
import { Divider, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import features from '../../../../../../mock/features.json'
import FeatureCard from './components/FeatureCard'
import AddButton from '../AddButton'

function Features() {
  return (
    <MainGridContainer container drawBorder spacing={2}>
      <GridItem item xs={12}>
        <Typography component='div' variant='h5'>
          Características
          &nbsp;
          <AddButton page='features' />
        </Typography>
      </GridItem>
      <GridItem item xs={12}>
        <Divider />
      </GridItem>
      {features.map(feature => (
        <GridItem item xs={12} md={4} key={feature.id}>
          <FeatureCard feature={feature.name} featureId={feature.id} />
        </GridItem>
      ))}
    </MainGridContainer>
  )
}

export default Features
