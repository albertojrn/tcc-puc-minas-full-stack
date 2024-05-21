import { ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import ProductVariationsToolbox from '../ProductVariationsToolbox'
import { useDashboardDataContext } from '../../../../../../../../../../contexts/DashboardDataContext'

function VariationItem({ setVariations, groupedVariation }) {
  const { features, featureValues } = useDashboardDataContext()
  const colorId = features.find(item => item.name === 'cor').id
  const colorsValues = featureValues[colorId].filter(item => item.feature_id === colorId)
  const sizesId = features.find(item => item.name === 'tamanho').id
  const sizesValues = featureValues[sizesId].filter(item => item.feature_id === sizesId)

  return (
    <ListItem
      secondaryAction={<ProductVariationsToolbox groupedVariation={groupedVariation} setVariations={setVariations} />}
    >
      <ListItemText
        primary={`Cor primária: ${colorsValues.find(c => c.id === groupedVariation.primaryColor).name}`}
        secondary={(
          <>
            <Typography
              component='span'
              variant='body2'
            >
              Cor secundária:
              &nbsp;
              {`${groupedVariation.secondaryColor ? colorsValues.find(c => c.id === groupedVariation.secondaryColor).name : '-'}`}
            </Typography>
            <br />
            <Typography
              component='span'
              variant='body2'
            >
              Tamanhos:
            </Typography>
            <br />
            {groupedVariation.sizes.map(size => (
              <React.Fragment key={size.size}>
                <Typography
                  component='span'
                  key={size.size}
                  variant='body2'
                >
                  {`${sizesValues.find(s => s.id === size.size).name}, qtd: ${size.quantity}, preço: R$ ${size.price}`}
                </Typography>
                <br />
              </React.Fragment>
            ))}
          </>
          )}
      />
    </ListItem>
  )
}

export default VariationItem
