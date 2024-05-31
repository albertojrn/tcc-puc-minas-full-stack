import React from 'react'
import { ContentContainer, DashboardContentContainer } from './styles'
import Products from './components/Products'
import Features from './components/Features'
import Users from './components/Users'
import ReportPage from './components/ReportPage'

function DashContent({ contentId }) {
  return (
    <DashboardContentContainer component='main'>
      <>
        {contentId === 1 && <ContentContainer><Users /></ContentContainer>}
        {contentId === 2 && <ContentContainer><Products /></ContentContainer>}
        {contentId === 3 && <ContentContainer><Features /></ContentContainer>}
        {contentId === 4 && <ContentContainer><ReportPage /></ContentContainer>}
      </>
    </DashboardContentContainer>
  )
}

export default DashContent
