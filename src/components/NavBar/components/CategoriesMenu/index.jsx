import React from 'react'
import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import CollapsibleListItem from '../../../CollapsibleListItem'
import { CustomLink } from '../../../../styles'
import { COLORS } from '../../../../constants/theme'
import { MENU_ITEMS } from './constants/menuItems'
import { useStoreContext } from '../../../../contexts/StoreContext'
import { sortByObjProp } from '../../../../utils/sortByObjProp'

function CategoriesMenu() {
  const { setStorePersistent } = useStoreContext()

  return (
    <>
      <List>
        {MENU_ITEMS.map(item => (
          <CollapsibleListItem
            key={item.category}
            label={item.category}
            defaultOpened
          >
            {item.subCategories.sort((a, b) => sortByObjProp(a, b, 'text')).map(subItem => (
              <ListItem key={subItem.url} disablePadding>
                <CustomLink
                  color={COLORS.urbanBlack}
                  to={subItem.url}
                  textDecoration='none'
                  preventWrap
                >
                  <ListItemButton onClick={() => setStorePersistent({ openMenu: false })}>
                    <ListItemText primary={subItem.text} />
                  </ListItemButton>
                </CustomLink>
              </ListItem>
            ))}
          </CollapsibleListItem>
        ))}
      </List>
      <Divider />
    </>
  )
}

export default CategoriesMenu
