import validate from 'validate.js'
import moment from 'moment'

export function handleOnUserTyping(field, setField, value, setError) {
  setError(prev => {
    if (prev[field]) {
      const newError = { ...prev }
      delete newError[field]
      return newError
    }
    return prev
  })
  console.log({value})
  setField(value)
}

export function validateFields(attributes, constraints) {
  validate.extend(validate.validators.datetime, {
    parse: (value) => +moment.utc(value),
    format: (value, options) => {
      const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss'
      return moment.utc(value).format(format)
    }
  })
  const validation = validate(attributes, constraints)
  const newError = {}
  const attrs = Object.keys(attributes)
  for (const attr of attrs) {
    if (Array.isArray(validation?.[attr])) newError[attr] = validation[attr][0]
  }
  const passed = !Object.keys(newError).length
  return { passed, error: newError }
}
