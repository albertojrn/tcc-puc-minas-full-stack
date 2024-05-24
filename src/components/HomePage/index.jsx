import React from 'react'
import { useUserContext } from '../../contexts/UserContext'
import { GridItem, MainGridContainer } from '../../styles'
import BigCarousel from './components/BigCarousel'
import ProductScrollGrid from '../ProductsScrollGrid'
import GridTitle from '../GridTitle'
import { readProducts } from '../../services/api/products'

function HomePage() {
  const { id } = useUserContext()
  return (
    <MainGridContainer container spacing={2}>
      <GridItem item xs={12}>
        <BigCarousel />
      </GridItem>
      <GridTitle title='Adicionados Recentemente' />
      <GridItem item xs={12}>
        <ProductScrollGrid fetchProducts={() => readProducts(null, { limit: 10, orderby: 'date', orderdirection: 'DESC' })} query={{ limit: 10, orderby: 'date', orderdirection: 'DESC' }} />
      </GridItem>
    </MainGridContainer>
  )
}

export default HomePage
