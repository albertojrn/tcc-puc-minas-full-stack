import { deleteProductImages } from '../services/api/productImages'

export function deleteImages(imageList, product_id, token) {
  if (imageList.length && product_id) {
    const deletePromises = []
    for (const imgName of imageList) {
      deletePromises.push(deleteProductImages(product_id, imgName, token))
    }
    Promise.allSettled(deletePromises)
  }
}
