import React, { useEffect, useState } from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import FeatureCard from './components/FeatureCard'
import AddButton from '../AddButton'
import { readFeatures } from '../../../../../../services/api/features'
import { useLoadingContext } from '../../../../../../contexts/LoadingContext'
import { useDashboardDataContext } from '../../../../../../contexts/DashboardDataContext'
import PleaseTryAgain from '../../../../../PleaseTryAgain'

function Features() {
  const [errorLoadingFeatures, setErrorLoadingFeatures] = useState('')
  const { setLoading } = useLoadingContext()
  const { features, setDashboardData } = useDashboardDataContext()

  async function loadFeatures() {
    if (!features.length) {
      setLoading({ show: true })
      const res = await readFeatures()
      if (res.status === 200 && res.data.length) {
        setDashboardData({ features: res.data })
        if (errorLoadingFeatures) setErrorLoadingFeatures('')
      }
      else if (!errorLoadingFeatures) setErrorLoadingFeatures('Tivemos um problema.')
      setLoading({ show: false })
    }
  }

  useEffect(() => {
    loadFeatures()
  }, [])

  return (
    <MainGridContainer container spacing={2}>
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
      {errorLoadingFeatures
        ? (
          <GridItem item xs={12}>
            <PleaseTryAgain text={errorLoadingFeatures} onTryAgain={loadFeatures} />
          </GridItem>
        )
        : (
          features.map(feature => (
            <GridItem item xs={12} md={4} key={feature.id}>
              <FeatureCard feature={feature} />
            </GridItem>
          ))
        )}
    </MainGridContainer>
  )
}

export default Features
