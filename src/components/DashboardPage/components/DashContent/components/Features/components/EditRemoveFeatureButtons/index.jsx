import React from 'react'
import { IconButton, Stack } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'
import { deleteFeatures } from '../../../../../../../../services/api/features'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import DialogOk from '../../../../../../../DialogOk'
import AddFeature from '../AddFeature'

function EditRemoveFeatureButtons({ feature }) {
  const { setLoading } = useLoadingContext()
  const { features, setDashboardData } = useDashboardDataContext()
  const { setDashboardParams } = useDashboardContext()

  function handleEditIcon() {
    setDashboardParams({
      dialogChild: (
        <AddFeature feature={feature} />
      ),
      openDialog: true,
    })
  }

  async function handleDeleteFeature() {
    setLoading({ show: true })
    const res = await deleteFeatures(feature.id)
    setLoading({ show: false })
    if (res.status === 204) {
      const newFeatures = features.filter(f => f.id !== feature.id)
      setDashboardData({ features: newFeatures })
    }
    else if (res?.response?.data?.error) {
      setDashboardParams({
        dialogChild: (
          <DialogOk
            text={`Não foi possível remover a característica ${feature.name}. Tente novamente.`}
            title='Atenção'
          />
        ),
        openDialog: true,
      })
    }
  }

  return (
    <Stack
      alignItems='center'
      direction='row'
      edge='end'
      spacing={1}
    >
      <IconButton onClick={handleEditIcon}>
        <Edit />
      </IconButton>
      <IconButton onClick={handleDeleteFeature}>
        <Delete />
      </IconButton>
    </Stack>
  )
}

export default EditRemoveFeatureButtons
