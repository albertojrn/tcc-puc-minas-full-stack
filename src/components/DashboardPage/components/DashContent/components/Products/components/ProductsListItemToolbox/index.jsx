import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import DialogYesNo from '../../../../../../../DialogYesNo'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'
import { deleteProducts } from '../../../../../../../../services/api/products'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import ProductRegistry from '../ProductRegistry'
import DialogRetry from '../../../../../../../DialogRetry'
import { updateListPagesOnDelete } from '../../../../utils/updateListPagesOnDelete'
import { useUserContext } from '../../../../../../../../contexts/UserContext'

function ProductsListItemToolbox({ product, page }) {
  const [anchorMenu, setAnchorMenu] = useState(null)
  const { setDashboardParams } = useDashboardContext()
  const { products, setDashboardData } = useDashboardDataContext()
  const { setLoading } = useLoadingContext()
  const { token } = useUserContext()
  const open = Boolean(anchorMenu)

  function handleOpenEditProduct() {
    setAnchorMenu(null)
    setDashboardParams({
      modalChild: (
        <ProductRegistry product={product} />
      ),
      openModal: true,
      blockModal: true,
    })
  }

  async function handleDeleteProduct() {
    setLoading({ show: true })
    const res = await deleteProducts(product.id, token)
    if (res.status === 204) {
      const newProducts = updateListPagesOnDelete(products, page, product)
      setDashboardData({ products: newProducts })
    }
    else if (res?.data?.error) {
      setDashboardParams({
        dialogChild: (
          <DialogRetry
            text={`Não foi possível excluir o produto ${product.title}. Tente novamente.`}
            title='Atenção'
            onRetry={handleDeleteProduct}
            setDialogParams={setDashboardParams}
          />
        ),
        openDialog: true,
      })
    }
    setLoading({ show: false })
  }

  function confirmDeleteProduct() {
    setDashboardParams({ openDialog: false })
    setAnchorMenu(null)
    handleDeleteProduct()
  }

  function openDeleteConfirmation() {
    setAnchorMenu(null)
    setDashboardParams({
      dialogChild: (
        <DialogYesNo
          onYes={confirmDeleteProduct}
          text={`Tem certeza de que deseja excluir o produto '${product.title}'?`}
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
        open={open}
        onClose={() => setAnchorMenu(null)}
      >
        <MenuItem onClick={handleOpenEditProduct}>Editar</MenuItem>
        <MenuItem onClick={openDeleteConfirmation}>Excluir</MenuItem>
      </Menu>
    </>
  )
}

export default ProductsListItemToolbox
