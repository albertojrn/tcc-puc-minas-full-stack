import React from 'react'
import { ContentContainer, DashboardContentContainer } from './styles'
import Products from './components/Products'
import Features from './components/Features'

function DashContent({ contentId }) {
  return (
    <DashboardContentContainer component='main'>
      <>
        <ContentContainer show={contentId === 2}>
          <Products />
        </ContentContainer>
        <ContentContainer show={contentId === 3}>
          <Features />
        </ContentContainer>
      </>
    </DashboardContentContainer>
  )
}

export default DashContent
