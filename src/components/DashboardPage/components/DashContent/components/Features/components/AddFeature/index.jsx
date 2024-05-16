import React, { useState } from 'react'
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import FormField from '../../../../../../../FormField'
import { validateFields } from '../../../../../../../../utils/formMethods'
import { CONSTRAINTS } from './constants/validationParams'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'
import { createFeatures, updateFeatures } from '../../../../../../../../services/api/features'
import { Color } from '../../../../../../../../styles'
import SQL_ERROR_STATUS_DICT from '../../../../../../../../constants/sqlErrorStatusDict'

function AddFeature({ feature }) {
  const isUpdate = feature !== undefined
  const [error, setError] = useState({})
  const [errorCreate, setErrorCreate] = useState('')
  const [isMultiple, setIsMultiple] = useState(Boolean(feature?.is_multiple))
  const [name, setName] = useState(feature?.name ?? '')
  const { setDashboardParams } = useDashboardContext()
  const { features, setDashboardData } = useDashboardDataContext()
  const { setLoading } = useLoadingContext()

  async function handleOnOkClick() {
    const validation = validateFields({ name }, CONSTRAINTS)
    setError(validation.error)
    if (validation.passed) {
      setLoading({ show: true })
      setErrorCreate('')
      const res = (
        isUpdate
          ? await updateFeatures(feature.id, { name, is_multiple: isMultiple })
          : await createFeatures({ name, is_multiple: isMultiple })
      )
      setLoading({ show: false })
      if (res.status === 201) {
        setDashboardData({ features: [...features, res.data] })
        setDashboardParams({ openDialog: false })
      }
      else if (res.status === 200) {
        const newFeatures = structuredClone(features)
        for (const f of newFeatures) {
          if (f.id === feature.id) {
            if (res.data.name) f.name = res.data.name
            if (res.data.is_multiple) f.is_multiple = res.data.is_multiple
          }
        }
        setDashboardData({ features: newFeatures })
        setDashboardParams({ openDialog: false })
      }
      else if (res?.response?.data?.error) {
        const errorStatus = res.response.data.error.status
        const errorMessage = SQL_ERROR_STATUS_DICT[errorStatus]
        if (errorMessage) setErrorCreate(errorMessage)
        else setErrorCreate(`Não foi possível ${isUpdate ? 'editar' : 'criar'} a característica. Tente novamente`)
      }
    }
  }

  return (
    <>
      <DialogTitle>{`${isUpdate ? 'Editar' : 'Nova'} Característica`}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} direction='column'>
          <FormField
            error={error}
            field='name'
            fullWidth
            label='Nome'
            required
            setError={setError}
            setField={setName}
            value={name}
          />
          <FormControl>
            <FormLabel>Múltiplos valores?</FormLabel>
            <RadioGroup
              onChange={(e) => setIsMultiple(e.target.value !== 'false')}
              row
              value={isMultiple}
            >
              <FormControlLabel value='false' control={<Radio />} label='Não' />
              <FormControlLabel value='true' control={<Radio />} label='Sim' />
            </RadioGroup>
          </FormControl>
          {errorCreate
            && (
              <Typography variant='body1'>
                <Color color='red'>{errorCreate}</Color>
              </Typography>
            )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color='standard' onClick={() => setDashboardParams({ openDialog: false })}>Cancel</Button>
        <Button color='standard' onClick={handleOnOkClick}>Ok</Button>
      </DialogActions>
    </>
  )
}

export default AddFeature
