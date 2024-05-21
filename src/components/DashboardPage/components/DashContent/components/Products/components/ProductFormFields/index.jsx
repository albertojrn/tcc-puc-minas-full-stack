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
import { createProducts, readProducts, updateProducts } from '../../../../../../../../services/api/products'
import { useDashboardDataContext } from '../../../../../../../../contexts/DashboardDataContext'
import SQL_ERROR_STATUS_DICT from '../../../../../../../../constants/sqlErrorStatusDict'
import { useLoadingContext } from '../../../../../../../../contexts/LoadingContext'
import { deleteProductImages } from '../../../../../../../../services/api/productImages'
import { deleteProductFeatures } from '../../../../../../../../services/api/productFeatures'
import { deleteProductVariations } from '../../../../../../../../services/api/productVariations'
import DialogRetry from '../../../../../../../DialogRetry'
import DialogOk from '../../../../../../../DialogOk'

function ProductFormFields({ product, selectedImages }) {
  const isUpdate = product !== undefined
  const [error, setError] = useState({})
  const [description, setDescription] = useState(product?.description ?? '')
  const [title, setTitle] = useState(product?.title ?? '')
  const [sku, setSku] = useState(product?.sku ?? '')
  const [depth, setDepth] = useState(product?.depth ?? 0)
  const [width, setWidth] = useState(product?.width ?? 0)
  const [height, setHeight] = useState(product?.height ?? 0)
  const [variations, setVariations] = useState(product?.variations ?? [])
  const [selectedFeatures, setSelectedFeatures] = useState(product?.selectedFeatures ?? [])
  const { openDialog, productsPage, setDashboardParams } = useDashboardContext()
  const { products, setDashboardData } = useDashboardDataContext()
  const { setLoading } = useLoadingContext()
  if (variations.length && error.variations) setError(prev => ({ ...prev, variations: '' }))

  async function handleCreateProduct() {
    if (openDialog) setDashboardParams({ openDialog: false })
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
        sku,
        width,
        height,
        variations,
        selectedFeatures,
        images: [],
      }
      const imagesToAdd = []
      const imagesToRemove = []
      const variationsToAdd = []
      const variationsToRemove = []
      const featuresToAdd = []
      const featuresToRemove = []
      for (const img of selectedImages) {
        if (img.file) imagesToAdd.push(img.file)
      }
      if (isUpdate) {
        if (title === product.title) delete input.title
        if (description === product.description) delete input.description
        if (depth === product.depth) delete input.depth
        if (sku === product.sku) delete input.sku
        if (width === product.width) delete input.width
        if (height === product.height) delete input.height
        const savedImages = selectedImages.filter(img => img && typeof img === 'string')
        for (const img of product.images) {
          if (!savedImages.includes(img)) imagesToRemove.push(img)
        }
        for (const v of product.variations) {
          if (!variations.find(
            item => item.primaryColor === v.primaryColor
            && (item.secondaryColor || null) === (v.secondaryColor || null)
            && item.size === v.size
            && item.quantity === v.quantity
            && item.price === v.price
          )) variationsToRemove.push(v)
        }
        for (const v of variations) {
          if (!product.variations.find(
            item => item.primaryColor === v.primaryColor
            && (item.secondaryColor || null) === (v.secondaryColor || null)
            && item.size === v.size
            && item.quantity === v.quantity
            && item.price === v.price
          )) variationsToAdd.push(v)
        }
        for (const f of product.selectedFeatures) {
          if (!selectedFeatures.includes(f)) featuresToRemove.push(f)
        }
        for (const f of selectedFeatures) {
          if (!product.selectedFeatures.includes(f)) featuresToAdd.push(f)
        }
        input.variations = variationsToAdd
        input.selectedFeatures = featuresToAdd
      }
      const preSavingPromises = []
      preSavingPromises.push(imagesToAdd.length ? uploadFiles(imagesToAdd) : undefined)
      if (isUpdate) {
        preSavingPromises
          .push(imagesToRemove.length
            ? imagesToRemove.map(item => deleteProductImages(product.id, item))
            : [])
        preSavingPromises
          .push(featuresToRemove.length
            ? featuresToRemove.map(item => deleteProductFeatures(product.id, item))
            : [])
        preSavingPromises
          .push(variationsToRemove.length
            ? variationsToRemove.map(item => deleteProductVariations(product.id, item.primary_color_id, item.secondary_color_id, item.size_id))
            : [])
      }
      const [uploadImagesRes, deleteImagesRes, deleteFeaturesRes, deleteVariationsRes] = await Promise.allSettled(preSavingPromises)
      if (uploadImagesRes?.value?.status === 200) {
        input.images = uploadImagesRes?.value?.data.files.map(file => file.filename)
        if (input.images.length !== imagesToAdd.length) {
          setLoading({ show: false })
          return setDashboardParams({
            dialogChild: (
              <DialogRetry
                title='Erro'
                text='Ocorreu um erro ao enviar as imagens.'
                onRetry={handleCreateProduct}
              />
            ),
            openDialog: true
          })
        }
      }
      if (isUpdate) {
        if ((deleteImagesRes?.length && deleteImagesRes.some(res => res?.value?.status !== 204))
            || (deleteFeaturesRes?.length && deleteFeaturesRes.some(res => res?.value?.status !== 204))
            || (deleteVariationsRes?.length && deleteVariationsRes.some(res => res?.value?.status !== 204))) {
          setLoading({ show: false })
          return setDashboardParams({
            dialogChild: (
              <DialogRetry
                title='Erro'
                text='Ocorreu um erro ao excluir os parâmetros removidos.'
                onRetry={handleCreateProduct}
              />
            ),
            openDialog: true
          })
        }
      }
      if (
        isUpdate
        && product.name === input.name
        && product.description === input.description
        && (product.sku || null) === (input.sku || null)
        && product.depth === input.depth
        && product.width === input.width
        && product.height === input.height
        && !imagesToAdd.length
        && !variationsToAdd.length
        && !featuresToAdd.length
      ) {
        setLoading({ show: false })
        return setDashboardParams({ openModal: false })
      }
      const res = (
        isUpdate
          ? await updateProducts(product.id, input)
          : await createProducts(input)
      )
      if (res.status === 201 && res.data) {
        const newProducts = { ...products }
        newProducts[productsPage] = [...newProducts[productsPage], res.data]
        setDashboardData({ products: newProducts })
        setDashboardParams({ openModal: false })
      }
      else if (res.status === 200 && res.data) {
        const newProducts = { ...products }
        let newProductsPage = structuredClone(newProducts[productsPage])
        let currentP
        for (const p of newProductsPage) {
          if (p.id === product.id) {
            currentP = p
            break
          }
        }
        const index = newProductsPage.indexOf(currentP)
        const newP = await readProducts(product.id).then(response => response.data?.[0])
        if (newP) {
          newProductsPage = [
            ...newProductsPage.slice(0, index),
            newP,
            ...newProductsPage.slice(index + 1)
          ]
          newProducts[productsPage] = newProductsPage
          setDashboardData({ products: newProducts })
          setDashboardParams({ openModal: false })
        }
        else {
          setLoading({ show: false })
          return (
            setDashboardParams({
              dialogChild: (
                <DialogOk
                  title='Erro'
                  text='O produto foi editado mas houve um erro ao tentar atualizar a lista.'
                />
              ),
              openDialog: true
            })
          )
        }
      }
      else if (res?.response?.data?.error) {
        const errorStatus = res.response.data.error.status
        const errorMessage = SQL_ERROR_STATUS_DICT[errorStatus]
        setDashboardParams({
          dialogChild: (
            <DialogRetry
              title='Erro'
              text={errorMessage ?? `Não foi possível ${isUpdate ? 'editar' : 'criar'} o produto.`}
              onRetry={handleCreateProduct}
            />
          ),
          openDialog: true
        })
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
        </Stack>
      </GridItem>
    </MainGridContainer>
  )
}

export default ProductFormFields
