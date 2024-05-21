const express = require('express')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')

const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    db.query('SELECT * FROM products_variations', (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.get('/:product_id', (req, res, next) => {
  try {
    const product_id = req.params.product_id
    db.query(`SELECT * FROM products_variations WHERE product_id = ${product_id};`, (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.get('/:product_id/:primary_color_id/:secondary_color_id/:size_id', (req, res, next) => {
  try {
    const product_id = req.params.product_id
    const primary_color_id = req.params.primary_color_id
    let secondary_color_id = req.params.secondary_color_id
    const size_id = req.params.size_id
    if (secondary_color_id === 'null') secondary_color_id = null
    db.query(`SELECT * FROM products_variations WHERE product_id = ${product_id} AND ${primary_color_id} AND ${secondary_color_id ? `secondary_color_id = ${secondary_color_id}` : '(secondary_color_id IS NULL)'} AND size_id = ${size_id};`, (err, result) => {
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
    const product_id = req.body.product_id
    const size_id = req.body.size_id
    const quantity = req.body.quantity
    const price = req.body.price
    const primary_color_id = req.body.primary_color_id
    const secondary_color_id = req.body.secondary_color_id

    db.query('INSERT INTO products_variations (product_id, size_id, quantity, price, primary_color_id, secondary_color_id) VALUES (?,?,?,?,?,?)', [product_id, size_id, quantity, price, primary_color_id, secondary_color_id], (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, { ...req.body, resourceUrl: `${req.baseUrl}/${product_id}/${primary_color_id}/${secondary_color_id}/${size_id}` }, 201)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.put('/:product_id/:primary_color_id/:secondary_color_id/:size_id', (req, res, next) => {
  try {
    const paramProductId = req.params.product_id
    const paramPrimaryColorId = req.params.primary_color_id
    let paramSecondaryColorId = req.params.secondary_color_id
    if (paramSecondaryColorId === 'null') paramSecondaryColorId = null
    const paramSizeId = req.params.size_id
    const product_id = req.body.product_id
    const size_id = req.body.size_id
    const quantity = req.body.quantity
    const price = req.body.price
    const primary_color_id = req.body.primary_color_id
    const secondary_color_id = req.body.secondary_color_id
    if (!paramProductId || !paramPrimaryColorId || !paramSecondaryColorId || !paramSizeId) {
      return errorHandler({ status: 400, message: 'Bad request.' }, req, res, next)
    }
    const propsArray = []
    if (product_id) propsArray.push(`product_id = ${product_id}`)
    if (size_id) propsArray.push(`size_id = ${size_id}`)
    if (quantity) propsArray.push(`quantity = ${quantity}`)
    if (price) propsArray.push(`price = ${price}`)
    if (primary_color_id) propsArray.push(`primary_color_id = ${primary_color_id}`)
    if (secondary_color_id) propsArray.push(`secondary_color_id = ${secondary_color_id}`)
    const setStr = propsArray.join(', ')
    db.query(`UPDATE products_variations SET ${setStr} WHERE product_id = ${paramProductId} AND primary_color_id = ${paramPrimaryColorId} AND ${secondary_color_id ? `secondary_color_id = ${secondary_color_id}` : '(secondary_color_id IS NULL)'} AND size_id = ${paramSizeId}`, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, { product_id, ...req.body }, 200)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.delete('/:product_id/:primary_color_id/:secondary_color_id/:size_id', (req, res, next) => {
  try {
    const product_id = req.params.product_id
    const primary_color_id = req.params.primary_color_id
    let secondary_color_id = req.params.secondary_color_id
    if (secondary_color_id === 'null') secondary_color_id = null
    const size_id = req.params.size_id
    db.query(`DELETE FROM products_variations WHERE product_id = ${product_id} AND primary_color_id = ${primary_color_id} AND ${secondary_color_id ? `secondary_color_id = ${secondary_color_id}` : '(secondary_color_id IS NULL)'} AND size_id = ${size_id};`, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, undefined, 204)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
