import React from 'react'
import { ContentContainer, DashboardContentContainer } from './styles'
import Products from './components/Products'
import Features from './components/Features'

function DashContent({ contentId }) {
  return (
    <DashboardContentContainer component='main'>
      <>
        {contentId === 2 && <ContentContainer><Products /></ContentContainer>}
        {contentId === 3 && <ContentContainer><Features /></ContentContainer>}
      </>
    </DashboardContentContainer>
  )
}

export default DashContent
