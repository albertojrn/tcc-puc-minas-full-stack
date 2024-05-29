import React, { useState } from 'react'
import { Button, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import FormField from '../../../../../../../FormField'
import { Color } from '../../../../../../../../styles'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import { validateFields } from '../../../../../../../../utils/formMethods'
import { CONSTRAINTS } from './constants/validationParams'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'
import { createFeatureValues, updateFeatureValues } from '../../../../../../../../services/api/featureValues'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import { useUserContext } from '../../../../../../../../contexts/UserContext'
import SQL_ERROR_STATUS_DICT from '../../../../../../../../constants/sqlErrorStatusDict'

function AddFeatureValues({ feature }) {
  const isUpdate = Boolean(feature.feature_id)
  const [name, setName] = useState(isUpdate ? feature.name : '')
  const [error, setError] = useState({})
  const [errorCreate, setErrorCreate] = useState('')
  const { setDashboardParams } = useDashboardContext()
  const { featureValues, setDashboardData } = useDashboardDataContext()
  const { setLoading } = useLoadingContext()
  const { token } = useUserContext()

  async function handleOnOkClick() {
    const validation = validateFields({ name }, CONSTRAINTS)
    setError(validation.error)
    if (validation.passed) {
      setLoading({ show: true })
      setErrorCreate('')
      const res = (
        isUpdate
          ? await updateFeatureValues(feature.id, { name }, token)
          : await createFeatureValues({ name, feature_id: feature.id }, token)
      )
      setLoading({ show: false })
      if (res.status === 201) {
        const newFeatureValues = structuredClone(featureValues)
        if (!newFeatureValues[feature.id]) newFeatureValues[feature.id] = []
        newFeatureValues[feature.id].push(res.data)
        setDashboardData({ featureValues: newFeatureValues })
        setDashboardParams({ openDialog: false })
      }
      else if (res.status === 200) {
        const newFeatureValues = structuredClone(featureValues)
        const entry = newFeatureValues[feature.feature_id].find(f => f.id === feature.id)
        entry.name = res.data.name
        setDashboardData({ featureValues: newFeatureValues })
        setDashboardParams({ openDialog: false })
      }
      else if (res?.response?.data?.error) {
        const errorStatus = res.response.data.error.status
        const errorMessage = SQL_ERROR_STATUS_DICT[errorStatus]
        if (errorMessage) setErrorCreate(errorMessage)
        else setErrorCreate(`Não foi possível ${isUpdate ? 'editar' : 'criar'} o valor. Tente novamente`)
      }
    }
  }

  return (
    <>
      <DialogTitle>{`${isUpdate ? 'Editar' : 'Novo'} Valor`}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} direction='column'>
          <FormField
            autoFocus
            error={error}
            field='name'
            fullWidth
            label='Nome'
            required
            setError={setError}
            setField={setName}
            value={name}
          />
          {errorCreate
            && (
              <Typography variant='body1'>
                <Color color='red'>{errorCreate}</Color>
              </Typography>
            )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color='standard' onClick={() => setDashboardParams({ openDialog: false })}>Cancelar</Button>
        <Button color='standard' onClick={handleOnOkClick}>Ok</Button>
      </DialogActions>
    </>
  )
}

export default AddFeatureValues
