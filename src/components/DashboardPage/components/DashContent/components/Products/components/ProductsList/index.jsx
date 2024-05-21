import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../../../../../styles'
import { COLUMNS } from './constants/gridParams'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import { loadProducts } from '../../../../../../../../utils/products'
import PleaseTryAgain from '../../../../../../../PleaseTryAgain'
import ProductsListItem from '../ProductsListItem'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'

function ProductsList() {
  const [errFetchProducts, setErrFetchProducts] = useState('')
  const [loading, setLoading] = useState(false)
  const { products, setDashboardData } = useDashboardDataContext()
  const { productsPage } = useDashboardContext()

  async function fetchParams() {
    setLoading(true)
    await loadProducts(products, productsPage, setDashboardData, setErrFetchProducts)
    setLoading(false)
  }

  useEffect(() => {
    fetchParams()
  }, [])

  return (
    <MainGridContainer container spacing={2} alignItems='center'>
      {COLUMNS.map(column => (
        <GridItem item key={column.id} align={column.align} hideInMobile={column.hideInMobile} {...column.sizes}>
          <Typography
            fontWeight='bold'
            variant='body1'
          >
            {column.header}
          </Typography>
        </GridItem>
      ))}
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
