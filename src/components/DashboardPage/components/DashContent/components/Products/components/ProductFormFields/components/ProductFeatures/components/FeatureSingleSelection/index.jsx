import React from 'react'
import { FormControl, FormLabel, NativeSelect } from '@mui/material'
import { useDashboardDataContext } from '../../../../../../../../../../../../contexts/DashboardDataContext'

function FeatureSingleSelection({ feature, selectedFeatures, setSelectedFeatures }) {
  const { featureValues } = useDashboardDataContext()
  const options = featureValues[feature.id]

  return (
    <FormControl fullWidth>
      <FormLabel component='legend'>{feature.name}</FormLabel>
      <NativeSelect
        defaultValue=''
        size='small'
      >
        <option value=''>Selcione...</option>
        {options?.map(item => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </NativeSelect>
    </FormControl>
  )
}

export default FeatureSingleSelection
