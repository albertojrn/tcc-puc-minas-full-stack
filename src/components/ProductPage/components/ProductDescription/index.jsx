import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { MAX_DESCRIPTION_LENGTH } from '../ProductDetails/constants/params'
import { DescriptionContainer } from './styles'

function ProductDescription({ description = '' }) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  return (
    <DescriptionContainer direction='column'>
      <Typography align='justify'>
        {
          (description.length < MAX_DESCRIPTION_LENGTH || showFullDescription)
            ? description
            : `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
        }
      </Typography>
      <Button
        color='standard'
        size='small'
        onClick={() => setShowFullDescription(prev => !prev)}
      >
        {showFullDescription ? 'Mostrar Menos' : 'Mostrar Mais'}
      </Button>
    </DescriptionContainer>
  )
}

export default ProductDescription
