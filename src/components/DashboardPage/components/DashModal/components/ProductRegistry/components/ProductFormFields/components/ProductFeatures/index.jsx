import React from 'react'
import { Divider, Typography } from '@mui/material'
import features from '../../../../../../../../../../mock/features.json'
import { FormContainer } from '../../../../../../../../../../styles'
import FeatureMultipleSelection from './components/FeatureMultipleSelection'
import FeatureSingleSelection from './components/FeatureSingleSelection'
import { SPECIAL_FEATURES } from '../../../../../../../../constants/params'

function ProductFeatures({ selectedFeatures, setSelectedFeatures }) {
  const featuresToShow = features.filter(feature => !SPECIAL_FEATURES.includes(feature.name))
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
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
              />
            )
            : (
              <FeatureSingleSelection
                feature={feature}
                selectedFeatures={selectedFeatures}
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
