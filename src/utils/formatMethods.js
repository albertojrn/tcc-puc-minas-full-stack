export function formatPrice(price) {
  if (typeof price === 'number' && !isNaN(price)) {
    return `R$ ${price.toFixed(2).replace('.', ',')}`
  }
  return ''
}
