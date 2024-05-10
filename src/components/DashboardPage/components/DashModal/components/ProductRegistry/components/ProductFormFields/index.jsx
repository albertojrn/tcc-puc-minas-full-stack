import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NumericFormat } from 'react-number-format'
import { GridItem, MainGridContainer } from '../../../../../../../../styles'
import FormField from '../../../../../../../FormField'

function ProductFormFields() {
  const [error, setError] = useState({})
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState('')


  return (
    <GridItem item xs={12} md={7}>
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
            rows={6}
            setError={setError}
            setField={setDescription}
            value={description}
          />
        </GridItem>
        <GridItem item xs={3}>
          <FormField
            error={error}
            field='quantity'
            fullWidth
            label='Qtd'
            required
            setError={setError}
            setField={setQuantity}
            value={quantity}
            type='number'
          />
        </GridItem>
        <GridItem item xs={3}>
          <FormField
            InputProps={{
              inputComponent: NumericFormatCustom,
            }}
            error={error}
            field='price'
            fullWidth
            label='Preço'
            placeholder='R$ 0,00'
            required
            setError={setError}
            setField={setPrice}
            type='text'
            value={price}
          />
        </GridItem>
      </MainGridContainer>
    </GridItem>
  )
}

const NumericFormatCustom = React.forwardRef(
  (props, ref) => {
    const { onChange, ...other } = props

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          })
        }}
        valueIsNumericString
        decimalScale={2}
        decimalSeparator=','
        fixedDecimalScale
        prefix="R$ "
      />
    )
  },
)

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default ProductFormFields
