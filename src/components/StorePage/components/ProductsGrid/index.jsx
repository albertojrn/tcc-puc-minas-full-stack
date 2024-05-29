import React from 'react'
import { Stack, Typography } from '@mui/material'
import { FilterList } from '@mui/icons-material'
import { GridItem, MainGridContainer } from '../../../../styles'
import ProductCard from '../../../ProductCard'
import LoadMoreButton from '../LoadMoreButton'
import { FilterButton } from './styles'
import { useStoreContext } from '../../../../contexts/StoreContext'

function ProductsGrid({
  loadingProducts,
  products = [],
  productsCount = 0,
  setProductsPage,
}) {
  const { openProductFilter, setStorePersistent } = useStoreContext()
  console.log({products})

  return (
    <MainGridContainer container spacing={2}>
      <GridItem item xs={12}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <FilterButton onClick={() => setStorePersistent({ openProductFilter: !openProductFilter })}>
            <FilterList />
          </FilterButton>
          <Typography variant='body2'>
            {`Encontramos ${productsCount} produtos - Mostrando ${products.length}`}
          </Typography>
        </Stack>
      </GridItem>
      {products.length
        ? (
          products?.map(product => (
            <GridItem item xs={6} sm={4} md={3} key={product.id}>
              <ProductCard
                productId={product.id}
                title={product.title}
                variations={product.variations}
                images={product.images}
              />
            </GridItem>
          ))
        )
        : (
          !loadingProducts
            && (
              <GridItem item xs={12}>
                <Typography aling='center' variant='h6' textAlign='center'>
                  Nenhum produto encontrado.
                  <br />
                  Realize uma nova busca.
                </Typography>
              </GridItem>
            )
        )}
      <GridItem item xs={12}>
        <LoadMoreButton
          loadingProducts={loadingProducts}
          productsCount={productsCount}
          productsLength={(products ?? []).length}
          setProductsPage={setProductsPage}
        />
      </GridItem>
    </MainGridContainer>
  )
}

export default ProductsGrid
