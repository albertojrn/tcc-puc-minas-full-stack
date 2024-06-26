import React, { useEffect, useState } from 'react'
import { GridItem, MainGridContainer } from '../../../../../../../../styles'
import { COLUMNS } from './constants/gridParams'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import { loadProducts } from '../../../../../../../../utils/products'
import PleaseTryAgain from '../../../../../../../PleaseTryAgain'
import ProductsListItem from '../ProductsListItem'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import GridListHeader from '../../../GridListHeader'

function ProductsList() {
  const [errFetchProducts, setErrFetchProducts] = useState('')
  const [loading, setLoading] = useState(false)
  const { products, setDashboardData } = useDashboardDataContext()
  const { productsPage, setDashboardParams } = useDashboardContext()

  async function fetchParams() {
    setLoading(true)
    await loadProducts(products, productsPage, setDashboardData, setErrFetchProducts)
    setLoading(false)
  }

  useEffect(() => {
    fetchParams()
    return (() => {
      if (productsPage !== 1) setDashboardParams({ productsPage: 1 })
    })
  }, [])

  return (
    <MainGridContainer container spacing={2} alignItems='center'>
      <GridListHeader columns={COLUMNS} />
      {errFetchProducts
        ? (
          <GridItem item xs={12}>
            <PleaseTryAgain
              onTryAgain={fetchParams}
              text={errFetchProducts}
            />
          </GridItem>
        )
        : (
          products[productsPage]?.map(product => (
            <ProductsListItem key={product.id} product={product} />
          ))
        )}
    </MainGridContainer>
  )
}

export default ProductsList
