import React from 'react'
import { NumericFormat } from 'react-number-format'
import PropTypes from 'prop-types'

const CurrencyField = React.forwardRef(
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
        prefix='R$ '
      />
    )
  },
)

CurrencyField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CurrencyField
