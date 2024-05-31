import React from 'react'
import { Stack, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { AppBarContainer, CustomLink } from '../../../../styles'
import { Container, MenuIconButton } from './styles'

function DashNavBar({ handleDrawerToggle }) {
  return (
    <AppBarContainer>
      <Container position='fixed'>
        <Toolbar>
          <MenuIconButton
            size='large'
            edge='start'
            color='inherit'
            onClick={handleDrawerToggle}
          >
            <Menu />
          </MenuIconButton>
          <Stack direction='row' sx={{ flexGrow: 1 }} alignItems='center' justifyContent='space-between'>
            <Typography variant="h6" component="div" >
              DASHBOARD
            </Typography>
            <CustomLink textDecoration='none' to='/'>
              Ir para a loja
            </CustomLink>
          </Stack>
        </Toolbar>
      </Container>
    </AppBarContainer>
  )
}

export default DashNavBar
