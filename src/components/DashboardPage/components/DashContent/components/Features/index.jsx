import React, { useEffect, useState } from 'react'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import FeatureCard from './components/FeatureCard'
import { useLoadingContext } from '../../../../../../contexts/LoadingContext'
import { useDashboardDataContext } from '../../../../../../contexts/DashboardDataContext'
import PleaseTryAgain from '../../../../../PleaseTryAgain'
import { loadFeatures } from '../../../../../../utils/features'
import { loadFeatureValues } from '../../../../../../utils/featureValues'
import ContentHeader from '../ContentHeader'

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
            <ContentHeader page='features' title='Características' />
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
