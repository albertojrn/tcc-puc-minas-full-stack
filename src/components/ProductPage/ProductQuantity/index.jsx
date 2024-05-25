import React from 'react'
import FormField from '../../FormField'

function ProductQuantity({ error, selectedQuantity, setSelectedQuantity }) {
  return (
    <FormField
      error={error}
      field='quantity'
      fullWidth
      inputProps={{
        min: 1,
        step: 1,
      }}
      label='Qtd'
      required
      setField={setSelectedQuantity}
      type='number'
      value={selectedQuantity}
    />
  )
}

export default ProductQuantity
