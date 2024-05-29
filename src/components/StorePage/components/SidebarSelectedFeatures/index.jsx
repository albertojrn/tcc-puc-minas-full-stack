import React, { useEffect, useState } from 'react'
import { Chip, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { ChipsContainer, SelectedFilters } from './styles'
import { CustomLink } from '../../../../styles'
import { buildQueryString } from '../../../../utils/buildQueryString'
import { readFeatureValues } from '../../../../services/api/featureValues'

function SidebarSelectedFeatures({ menuItems = [], selectedFeatures = [] }) {
  const [chipItems, setChipItems] = useState([])

  function generateRemovalLink(featureId) {
    const newFvQuery = selectedFeatures.filter(id => id !== featureId)
    const query = buildQueryString({ fv: newFvQuery })
    return `/store${query}`
  }

  async function buildChipItems() {
    const newChipItems = []
    const featureValues = menuItems.flatMap(item => item.featureValues.flatMap(value => value))
    const promises = []
    for (const feature of selectedFeatures) {
      const featureValue = featureValues.find(f => f.id === feature)
      if (featureValue) newChipItems.push(featureValue)
      else promises.push(readFeatureValues(feature))
    }
    if (promises.length) {
      const res = await Promise.all(promises)
      const results = res.flatMap(r => (r?.status === 200 && r?.data?.[0]?.id ? r.data[0] : []))
      newChipItems.push(...results)
    }
    if (newChipItems.length) setChipItems(newChipItems)
  }

  useEffect(() => {
    if (selectedFeatures.length) buildChipItems()
    else setChipItems([])
  }, [selectedFeatures])

  return (
    chipItems?.length
      ? (
        <SelectedFilters direction='column' spacing={1}>
          <Typography variant='body2'>
            Filtros selecionados
          </Typography>
          <ChipsContainer direction='row' spacing={1}>
            {chipItems.map(feature => (
              <Chip
                key={feature.id}
                icon={(
                  <CustomLink to={generateRemovalLink(feature.id)}>
                    <Close />
                  </CustomLink>
                )}
                label={feature.name}
                size='small'
              />
            ))}
          </ChipsContainer>
        </SelectedFilters>
      )
      : null
  )
}

export default SidebarSelectedFeatures
