import React, { useState } from 'react'
import { Button, FormHelperText, InputAdornment, Stack } from '@mui/material'
import { Color, GridItem, MainGridContainer } from '../../../../../../../../styles'
import FormField from '../../../../../../../FormField'
import ProductVariations from './components/ProductVariations'
import ProductFeatures from './components/ProductFeatures'
import { useDashboardContext } from '../../../../../../../../contexts/DashboardContext'
import { validateFields } from '../../../../../../../../utils/formMethods'
import { CONSTRAINTS } from './constants/validationParams'
import { uploadFiles } from '../../../../../../../../utils/file'
import { createProducts } from '../../../../../../../../services/api/products'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import SQL_ERROR_STATUS_DICT from '../../../../../../../../constants/sqlErrorStatusDict'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'

function ProductFormFields({ selectedImages }) {
  const [error, setError] = useState({})
  const [errorCreate, setErrorCreate] = useState(false)
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [sku, setSku] = useState('')
  const [depth, setDepth] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [variations, setVariations] = useState([])
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const { setDashboardParams } = useDashboardContext()
  const { products, setDashboardData } = useDashboardDataContext()
  const { setLoading } = useLoadingContext()
  if (variations.length && error.variations) setError(prev => ({ ...prev, variations: '' }))

  async function handleCreateProduct() {
    const validation = validateFields({ title, description, depth, width, height }, CONSTRAINTS)
    const validationError = { ...validation.error }
    if (!variations.length) validationError.variations = 'Você deve informar pelo menos uma variação do produto.'
    setError(validationError)
    if (!Object.keys(validationError).length) {
      setLoading({ show: true })
      const input = {
        title,
        description,
        depth,
        sku: sku || null,
        width,
        height,
        variations,
        selectedFeatures,
        images: [],
      }
      const filesList = selectedImages.map(img => img.file)
      const uploadRes = await uploadFiles(filesList)
      if (uploadRes.status === 200) input.images = uploadRes.data.files.map(file => file.path)
      if (input.images.length !== filesList.length) {
        setLoading({ show: false })
        return setError({ images: 'Ocorreu um erro ao enviar as imagens. Tente novamente.' })
      }
      console.log({input})
      const createProductRes = await createProducts(input)
      console.log({createProductRes})
      if (createProductRes.status === 201) {
        setDashboardData({ products: [...products, createProductRes.data] })
        setDashboardParams({ openModal: false })
      }
      // else if (res.status === 200) {
      //   const newFeatures = structuredClone(features)
      //   for (const f of newFeatures) {
      //     if (f.id === feature.id) {
      //       if (res.data.name) f.name = res.data.name
      //       if (res.data.is_multiple) f.is_multiple = res.data.is_multiple
      //     }
      //   }
      //   setDashboardData({ features: newFeatures })
      //   setDashboardParams({ openDialog: false })
      // }
      else if (createProductRes?.response?.data?.error) {
        const errorStatus = createProductRes.response.data.error.status
        const errorMessage = SQL_ERROR_STATUS_DICT[errorStatus]
        if (errorMessage) setErrorCreate(errorMessage)
        else setErrorCreate(`Não foi possível ${true ? 'editar' : 'criar'} o produto. Tente novamente`)
      }
      setLoading({ show: false })
    }
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
          inputProps={{ maxLength: 1000 }}
          label='Descrição'
          required
          multiline
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
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{ min: 0 }}
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
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{ min: 0 }}
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
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{ min: 0 }}
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
        {error.variations && <FormHelperText><Color color='red'>{error.variations}</Color></FormHelperText>}
      </GridItem>
      <GridItem item xs={12}>
        <ProductFeatures selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} />
      </GridItem>
      <GridItem item xs={12}>
        <Stack direction='row' spacing={2} alignItems='center' justifyContent='end'>
          <Button color='standard' onClick={() => setDashboardParams({ openModal: false })}>Cancelar</Button>
          <Button color='standard' onClick={handleCreateProduct}>Ok</Button>
          {error.images && <FormHelperText><Color color='red'>{error.images}</Color></FormHelperText>}
          {errorCreate && <FormHelperText><Color color='red'>{errorCreate}</Color></FormHelperText>}
        </Stack>
      </GridItem>
    </MainGridContainer>
  )
}

export default ProductFormFields
