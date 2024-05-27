import { loadFeaturesValuesById } from '../../../utils/featureValues'
import { getProductsInfo } from '../../../utils/products'

export async function fetchCartProductsInfo(setLoading, cart, setFeaturesValues, setCartProductsInfo) {
  setLoading(true)
  const newProductsInfo = {}
  let newFeaturesValues = []
  const promises = []
  let featuresValIds = []
  const productsIds = Array.from(new Set(cart.map(item => item.product_id)))
  for (const id of productsIds) {
    promises.push(getProductsInfo(id))
  }
  for (const cartItem of cart) {
    featuresValIds.push(cartItem.size_id, cartItem.primary_color_id, cartItem.secondary_color_id)
  }
  featuresValIds = Array.from(new Set(featuresValIds))
  promises.push(loadFeaturesValuesById(featuresValIds))
  if (promises.length) {
    const res = await Promise.allSettled(promises)
    for (const [i, id] of productsIds.entries()) {
      let productInfo = {}
      if (res[i]?.value?.id) productInfo = res[i].value
      newProductsInfo[id] = productInfo
    }
    const featuresRes = res[res.length - 1]?.value
    if (Array.isArray(featuresRes?.data) && featuresRes.data.length) {
      newFeaturesValues = featuresRes.data
    }
    setFeaturesValues(newFeaturesValues)
    setCartProductsInfo(newProductsInfo)
  }
  setLoading(false)
}
