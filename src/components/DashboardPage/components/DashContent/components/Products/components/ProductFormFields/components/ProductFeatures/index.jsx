import React from 'react'
import { Divider, Typography } from '@mui/material'
import { FormContainer } from '../../../../../../../../../../styles'
import FeatureMultipleSelection from './components/FeatureMultipleSelection'
import FeatureSingleSelection from './components/FeatureSingleSelection'
import { SPECIAL_FEATURES } from '../../../../../../../../constants/params'
import { useDashboardDataContext } from '../../../../../../../../../../contexts/DashboardDataContext'
import groupFeatures from './utils/groupFeatures'

function ProductFeatures({ selectedFeatures, setSelectedFeatures }) {
  const { features, featureValues } = useDashboardDataContext()
  const featuresToShow = features.filter(feature => !SPECIAL_FEATURES.includes(feature.name))
  const groupedFeatures = groupFeatures(featureValues, selectedFeatures)

  return (
    <FormContainer maxHeight='350px'>
      <Typography
        component='div'
        variant='h6'
      >
        Características
      </Typography>
      {featuresToShow.map(feature => (
        <React.Fragment key={feature.id}>
          {feature.is_multiple
            ? (
              <FeatureMultipleSelection
                feature={feature}
                groupedFeatures={groupedFeatures}
                setSelectedFeatures={setSelectedFeatures}
              />
            )
            : (
              <FeatureSingleSelection
                feature={feature}
                groupedFeatures={groupedFeatures}
                setSelectedFeatures={setSelectedFeatures}
              />
            )}
          <Divider />
        </React.Fragment>
      ))}
    </FormContainer>
  )
}

export default ProductFeatures
