import React, { useEffect, useRef, useState } from 'react'
import { IconButton } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { v4 } from 'uuid'
import { Container, ControlsContainer, MainContainer, ScrollContainer } from './styles'
import { GridItem } from '../../styles'
import ProductCard from '../ProductCard'

function ProductScrollGrid({ fetchProducts, sizes }) {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [scrollIndex, setScrollIndex] = useState(0)
  const prevRemainingScroll = useRef(null)
  const preClass = v4()

  function onControlClick(direction) {
    const container = document.getElementById(`${preClass}ProductsScrollGridContainer-root`)
    setScrollIndex(prev => {
      if (direction === 'prev') {
        const futureIndex = prev - 1
        if (futureIndex >= 0) return futureIndex
      }
      else if (direction === 'next') {
        const futureIndex = prev + 1
        const remainingScroll = container.offsetWidth - container.scrollLeft
        const stopScrolling = remainingScroll === prevRemainingScroll.current
        if (!stopScrolling) {
          prevRemainingScroll.current = remainingScroll
          return futureIndex
        }
      }
      return prev
    })
  }

  async function loadProducts() {
    setLoading(true)
    const res = await fetchProducts()
    setLoading(true)
    if (res?.data?.length) setProducts(res.data)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    const container = document.getElementById(`${preClass}ProductsScrollGridContainer-root`)
    const innerContainer = container.getElementsByClassName('ProductsScrollContainer-root')[0]
    const childs = innerContainer.children
    if (childs[scrollIndex]) {
      container.scrollTo({
        top: 0,
        left: childs[scrollIndex].offsetLeft,
        behavior: 'smooth',
      })
    }
  }, [scrollIndex])

  return (
    <MainContainer>
      <Container id={`${preClass}ProductsScrollGridContainer-root`}>
        <ScrollContainer className='ProductsScrollContainer-root' container spacing={2}>
          {products.map((product) => (
            <GridItem item {...sizes} key={product.id}>
              <ProductCard
                productId={product.id}
                title={product.title}
                variations={product.variations}
                images={product.images}
              />
            </GridItem>
          ))}
        </ScrollContainer>
      </Container>
      <ControlsContainer onClick={() => onControlClick('prev')}>
        <IconButton>
          <ArrowBackIos />
        </IconButton>
      </ControlsContainer>
      <ControlsContainer isRight onClick={() => onControlClick('next')}>
        <IconButton>
          <ArrowForwardIos />
        </IconButton>
      </ControlsContainer>
    </MainContainer>
  )
}

export default ProductScrollGrid
