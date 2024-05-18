import React from 'react'
import { FormControl, FormLabel, NativeSelect } from '@mui/material'
import { useDashboardDataContext } from '../../../../../../../../../../../../contexts/DashboardDataContext'

function FeatureSingleSelection({ feature, groupedFeatures, setSelectedFeatures }) {
  const { featureValues } = useDashboardDataContext()
  const options = featureValues[feature.id]
  const value = groupedFeatures.find(item => item.featureId === feature.id)?.featureValuesIds?.[0]

  function handleOnChange(e) {
    let val = e.target.value
    if (val) val = Number(val)
    setSelectedFeatures(prev => {
      const newSelectedFeatures = structuredClone(prev)
      const lastValue = newSelectedFeatures.find(item => item === value)
      if (lastValue) {
        newSelectedFeatures.splice(newSelectedFeatures.indexOf(lastValue), 1)
      }
      newSelectedFeatures.push(val)
      return newSelectedFeatures
    })
  }

  return (
    <FormControl fullWidth>
      <FormLabel component='legend'>{feature.name}</FormLabel>
      <NativeSelect
        size='small'
        onChange={handleOnChange}
        value={value ?? ''}
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
