import React, { useState } from 'react'
import { Button, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import featuresValues from '../../../../../../../../mock/features_values.json'
import features from '../../../../../../../../mock/features.json'
import SelectFeatureField from '../../../../../../../SelectFeatureField'
import SizesSelection from './components/SizesSelection'
import { SIZE_INIT } from './constants/params'
import { validateFields } from '../../../../../../../../utils/formMethods'
import { CONSTRAINTS } from './constants/validationParams'

function AddProductVariation({ setVariations, variations }) {
  const [error, setError] = useState({})
  const [primaryColor, setPrimaryColor] = useState('')
  const [secondaryColor, setSecondaryColor] = useState('')
  const [sizes, setSizes] = useState([{ ...SIZE_INIT, id: 0 }])
  const { setDashboardParams } = useDashboardContext()
  const colorId = features.find(feature => feature.name === 'cor')?.id
  const sizeId = features.find(feature => feature.name === 'tamanho')?.id
  const colorOptions = featuresValues.filter(val => val.feature_id === colorId)
  const sizeOptions = featuresValues.filter(val => val.feature_id === sizeId)

  function handleAddVariation() {
    const validation = validateFields({ primaryColor, sizes }, CONSTRAINTS)
    const validationError = { ...validation.error }
    for (const size of sizes) {
      if (!size.size || !size.price || !size.quantity || size.quantity < 0) {
        const i = sizes.indexOf(size)
        validationError[`size${i}`] = 'Revise os valores fornecidos.'
      }
    }
    setError(validationError)
    if (!Object.keys(validationError).length) {
      const newVariation = { primaryColor, secondaryColor, sizes }
      const variationExists = variations.filter(variation => variation.primaryColor === primaryColor && variation.secondaryColor === secondaryColor).length
      if (!variationExists) setVariations(prev => [...prev, newVariation])
      setDashboardParams({ openDialog: false })
    }
  }

  return (
    <>
      <DialogTitle>Nova Variação</DialogTitle>
      <DialogContent>
        <Stack spacing={1.5} direction='column'>
          <Typography variant='h6'>
            Cores
          </Typography>
          <SelectFeatureField
            error={error.primaryColor}
            features={colorOptions}
            label='Cor Primária'
            onChange={(val) => setPrimaryColor(val)}
            required
            value={primaryColor}
          />
          <SelectFeatureField
            features={colorOptions}
            label='Cor Secundária'
            onChange={(val) => setSecondaryColor(val)}
            value={secondaryColor}
          />
          <Typography variant='h6'>
            Tamanhos
          </Typography>
          <SizesSelection
            error={error}
            setError={setError}
            setSizes={setSizes}
            sizeOptions={sizeOptions}
            sizes={sizes}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color='standard' onClick={() => setDashboardParams({ openDialog: false })}>Cancel</Button>
        <Button color='standard' onClick={handleAddVariation}>Ok</Button>
      </DialogActions>
    </>
  )
}

export default AddProductVariation
