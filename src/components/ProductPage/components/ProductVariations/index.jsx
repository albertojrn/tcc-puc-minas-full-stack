import React, { useEffect, useRef, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { loadFeaturesValuesById } from '../../../../utils/featureValues'
import { ColorChip } from './styles'

function ProductVariations({ setSelectedVariation, variations }) {
  const [colorsSet, setColorsSet] = useState([])
  const [selectedColorSetIndex, setSelectedColorSetIndex] = useState(0)
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null)
  const colors = useRef()
  const sizes = useRef()

  function onColorSelection(i) {
    if (i === selectedColorSetIndex) return
    setSelectedColorSetIndex(i)
    setSelectedSizeIndex(null)
    setSelectedVariation(null)
  }

  function onSizeSelection(i) {
    if (i === selectedSizeIndex) return
    setSelectedSizeIndex(i)
    const primaryColor = colorsSet[selectedColorSetIndex].primaryColor
    const secondaryColor = colorsSet[selectedColorSetIndex].secondaryColor
    const size = colorsSet[selectedColorSetIndex].sizes[i]
    const variation = variations
      .find(item => (
        item.primaryColor === primaryColor
        && item.secondaryColor === secondaryColor
        && item.size === size
      ))
    setSelectedVariation(variation)
  }

  function getColorName(id) {
    return colors.current.find(item => item.id === id).name
  }

  function getSizeName(id) {
    return sizes.current.find(item => item.id === id).name
  }

  async function fetchParams() {
    const colorsIds = Array.from(new Set(variations
      .flatMap(item => (item.secondaryColor
        ? [item.primaryColor, item.secondaryColor]
        : item.primaryColor))))
    const sizesIds = Array.from(new Set(variations.map(item => item.size)))
    const resColors = await loadFeaturesValuesById(colorsIds)
    const resSizes = await loadFeaturesValuesById(sizesIds)
    if (resColors.status === 200 && resColors.data.length) colors.current = resColors.data
    if (resSizes.status === 200 && resSizes.data.length) sizes.current = resSizes.data
    if (colors.current && sizes.current) {
      const newColorSet = []
      for (const variation of variations) {
        let item = newColorSet.find(cs => cs.primaryColor === variation.primaryColor && cs.secondaryColor === variation.secondaryColor)
        if (!item) {
          const newIndex = newColorSet.push({ primaryColor: variation.primaryColor, secondaryColor: variation.secondaryColor, sizes: [] }) - 1
          item = newColorSet[newIndex]
        }
        item.sizes.push(variation.size)
      }
      if (newColorSet.length) setColorsSet(newColorSet)
    }
  }

  useEffect(() => {
    fetchParams()
  }, [])

  return (
    <Stack direction='column' spacing={2}>
      <Typography variant='h6'>
        Selecine uma cor:
      </Typography>
      <Stack direction='row' spacing={1} flexWrap='wrap'>
        {!!colorsSet?.length
        && (colorsSet.map((color, i) => (
          <ColorChip
            className={`${i === selectedColorSetIndex ? 'selected' : ''}`}
            key={`${color.primaryColor}${color.secondaryColor}`}
            onClick={() => onColorSelection(i)}
          >
            {`${getColorName(color.primaryColor)}${color.secondaryColor ? ` / ${getColorName(color.secondaryColor)}` : ''}`}
          </ColorChip>
        )))}
      </Stack>
      <Typography variant='h6'>
        Selecine um tamanho:
      </Typography>
      <Stack direction='row' spacing={1} flexWrap='wrap'>
        {colorsSet?.[selectedColorSetIndex]?.sizes?.map((size, i) => (
          <ColorChip
            isSize
            className={`${i === selectedSizeIndex ? 'selected' : ''}`}
            key={size}
            onClick={() => onSizeSelection(i)}
          >
            {getSizeName(size)}
          </ColorChip>
        ))}
      </Stack>
    </Stack>
  )
}

export default ProductVariations
