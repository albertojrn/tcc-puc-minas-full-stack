import { deleteProductImages } from '../services/api/productImages'

export function deleteImages(imageList, product_id) {
  if (imageList.length && product_id) {
    const deletePromises = []
    for (const imgName of imageList) {
      deletePromises.push(deleteProductImages(product_id, imgName))
    }
    Promise.allSettled(deletePromises)
  }
}
