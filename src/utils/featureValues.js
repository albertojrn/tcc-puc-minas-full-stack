import { readFeatureValues } from '../services/api/featureValues'

function buildFeatureVals(resData) {
  const res = {}
  for (const entry of resData) {
    if (!res[entry.feature_id]) res[entry.feature_id] = []
    res[entry.feature_id].push(entry)
  }
  return res
}

export async function loadFeatureValues(featureValues, setDashboardData, setError) {
  const featureValuesLength = Object.keys(featureValues).length
  if (!featureValuesLength) {
    const res = await readFeatureValues()
    if (res.status === 200 && res.data.length) {
      const newFeatureValues = buildFeatureVals(res.data)
      setDashboardData({ featureValues: newFeatureValues })
      if (setError) setError('')
    }
    else if (setError) setError('Tivemos um problema.')
  }
}
