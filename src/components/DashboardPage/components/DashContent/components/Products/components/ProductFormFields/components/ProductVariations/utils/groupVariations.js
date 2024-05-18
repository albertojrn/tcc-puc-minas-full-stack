function groupVariations(variations) {
  const groupedVariations = []
  for (const variation of variations) {
    let currentVar = groupedVariations
      .find(item => item.primaryColor === variation.primaryColor && item.secondaryColor === variation.secondaryColor)
    if (!currentVar) {
      const index = groupedVariations.push({ primaryColor: variation.primaryColor, secondaryColor: variation.secondaryColor, sizes: [] }) - 1
      currentVar = groupedVariations[index]
    }
    currentVar.sizes.push({
      size: variation.size,
      quantity: variation.quantity,
      price: variation.price
    })
  }
  return groupedVariations
}

export default groupVariations
