import { ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import ProductVariationsToolbox from '../ProductVariationsToolbox'
import features from '../../../../../../../../../../mock/features.json'
import features_values from '../../../../../../../../../../mock/features_values.json'

function VariationItem({ index, setVariations, variation }) {
  const colorId = features.find(item => item.name === 'cor').id
  const colorsValues = features_values.filter(item => item.feature_id === colorId)
  const sizesId = features.find(item => item.name === 'tamanho').id
  const sizesValues = features_values.filter(item => item.feature_id === sizesId)

  return (
    <ListItem
      secondaryAction={<ProductVariationsToolbox index={index} setVariations={setVariations} />}
    >
      <ListItemText
        primary={`Cor primária: ${colorsValues.find(c => c.id === variation.primaryColor).name}`}
        secondary={(
          <>
            <Typography
              variant='body2'
            >
              Cor secundária:
              &nbsp;
              {`${variation.secondaryColor ? colorsValues.find(c => c.id === variation.secondaryColor).name : '-'}`}
            </Typography>
            <Typography
              variant='body2'
            >
              Tamanhos:
            </Typography>
            {variation.sizes.map(size => (
              <Typography
                key={size.id}
                variant='body2'
              >
                {`${sizesValues.find(s => s.id === size.size).name}, qtd: ${size.quantity}, preço: R$ ${size.price}`}
              </Typography>
            ))}
          </>
          )}
      />
    </ListItem>
  )
}

export default VariationItem
