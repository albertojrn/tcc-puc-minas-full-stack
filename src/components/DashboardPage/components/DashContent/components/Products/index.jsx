import React, { useEffect, useState } from 'react'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import { useLoadingContext } from '../../../../../../contexts/LoadingContext'
import { useDashboardDataContext } from '../../../../../../contexts/DashboardDataContext'
import { loadFeatures } from '../../../../../../utils/features'
import { loadFeatureValues } from '../../../../../../utils/featureValues'
import PleaseTryAgain from '../../../../../PleaseTryAgain'
import ProductsList from './components/ProductsList'
import ContentHeader from '../ContentHeader'

function Products() {
  const [errFetchFeatures, setErrFetchFeatures] = useState('')
  const [errFetchFeatureVals, setErrFetchFeatureVals] = useState('')
  const { setLoading } = useLoadingContext()
  const { features, featureValues, setDashboardData } = useDashboardDataContext()

  async function fetchParams() {
    setLoading({ show: true })
    await Promise.allSettled([
      loadFeatures(features, setDashboardData, setErrFetchFeatures),
      loadFeatureValues(featureValues, setDashboardData, setErrFetchFeatureVals),
    ])
    setLoading({ show: false })
  }

  useEffect(() => {
    fetchParams()
  }, [])
  return (
    <MainGridContainer container spacing={2}>
      {(errFetchFeatures || errFetchFeatureVals)
        ? (
          <GridItem item xs={12}>
            <PleaseTryAgain
              onTryAgain={fetchParams}
              text={errFetchFeatures || errFetchFeatureVals}
            />
          </GridItem>
        )
        : (
          <>
            <ContentHeader page='product' title='Produtos' />
            <GridItem item xs={12}>
              <ProductsList />
            </GridItem>
          </>
        )}
    </MainGridContainer>
  )
}

export default Products
