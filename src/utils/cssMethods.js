export function formatCssProp(prop, value, theme) {
  let valueString = ''
  if (value && typeof value === 'object') {
    theme.breakpoints.keys.map(key => {
      if (value[key]) {
        valueString = valueString.concat(`${theme.breakpoints.up(key)} { ${prop}: ${value[key]}; }`)
      }
    })
  }
  else valueString = valueString.concat(`${prop}: ${value};`)
  return valueString
}
