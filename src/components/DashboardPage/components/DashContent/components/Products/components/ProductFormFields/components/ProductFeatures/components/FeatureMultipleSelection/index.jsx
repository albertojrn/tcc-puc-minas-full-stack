import React from 'react'
import { Checkbox, FormControl, FormControlLabel, FormLabel } from '@mui/material'
import { CheckboxesContainer } from './styles'
import { useDashboardDataContext } from '../../../../../../../../../../../../contexts/DashboardDataContext'

function FeatureMultipleSelection({ feature, groupedFeatures, setSelectedFeatures }) {
  const { featureValues } = useDashboardDataContext()
  const options = featureValues[feature.id]
  const valuesSelected = groupedFeatures.find(item => item.featureId === feature.id)?.featureValuesIds ?? []

  function handleChange(e, featureValueId) {
    const checked = e.target.checked
    setSelectedFeatures(prev => {
      const newSelectedFeatures = structuredClone(prev)
      if (!checked) {
        const lastValue = newSelectedFeatures.find(item => item === featureValueId)
        if (lastValue) {
          newSelectedFeatures.splice(newSelectedFeatures.indexOf(lastValue), 1)
        }
      }
      else if (checked) newSelectedFeatures.push(featureValueId)
      return newSelectedFeatures
    })
  }

  return (
    <FormControl fullWidth>
      <FormLabel component='legend'>{feature.name}</FormLabel>
      <CheckboxesContainer>
        {options?.map(option => (
          <FormControlLabel
            key={option.id}
            control={(
              <Checkbox
                checked={valuesSelected.includes(option.id)}
                onChange={(e) => handleChange(e, option.id)}
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
