import React from 'react'
import { Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { AppBarContainer } from '../../../../styles'
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DASHBOARD
          </Typography>
        </Toolbar>
      </Container>
    </AppBarContainer>
  )
}

export default DashNavBar
