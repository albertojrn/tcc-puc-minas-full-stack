import React from 'react'
import { Box, IconButton, List, ListItem, ListItemButton, Stack, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useStoreContext } from '../../../../contexts/StoreContext'
import { MenuContainer } from './styles'
import CategoriesMenu from '../CategoriesMenu'

function DrawerMenu() {
  const { openMenu, setStorePersistent } = useStoreContext()

  return (
    <MenuContainer open={openMenu} onClose={() => setStorePersistent({ openMenu: false })}>
      <Box role='presentation'>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setStorePersistent({ openMenu: false })}>
              <Stack className='MenuHeader-root' direction='row' alignItems='center' justifyContent='space-between'>
                <Typography variant='h6' fontWeight='bold'>
                  Menu
                </Typography>
                <IconButton size='large'>
                  <ArrowBack size='large'/>
                </IconButton>
              </Stack>
            </ListItemButton>
          </ListItem>
        </List>
        <CategoriesMenu />
      </Box>
    </MenuContainer>
  )
}

export default DrawerMenu
