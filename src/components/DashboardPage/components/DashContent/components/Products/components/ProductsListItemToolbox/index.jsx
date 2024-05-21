import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import DialogYesNo from '../../../../../../../DialogYesNo'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'
import { deleteProducts } from '../../../../../../../../services/api/products'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import { PRODUCTS_PER_PAGE } from '../ProductsList/constants/searchParams'
import ProductRegistry from '../ProductRegistry'
import DialogRetry from '../../../../../../../DialogRetry'

function ProductsListItemToolbox({ product, page }) {
  const [anchorMenu, setAnchorMenu] = useState(null)
  const { setDashboardParams } = useDashboardContext()
  const { products, setDashboardData } = useDashboardDataContext()
  const { setLoading } = useLoadingContext()
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
    const res = await deleteProducts(product.id)
    if (res.status === 204) {
      const changedProducts = { ...products }
      changedProducts[page] = changedProducts[page].filter(item => item.id !== product.id)
      const productsList = []
      const productsPages = Object.keys(changedProducts)
      for (const p of productsPages) {
        productsList.push(...changedProducts[p])
      }
      const newProducts = {}
      let a = 1
      for (let i = 0; i < productsList.length; i++) {
        if (!newProducts[a]) newProducts[a] = []
        const newLength = newProducts[a].push(productsList[i])
        if (newLength === PRODUCTS_PER_PAGE) a++
      }
      setDashboardData({ products: newProducts })
    }
    else if (res?.response?.data?.error) {
      setDashboardParams({
        dialogChild: (
          <DialogRetry
            text={`Não foi possível excluir o produto ${product.title}. Tente novamente.`}
            title='Atenção'
            onRetry={handleDeleteProduct}
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
