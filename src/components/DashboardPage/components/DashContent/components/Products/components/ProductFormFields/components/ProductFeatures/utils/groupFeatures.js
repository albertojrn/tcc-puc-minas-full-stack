function groupFeatures(featureValues, selectedFeatures) {
  const groupedFeatures = []
  for (const id of selectedFeatures) {
    let feature_id
    const featuresIds = Object.keys(featureValues)
    for (const featureId of featuresIds) {
      const featureGroup = featureValues[featureId]
      const featureValue = featureGroup.find(item => item.id === id)
      if (featureValue) {
        feature_id = featureValue.feature_id
        break
      }
    }
    if (feature_id) {
      let group = groupedFeatures.find(item => item.featureId === feature_id)
      if (!group) {
        const index = groupedFeatures.push({ featureId: feature_id, featureValuesIds: [] }) - 1
        group = groupedFeatures[index]
      }
      group.featureValuesIds.push(id)
    }
  }
  return groupedFeatures
}

export default groupFeatures
