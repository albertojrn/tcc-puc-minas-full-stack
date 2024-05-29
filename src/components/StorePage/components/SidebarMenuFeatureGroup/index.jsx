import React from 'react'
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import CollapsibleListItem from '../../../CollapsibleListItem'
import { buildQueryString } from '../../../../utils/buildQueryString'
import { CustomLink } from '../../../../styles'
import { sortByObjProp } from '../../../../utils/sortByObjProp'

function SidebarMenuFeatureGroup({ feature, numberSelectedFeatures, defaultOpened }) {
  return (
    <CollapsibleListItem
      label={feature.name.toLowerCase()}
      defaultOpened={defaultOpened}
    >
      {feature
        .featureValues
        ?.sort((a, b) => sortByObjProp(a, b, 'name'))
        ?.map(value => {
          let query = ''
          if (numberSelectedFeatures.includes(value.id)) {
            const newFvQuery = numberSelectedFeatures.filter(id => id !== value.id)
            query = buildQueryString({ fv: newFvQuery })
          }
          else {
            const newFvQuery = [...numberSelectedFeatures]
            newFvQuery.push(value.id)
            query = buildQueryString({ fv: newFvQuery })
          }
          const toLink = `/store${query}`
          return (
            <ListItem key={value.id} disablePadding>
              <CustomLink textDecoration='none' to={toLink}>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox size='small' checked={numberSelectedFeatures.includes(value.id)} />
                  </ListItemIcon>
                  <ListItemText primary={value.name.toLowerCase()} />
                </ListItemButton>
              </CustomLink>
            </ListItem>
          )
        })}
    </CollapsibleListItem>
  )
}

export default SidebarMenuFeatureGroup
