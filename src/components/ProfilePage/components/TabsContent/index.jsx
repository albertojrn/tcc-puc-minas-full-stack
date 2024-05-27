import React from 'react'
import { ContentContainer } from './styles'

function TabsContent(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <ContentContainer sx={{ p: 3 }}>
          {children}
        </ContentContainer>
      )}
    </div>
  )
}

export default TabsContent
