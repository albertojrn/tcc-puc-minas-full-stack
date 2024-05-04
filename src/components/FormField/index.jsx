import React from 'react'
import formatStringByPattern from 'format-string-by-pattern'
import { FormTextField } from '../../styles'
import { handleOnUserTyping } from '../../utils/formMethods'

function FormField({
  autoComplete,
  error,
  field,
  fullWidth = false,
  keepLabelOnTop = false,
  inputProps,
  InputProps,
  label,
  onlyNumbers,
  pattern,
  placeholder,
  required = false,
  setError,
  setField,
  type = 'text',
  value,
}) {
  const iProps = {
    inputProps,
    InputProps
  }

  function handleOnChange(e) {
    let newValue = e.target.value
    if (onlyNumbers) newValue = newValue.replace(/[^0-9]/g, '')
    if (pattern) newValue = formatStringByPattern(pattern, newValue)
    handleOnUserTyping(field, setField, newValue, setError)
  }
  return (
    <FormTextField
      InputLabelProps={keepLabelOnTop ? { shrink: true } : {}}
      {...iProps}
      autoComplete={autoComplete}
      color='info'
      error={Boolean(error?.[field])}
      fullWidth={fullWidth}
      helperText={error?.[field] ?? ''}
      label={label}
      onChange={handleOnChange}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
  )
}

export default FormField
