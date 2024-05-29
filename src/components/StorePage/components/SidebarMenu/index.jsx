import React from 'react'
import { Divider } from '@mui/material'
import { MenuContainer } from './styles'
import { FIXED_MENU_CATEGORIES } from './constants/params'
import SidebarMenuFeatureGroup from '../SidebarMenuFeatureGroup'
import { sortByObjProp } from '../../../../utils/sortByObjProp'

function SidebarMenu({ selectedFeatures = [], menuItems = [] }) {
  return (
    <MenuContainer spacing={2}>
      {menuItems
        ?.filter(feature => FIXED_MENU_CATEGORIES.includes(feature.name.toLowerCase()))
        ?.sort((a, b) => sortByObjProp(a, b, 'name'))
        ?.map(feature => (
          <SidebarMenuFeatureGroup
            key={feature.id}
            defaultOpened
            feature={feature}
            numberSelectedFeatures={selectedFeatures}
          />
        ))}
      {menuItems
        ?.filter(feature => !FIXED_MENU_CATEGORIES.includes(feature.name.toLowerCase()))
        ?.sort((a, b) => sortByObjProp(a, b, 'name'))
        ?.map(feature => (
          <SidebarMenuFeatureGroup
            key={feature.id}
            feature={feature}
            numberSelectedFeatures={selectedFeatures}
          />
        ))}
      <Divider />
    </MenuContainer>
  )
}

export default SidebarMenu
