import React, { useEffect, useState } from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import FeatureCard from './components/FeatureCard'
import AddButton from '../AddButton'
import { useLoadingContext } from '../../../../../../contexts/LoadingContext'
import { useDashboardDataContext } from '../../../../../../contexts/DashboardDataContext'
import PleaseTryAgain from '../../../../../PleaseTryAgain'
import { loadFeatures } from '../../../../../../utils/features'
import { loadFeatureValues } from '../../../../../../utils/featureValues'

function Features() {
  const [errorLoadingFeatures, setErrorLoadingFeatures] = useState('')
  const [errorLoadingFeatureVals, setErrorLoadingFeatureVals] = useState('')
  const { setLoading } = useLoadingContext()
  const { features, featureValues, setDashboardData } = useDashboardDataContext()

  async function fetchParams() {
    setLoading({ show: true })
    await Promise.allSettled([
      loadFeatures(features, setDashboardData, setErrorLoadingFeatures),
      loadFeatureValues(featureValues, setDashboardData, setErrorLoadingFeatureVals),
    ])
    setLoading({ show: false })
  }

  useEffect(() => {
    fetchParams()
  }, [])

  return (
    <MainGridContainer container spacing={2}>
      {(errorLoadingFeatures || errorLoadingFeatureVals)
        ? (
          <GridItem item xs={12}>
            <PleaseTryAgain text={errorLoadingFeatures || errorLoadingFeatureVals} onTryAgain={loadFeatures} />
          </GridItem>
        )
        : (
          <>
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
              <GridItem item xs={12} sm={4} md={3} key={feature.id}>
                <FeatureCard feature={feature} />
              </GridItem>
            ))}
          </>
        )}
    </MainGridContainer>
  )
}

export default Features
