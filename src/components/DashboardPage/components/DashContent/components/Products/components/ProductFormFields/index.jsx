import React, { useState } from 'react'
import { Button, InputAdornment, Stack } from '@mui/material'
import { GridItem, MainGridContainer } from '../../../../../../../../styles'
import FormField from '../../../../../../../FormField'
import ProductVariations from './components/ProductVariations'
import ProductFeatures from './components/ProductFeatures'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'

function ProductFormFields( { selectedImages }) {
  const [error, setError] = useState({})
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [sku, setSku] = useState('')
  const [depth, setDepth] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [variations, setVariations] = useState([])
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const { setDashboardParams } = useDashboardContext()

  function handleCreateProduct() {

  }

  return (
    <MainGridContainer container spacing={2}>
      <GridItem item xs={12}>
        <FormField
          error={error}
          field='title'
          fullWidth
          label='Título'
          required
          setError={setError}
          setField={setTitle}
          value={title}
        />
      </GridItem>
      <GridItem item xs={12}>
        <FormField
          error={error}
          field='description'
          fullWidth
          inputProps={{ maxLength: 2000 }}
          label='Descrição'
          multiline
          required
          rows={4}
          setError={setError}
          setField={setDescription}
          value={description}
        />
      </GridItem>
      <GridItem item xs={12} md={3}>
        <FormField
          error={error}
          field='sku'
          fullWidth
          label='SKU'
          onlyNumbers
          required
          setError={setError}
          setField={setSku}
          value={sku}
        />
      </GridItem>
      <GridItem item xs={12} md={3}>
        <FormField
          InputProps={{
            endAdornment: <InputAdornment position='end'>cm</InputAdornment>,
          }}
          error={error}
          field='width'
          fullWidth
          label='Comprimento'
          required
          setError={setError}
          setField={setWidth}
          value={width}
          type='number'
        />
      </GridItem>
      <GridItem item xs={12} md={3}>
        <FormField
          InputProps={{
            endAdornment: <InputAdornment position='end'>cm</InputAdornment>,
          }}
          error={error}
          field='depth'
          fullWidth
          label='Largura'
          required
          setError={setError}
          setField={setDepth}
          value={depth}
          type='number'
        />
      </GridItem>
      <GridItem item xs={12} md={3}>
        <FormField
          InputProps={{
            endAdornment: <InputAdornment position='end'>cm</InputAdornment>,
          }}
          error={error}
          field='height'
          fullWidth
          label='Altura'
          required
          setError={setError}
          setField={setHeight}
          value={height}
          type='number'
        />
      </GridItem>
      <GridItem item xs={12}>
        <ProductVariations variations={variations} setVariations={setVariations} />
      </GridItem>
      <GridItem item xs={12}>
        <ProductFeatures selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} />
      </GridItem>
      <GridItem item xs={12}>
        <Stack direction='row' spacing={2} alignItems='center' justifyContent='end'>
          <Button color='standard' onClick={() => setDashboardParams({ openModal: false })}>Cancelar</Button>
          <Button color='standard' onClick={handleCreateProduct}>Ok</Button>
        </Stack>
      </GridItem>
    </MainGridContainer>
  )
}

export default ProductFormFields
