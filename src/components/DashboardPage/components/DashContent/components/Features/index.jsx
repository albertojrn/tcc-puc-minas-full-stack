import React, { useEffect } from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import FeatureCard from './components/FeatureCard'
import AddButton from '../AddButton'
import { getFeatures } from '../../../../../../services/api/features'
import { useLoadingContext } from '../../../../../../contexts/LoadingContext'
import { useDashboardDataContext } from '../../../../../../contexts/DashboardDataContext'

function Features() {
  const { setLoading } = useLoadingContext()
  const { features, setDashboardData } = useDashboardDataContext()

  async function loadFeatures() {
    if (!features.length) {
      setLoading({ show: true })
      const res = await getFeatures()
      console.log({res})
      setLoading({ show: false })
    }
  }

  useEffect(() => {
    loadFeatures()
  }, [])

  return (
    <MainGridContainer container drawBorder spacing={2}>
      <GridItem item xs={12}>
        <Stack direction='row' spacing={1}>
          <Typography component='div' variant='h5'>
            Características
            &nbsp;
          </Typography>
          <AddButton page='features' />
        </Stack>
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
