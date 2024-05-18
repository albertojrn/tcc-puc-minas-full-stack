const express = require('express')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')

const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    db.query('SELECT * FROM products', (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    const id = req.params.id
    db.query('SELECT * FROM products WHERE id = ?', id, (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.post('/', (req, res, next) => {
  try {
    const title = req.body.title
    const description = req.body.description
    const depth = req.body.depth
    const sku = req.body.sku
    const width = req.body.width
    const height = req.body.height
    const variations = req.body.variations
    const selectedFeatures = req.body.selectedFeatures
    const images = req.body.images

    const query = `
      INSERT INTO products (title, description, depth, sku, width, height) VALUES ("${title}","${description}",${depth},"${sku}",${width},${height});
      SELECT LAST_INSERT_ID() INTO @productId;
      ${variations?.length && `
        INSERT INTO products_variations (product_id, size_id, quantity, price, primary_color_id, secondary_color_id) 
        VALUES ${variations.map(variation => `(@productId, ${variation.size}, ${variation.quantity}, ${variation.price}, ${variation.primaryColor}, ${variation.secondaryColor})`).join(', ')}
      `};
      ${selectedFeatures?.length && `
        INSERT INTO products_features_values (product_id, feature_values_id) 
        VALUES ${selectedFeatures.map(id => `(@productId, ${id})`).join(', ')}
      `};
      ${images?.length && `
        INSERT INTO products_images (product_id, path) 
        VALUES ${images.map(imgPath => `(@productId, "${imgPath}")`).join(', ')}
      `};
    `

    db.query(
      query,
      (err, result) => {
        if (err) return sqlErrorHandler(err, req, res, next)
        responseHandler(req, res, { ...req.body, id: result.insertId, resourceUrl: `${req.baseUrl}/${result[0].insertId}` }, 201)
      }
    )
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.put('/:id', (req, res, next) => {
  try {
    const id = req.params.id
    const name = req.body.name
    const is_multiple = req.body.is_multiple
    if (!id || (name === undefined && is_multiple === undefined)) {
      return errorHandler({ status: 400, message: 'Bad request.' }, req, res, next)
    }
    const propsArray = []
    if (name) propsArray.push(`name = '${name}'`)
    if (is_multiple) propsArray.push(`is_multiple = ${is_multiple}`)
    const setStr = propsArray.join(', ')
    db.query(`UPDATE products SET ${setStr} WHERE id = ?`, id, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, req.body, 200)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.delete('/:id', (req, res, next) => {
  try {
    const id = req.params.id
    db.query('DELETE FROM products WHERE id= ?', id, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, undefined, 204)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
