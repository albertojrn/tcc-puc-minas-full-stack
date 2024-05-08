import React from 'react'
import { ContentContainer, DashboardContentContainer } from './styles'
import ProductRegister from './components/ProductRegister'
import FeaturesRegister from './components/FeaturesRegister'

function DashContent({ contentId }) {
  return (
    <DashboardContentContainer component='main'>
      <>
        <ContentContainer show={contentId === 2}>
          <ProductRegister />
        </ContentContainer>
        <ContentContainer show={contentId === 3}>
          <FeaturesRegister />
        </ContentContainer>
      </>
    </DashboardContentContainer>
  )
}

export default DashContent
