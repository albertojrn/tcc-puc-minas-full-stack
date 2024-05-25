import React from 'react'
import formatStringByPattern from 'format-string-by-pattern'
import { FormTextField } from '../../styles'
import { handleOnUserTyping } from '../../utils/formMethods'

function FormField({
  autoComplete,
  autoFocus = false,
  error,
  field,
  fullWidth = false,
  helperText,
  keepLabelOnTop = false,
  inputProps,
  InputProps,
  label,
  multiline = false,
  onlyNumbers,
  pattern,
  placeholder,
  required = false,
  rows,
  setError,
  setField,
  type = 'text',
  value,
}) {
  const otherProps = {
    inputProps,
    InputProps
  }
  if (rows) otherProps.rows = rows

  function handleOnChange(e) {
    let newValue = e.target.value
    if (onlyNumbers) newValue = newValue.replace(/[^0-9]/g, '')
    if (pattern) newValue = formatStringByPattern(pattern, newValue)
    if (type === 'number' && newValue) newValue = Number(newValue)
    handleOnUserTyping(field, setField, newValue, setError)
  }
  return (
    <FormTextField
      InputLabelProps={keepLabelOnTop ? { shrink: true } : {}}
      {...otherProps}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      color='info'
      error={Boolean(error?.[field])}
      fullWidth={fullWidth}
      helperText={error?.[field] ?? helperText ?? ''}
      helperTextColor={error?.[field] ? 'red' : 'black'}
      label={label}
      multiline={multiline}
      onChange={handleOnChange}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
  )
}

export default FormField
