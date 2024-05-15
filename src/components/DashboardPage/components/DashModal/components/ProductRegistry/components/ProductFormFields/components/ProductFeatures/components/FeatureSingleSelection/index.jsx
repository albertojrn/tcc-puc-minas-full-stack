import React from 'react'
import { FormControl, FormLabel, NativeSelect } from '@mui/material'
import featureValues from '../../../../../../../../../../../../mock/features_values.json'

function FeatureSingleSelection({ feature, selectedFeatures, setSelectedFeatures }) {
  const options = featureValues.filter(val => val.feature_id === feature.id)

  return (
    <FormControl fullWidth>
      <FormLabel component='legend'>{feature.name}</FormLabel>
      <NativeSelect
        defaultValue=''
        size='small'
      >
        <option value=''>Selcione...</option>
        {options.map(item => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </NativeSelect>
    </FormControl>
  )
}

export default FeatureSingleSelection
