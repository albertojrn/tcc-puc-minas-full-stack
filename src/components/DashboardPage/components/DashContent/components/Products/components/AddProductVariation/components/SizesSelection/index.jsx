import React from 'react'
import { Button, Divider, IconButton } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { GridItem, MainGridContainer } from '../../../../../../../../../../styles'
import SelectFeatureField from '../../../../../../../../../SelectFeatureField'
import FormField from '../../../../../../../../../FormField'
import CurrencyField from '../../../../../../../../../CurrencyField'
import { SIZE_INIT } from '../../constants/params'

function SizesSelection({ error, sizeOptions, sizes, setSizes }) {
  const selectedSizesIds = sizes.map(size => size.size)
  function handleChange(prop, value, index) {
    setSizes(prev => {
      const newSizes = structuredClone(prev)
      const val = value ? Number(value) : value
      newSizes[index][prop] = val
      return newSizes
    })
  }

  function addSize() {
    setSizes(prev => {
      const newSizes = structuredClone(prev)
      const newIndex = newSizes.push(SIZE_INIT) - 1
      newSizes[newIndex].id = newSizes[newIndex - 1].id + 1
      return newSizes
    })
  }

  function deleteSize(i) {
    setSizes(
      prev => (prev.length > 1 ? prev.filter((_, index) => index !== i) : prev)
    )
  }

  return (
    <MainGridContainer container spacing={1} alignItems='center'>
      {sizes.map((size, i) => (
        <React.Fragment key={size.id}>
          <GridItem item xs={12} sm={5}>
            <SelectFeatureField
              disableOptionsIds={selectedSizesIds}
              error={error[`size${i}`]}
              features={sizeOptions}
              label='Tamanho'
              onChange={(val) => handleChange('size', val, i)}
              value={sizes[i].size}
            />
          </GridItem>
          <GridItem item xs={12} sm={3}>
            <FormField
              field='quantity'
              fullWidth
              label='Qtd'
              required
              setField={(value) => handleChange('quantity', value, i)}
              type='number'
              value={sizes[i].quantity}
            />
          </GridItem>
          <GridItem item xs={10} sm={3}>
            <FormField
              InputProps={{
                name: 'currency_field',
                inputComponent: CurrencyField,
              }}
              field='price'
              fullWidth
              label='Preço'
              placeholder='R$ 0,00'
              required
              setField={(value) => handleChange('price', value, i)}
              type='text'
              value={sizes[i].price}
            />
          </GridItem>
          <GridItem item xs={2} sm={1}>
            <IconButton onClick={() => deleteSize(i)}>
              <Delete />
            </IconButton>
          </GridItem>
          <GridItem item xs={12}>
            <Divider />
          </GridItem>
        </React.Fragment>
      ))}
      <GridItem item xs={12}>
        <Button
          color='standard'
          onClick={addSize}
          startIcon={<Add />}
        >
          Tamanho
        </Button>
      </GridItem>
    </MainGridContainer>
  )
}

export default SizesSelection
