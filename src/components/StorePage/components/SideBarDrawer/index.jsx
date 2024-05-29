import React from 'react'
import { Box, IconButton, List, ListItem, ListItemButton, Stack, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useStoreContext } from '../../../../contexts/StoreContext'
import { MenuContainer } from './styles'
import Sidebar from '../Sidebar'

function SideBarDrawer({ availableFeaturesValues, selectedFeatures }) {
  const { openProductFilter, setStorePersistent } = useStoreContext()

  return (
    <MenuContainer open={openProductFilter} onClose={() => setStorePersistent({ openProductFilter: false })}>
      <Box role='presentation'>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setStorePersistent({ openProductFilter: false })}>
              <Stack className='MenuHeader-root' direction='row' alignItems='center' justifyContent='space-between'>
                <Typography variant='h6' fontWeight='bold'>
                  Filtros
                </Typography>
                <IconButton size='large'>
                  <ArrowBack size='large'/>
                </IconButton>
              </Stack>
            </ListItemButton>
          </ListItem>
        </List>
        <Sidebar
          availableFeaturesValues={availableFeaturesValues}
          selectedFeatures={selectedFeatures}
        />
      </Box>
    </MenuContainer>
  )
}

export default SideBarDrawer
