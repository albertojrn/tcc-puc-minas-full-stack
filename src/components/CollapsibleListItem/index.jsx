import { Collapse, IconButton, List, ListItemButton, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { CollapsibleListItemContainer, LabelContainer } from './styles'

function CollapsibleListItem({ children, defaultOpened = false, label }) {
  const [open, setOpen] = useState(defaultOpened)

  return (
    <>
      <LabelContainer
        className='CollapsibleMenuLabel-root'
        disablePadding
        secondaryAction={(
          <IconButton edge='end'>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
        onClick={() => setOpen(prev => !prev)}
      >
        <ListItemButton>
          <ListItemText primary={label} />
        </ListItemButton>
      </LabelContainer>
      <CollapsibleListItemContainer disablePadding>
        <Collapse in={open} timeout='auto'>
          <List>
            {children}
          </List>
        </Collapse>
      </CollapsibleListItemContainer>
    </>
  )
}

export default CollapsibleListItem
