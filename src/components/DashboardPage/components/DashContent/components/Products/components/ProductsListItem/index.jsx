import React, { useState } from 'react'
import { COLUMNS } from '../ProductsList/constants/gridParams'
import { GridItem } from '../../../../../../../../styles'
import buildGridItemContent from '../ProductsList/utils/buildGridItemContent'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'

function ProductsListItem({ product }) {
  const [collapse, setSollapse] = useState(true)
  const { productsPage } = useDashboardContext()

  return (
    COLUMNS.map(column => (
      <GridItem item key={column.id} align={column.align} hideInMobile={column.hideInMobile} {...column.sizes}>
        {buildGridItemContent(productsPage, product, column.id)}
      </GridItem>
    ))
  )
}

export default ProductsListItem
