import React, { useState } from 'react'
import { Button } from '@mui/material'
import { FileInput } from './styles'
import { imgFileToDataUrl } from '../../../../utils/imageMethods'

function AddImageButton({ selectedImages, setSelectedImages }) {
  const [loadingImages, setLoadingImages] = useState(false)

  async function handleFileSelectChange(e) {
    e.preventDefault()
    setLoadingImages(true)
    const files = e.target.files
    if (files.length) {
      const promises = []
      for (const file of files) {
        const exists = Boolean(selectedImages.find(img => img.name === file.name))
        if (!exists) {
          const newPromise = new Promise((resolve) => {
            imgFileToDataUrl(file, resolve)
          })
          promises.push(newPromise)
        }
      }
      if (promises.length) {
        const res = await Promise.all(promises)
        setSelectedImages(prev => [...prev, ...res])
      }
    }
    e.target.value = ''
    setLoadingImages(false)
  }

  return (
    <Button
      component='label'
      disabled={loadingImages}
      role={undefined}
      tabIndex={-1}
      variant='contained'
    >
      {loadingImages ? 'Aguarde...' : 'Adicionar Imagem'}
      <FileInput
        type='file'
        accept='image/png, image/jpeg'
        multiple
        onChange={handleFileSelectChange}
        onSubmit={e => { e.preventDefault() }}
      />
    </Button>
  )
}

export default AddImageButton
