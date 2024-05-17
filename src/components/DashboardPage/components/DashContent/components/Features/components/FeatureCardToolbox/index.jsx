import React from 'react'
import { IconButton, Stack } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import AddFeatureValues from '../AddFeatureValues'
import { deleteFeatureValues } from '../../../../../../../../services/api/featureValues'
import DialogOk from '../../../../../../../DialogOk'
import DialogYesNo from '../../../../../../../DialogYesNo'

function FeatureCardToolbox({ featureValue }) {
  const { setLoading } = useLoadingContext()
  const { featureValues, setDashboardData } = useDashboardDataContext()
  const { setDashboardParams } = useDashboardContext()

  function handleEditFeature() {
    setDashboardParams({
      dialogChild: (
        <AddFeatureValues feature={featureValue} />
      ),
      openDialog: true,
    })
  }

  async function handleDeleteFeature() {
    setLoading({ show: true })
    const res = await deleteFeatureValues(featureValue.id)
    if (res.status === 204) {
      const newFeatureValues = structuredClone(featureValues)
      newFeatureValues[featureValue.feature_id] = newFeatureValues[featureValue.feature_id].filter(f => f.id !== featureValue.id)
      setDashboardData({ featureValues: newFeatureValues })
    }
    else if (res?.response?.data?.error) {
      setDashboardParams({
        dialogChild: (
          <DialogOk
            text={`Não foi possível remover o valor ${featureValue.name}. Tente novamente.`}
            title='Atenção'
          />
        ),
        openDialog: true,
      })
    }
    setLoading({ show: false })
  }

  function confirmDeleteFeature() {
    setDashboardParams({ openDialog: false })
    handleDeleteFeature()
  }

  function openDeleteDialog() {
    setDashboardParams({
      dialogChild: (
        <DialogYesNo
          onYes={confirmDeleteFeature}
          text={`Tem certeza de que deseja apagar o valor '${featureValue.name}'?`}
          title='PRECISAMOS DA SUA CONFIRMAÇÃO'
        />
      ),
      openDialog: true,
    })
  }

  return (
    <Stack direction='row' edge='end' spacing={0.5}>
      <IconButton onClick={handleEditFeature}>
        <Edit />
      </IconButton>
      <IconButton onClick={openDeleteDialog}>
        <Delete />
      </IconButton>
    </Stack>
  )
}

export default FeatureCardToolbox
