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

export async function loadFeaturesValuesById(features) {
  const res = { status: 200, data: [] }
  const promises = features.map(id => readFeatureValues(id))
  const resAll = await Promise.allSettled(promises)
  for (const response of resAll) {
    if (response?.value?.status === 200
        && Array.isArray(response?.value?.data)
        && response.value.data.length) {
      res.data = [...res.data, ...response.value.data]
    }
  }
  if (res.data.length !== promises.length) {
    res.status = 500
    res.error = { message: 'Não foi possível baixar todos os valores.' }
  }
  return res
}
