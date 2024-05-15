import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@mui/material'
import React from 'react'
import { Color } from '../../styles'

function SelectFeatureField({ disableOptionsIds = [], error, features, label, onChange, required, value }) {
  return (
    <FormControl fullWidth>
      <InputLabel>
        {`${label}${required ? '*' : ''}`}
      </InputLabel>
      <NativeSelect
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : e.target.value)}
        value={value}
      >
        <option value=''>{}</option>
        {features.map(item => (
          <option key={item.id} value={item.id} disabled={disableOptionsIds.includes(item.id)}>{item.name}</option>
        ))}
      </NativeSelect>
      {error && <FormHelperText><Color color='red'>{error}</Color></FormHelperText>}
    </FormControl>
  )
}

export default SelectFeatureField
