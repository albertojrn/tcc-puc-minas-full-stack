import React, { useEffect, useState } from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../../../styles'
import AddButton from '../AddButton'
import { useLoadingContext } from '../../../../../../contexts/LoadingContext'
import { useDashboardDataContext } from '../../../../../../contexts/DashboardDataContext'
import { loadFeatures } from '../../../../../../utils/features'
import { loadFeatureValues } from '../../../../../../utils/featureValues'
import PleaseTryAgain from '../../../../../PleaseTryAgain'
import ProductsList from './components/ProductsList'

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
            <GridItem item xs={12}>
              <Stack direction='row' spacing={1}>
                <Typography component='' variant='h5'>
                  Produtos
                  &nbsp;
                </Typography>
                <AddButton page='product' />
              </Stack>
            </GridItem>
            <GridItem item xs={12}>
              <Divider />
            </GridItem>
            <GridItem item xs={12}>
              <ProductsList />
            </GridItem>
          </>
        )}
    </MainGridContainer>
  )
}

export default Products
