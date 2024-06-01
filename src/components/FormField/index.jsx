import React from 'react'
import formatStringByPattern from 'format-string-by-pattern'
import { FormTextField } from '../../styles'
import { handleOnUserTyping } from '../../utils/formMethods'

function FormField({
  autoComplete,
  autoFocus = false,
  disabled = false,
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
  onBlurNum,
  onKeyDown,
  padding,
  pattern,
  placeholder,
  preventTyping = false,
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
  function handleOnBlurNum(e) {
    const newValue = Number(e.target.value)
    if (!isNaN(newValue) && newValue < onBlurNum) {
      handleOnUserTyping(field, setField, onBlurNum, setError)
    }
  }
  function handleOnKeyDown(e) {
    if (preventTyping) return e.preventDefault()
    if (typeof onKeyDown === 'function') onKeyDown(e)
  }

  return (
    <FormTextField
      InputLabelProps={keepLabelOnTop ? { shrink: true } : {}}
      {...otherProps}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      color='info'
      disabled={disabled}
      error={Boolean(error?.[field])}
      fullWidth={fullWidth}
      helperText={error?.[field] ?? helperText ?? ''}
      helperTextColor={error?.[field] ? 'red' : 'black'}
      label={label}
      multiline={multiline}
      onBlur={onBlurNum ? handleOnBlurNum : undefined}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      padding={padding}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
  )
}

export default FormField
