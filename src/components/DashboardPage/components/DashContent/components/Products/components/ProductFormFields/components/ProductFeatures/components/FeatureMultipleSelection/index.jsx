import React from 'react'
import { Checkbox, FormControl, FormControlLabel, FormLabel } from '@mui/material'
import featureValues from '../../../../../../../../../../../../mock/features_values.json'
import { CheckboxesContainer } from './styles'

function FeatureMultipleSelection({ feature, selectedFeatures, setSelectedFeatures }) {
  const options = featureValues.filter(val => val.feature_id === feature.id)
  const valuesSelected = selectedFeatures.find(f => f.name === feature.name)?.values ?? []

  function handleChange(e) {

  }

  return (
    <FormControl fullWidth>
      <FormLabel component='legend'>{feature.name}</FormLabel>
      <CheckboxesContainer>
        {options.map(option => (
          <FormControlLabel
            key={option.id}
            control={(
              <Checkbox
                checked={valuesSelected.includes(option.id)}
                onChange={handleChange}
                size='small'
              />
            )}
            label={option.name}
          />
        ))}
      </CheckboxesContainer>
    </FormControl>
  )
}

export default FeatureMultipleSelection
