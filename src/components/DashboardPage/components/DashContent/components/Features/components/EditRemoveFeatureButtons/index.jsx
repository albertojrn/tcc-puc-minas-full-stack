import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'
import { deleteFeatures } from '../../../../../../../../services/api/features'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import DialogOk from '../../../../../../../DialogOk'
import DialogYesNo from '../../../../../../../DialogYesNo'
import AddFeature from '../AddFeature'
import { useUserContext } from '../../../../../../../../contexts/UserContext'

function EditRemoveFeatureButtons({ feature }) {
  const [anchorMenu, setAnchorMenu] = useState(null)
  const { setLoading } = useLoadingContext()
  const { features, setDashboardData } = useDashboardDataContext()
  const { setDashboardParams } = useDashboardContext()
  const openMenu = Boolean(anchorMenu)
  const { token } = useUserContext()

  function handleEditFeature() {
    setAnchorMenu(null)
    setDashboardParams({
      dialogChild: (
        <AddFeature feature={feature} />
      ),
      openDialog: true,
    })
  }

  async function handleDeleteFeature() {
    setLoading({ show: true })
    const res = await deleteFeatures(feature.id, token)
    setLoading({ show: false })
    if (res.status === 204) {
      const newFeatures = features.filter(f => f.id !== feature.id)
      setDashboardData({ features: newFeatures })
    }
    else if (res?.data?.error) {
      setDashboardParams({
        dialogChild: (
          <DialogOk
            text={`Não foi possível remover a característica ${feature.name}. Tente novamente.`}
            title='Atenção'
            setDialogParams={setDashboardParams}
          />
        ),
        openDialog: true,
      })
    }
  }

  function confirmDeleteFeature() {
    setDashboardParams({ openDialog: false })
    handleDeleteFeature()
  }

  function openDeleteDialog() {
    setAnchorMenu(null)
    setDashboardParams({
      dialogChild: (
        <DialogYesNo
          onYes={confirmDeleteFeature}
          text={`Tem certeza de que deseja apagar a característica '${feature.name}'?`}
          title='PRECISAMOS DA SUA CONFIRMAÇÃO'
          setDialogParams={setDashboardParams}
        />
      ),
      openDialog: true,
    })
  }

  return (
    <>
      <IconButton onClick={(e) => setAnchorMenu(e.currentTarget)}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorMenu}
        open={openMenu}
        onClose={() => setAnchorMenu(null)}
      >
        <MenuItem onClick={handleEditFeature}>
          Editar
        </MenuItem>
        <MenuItem onClick={openDeleteDialog}>
          Apagar
        </MenuItem>
      </Menu>
    </>
  )
}

export default EditRemoveFeatureButtons
