import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material'
import { FooterContainer } from './styles'
import { FOOTER_HIDE_ON_ROUTES } from '../../constants/routesNotAllowed'

function Footer() {
  const hideContent = FOOTER_HIDE_ON_ROUTES.includes(location.pathname)
  if (hideContent) return null

  return (
    <FooterContainer direction='row' alignItems='center' justifyContent='center'>
      <Stack direction='column' spacing={0} alignItems='center'>
        <Typography variant='h6'>
          Nossas mídias sociais
        </Typography>
        <Stack direction='row' spacing={1}>
          <Link to='https://www.instagram.com/alberto.richa/' target='_blank'><Instagram /></Link>
          <Link to='https://www.facebook.com/albertojrneto' target='_blank'><Facebook /></Link>
          <Link to='https://linkedin.com/in/albertojrneto/' target='_blank'><LinkedIn /></Link>
        </Stack>
      </Stack>
    </FooterContainer>
  )
}

export default Footer
