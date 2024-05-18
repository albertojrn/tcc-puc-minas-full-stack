import { readFeatures } from '../services/api/features'

export async function loadFeatures(features, setLoading, setDashboardData, setError) {
  if (!features.length) {
    setLoading({ show: true })
    const res = await readFeatures()
    if (res.status === 200 && res.data.length) {
      setDashboardData({ features: res.data })
      if (setError) setError('')
    }
    else if (setError) setError('Tivemos um problema.')
    setLoading({ show: false })
  }
}
