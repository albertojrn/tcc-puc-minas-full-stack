import React, { useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { ItemsContainer, ItemsList, ListItemCustom } from './styles'
import { COLORS } from '../../../../../../constants/theme'
import { useUserContext } from '../../../../../../contexts/UserContext'

function DrawerItems({ setContentId }) {
  const [collapseRegisterMenu, setCollapseRegisterMenu] = useState(true)
  const [collapseReportMenu, setCollapseReportMenu] = useState(true)
  const { logoutUser } = useUserContext()

  function handleLogout() {
    logoutUser()
  }

  return (
    <ItemsContainer>
      <ItemsList>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setContentId(1)}>
            <ListItemText primary='Usuários' />
          </ListItemButton>
        </ListItem>
        <ListItemCustom bgColor={COLORS.lightgray} disablePadding>
          <ListItemButton onClick={() => setCollapseRegisterMenu(prev => !prev)}>
            <ListItemText primary='Cadastro' />
            {collapseRegisterMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItemCustom>
        <Collapse in={collapseRegisterMenu} timeout='auto' unmountOnExit>
          <ItemsList indentation={1}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setContentId(2)}>
                <ListItemText primary='Produtos' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setContentId(3)}>
                <ListItemText primary='Características' />
              </ListItemButton>
            </ListItem>
          </ItemsList>
        </Collapse>
        <ListItemCustom bgColor={COLORS.lightgray} disablePadding>
          <ListItemButton onClick={() => setCollapseReportMenu(prev => !prev)}>
            <ListItemText primary='Relatórios' />
            {collapseReportMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItemCustom>
        <Collapse in={collapseReportMenu} timeout='auto' unmountOnExit>
          <ItemsList indentation={1}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setContentId(4)}>
                <ListItemText primary='Vendas' />
              </ListItemButton>
            </ListItem>
          </ItemsList>
        </Collapse>
      </ItemsList>
      <ItemsList>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary='Sair' />
          </ListItemButton>
        </ListItem>
      </ItemsList>
    </ItemsContainer>
  )
}

export default DrawerItems
