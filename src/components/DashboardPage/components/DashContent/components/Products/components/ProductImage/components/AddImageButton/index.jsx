import React, { useRef, useState } from 'react'
import { Button } from '@mui/material'
import { FileInput } from './styles'
import { imgFileToDataUrl } from '../../../../../../../../../../utils/imageMethods'

function AddImageButton({ selectedImages, setSelectedImages }) {
  const [loadingImages, setLoadingImages] = useState(false)
  const fileBtn = useRef(null)

  async function handleFileSelectChange(e) {
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
    fileBtn.current.value = ''
    setLoadingImages(false)
  }

  return (
    <>
      <Button
        disabled={loadingImages}
        onClick={() => fileBtn.current.click()}
        variant='contained'
      >
        {loadingImages ? 'Aguarde...' : 'Adicionar Imagem'}
      </Button>
      <FileInput
        ref={fileBtn}
        type='file'
        accept='image/png, image/jpeg'
        multiple
        onChange={handleFileSelectChange}
      />
    </>
  )
}

export default AddImageButton
