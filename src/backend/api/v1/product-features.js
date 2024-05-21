const express = require('express')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')

const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    db.query('SELECT * FROM products_features_values', (err, result) => {
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
    db.query(`SELECT * FROM products_features_values WHERE product_id = ${product_id};`, (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.get('/:product_id/:feature_values_id', (req, res, next) => {
  try {
    const product_id = req.params.product_id
    const feature_values_id = req.params.feature_values_id
    db.query(`SELECT * FROM products_features_values WHERE product_id = ${product_id} AND feature_values_id = ${feature_values_id};`, (err, result) => {
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
    const feature_values_id = req.body.feature_values_id

    db.query('INSERT INTO products_features_values (product_id, feature_values_id) VALUES (?,?)', [product_id, feature_values_id], (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, { ...req.body, resourceUrl: `${req.baseUrl}/${product_id}/${feature_values_id}` }, 201)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.put('/:product_id/:feature_values_id', (req, res, next) => {
  try {
    const paramProductId = req.params.product_id
    const paramFeatureId = req.params.feature_values_id
    const product_id = req.body.product_id
    const feature_values_id = req.body.feature_values_id
    if (!paramProductId || !paramFeatureId) {
      return errorHandler({ status: 400, message: 'Bad request.' }, req, res, next)
    }
    const propsArray = []
    if (feature_values_id) propsArray.push(`feature_values_id = '${feature_values_id}'`)
    if (product_id) propsArray.push(`product_id = ${product_id}`)
    const setStr = propsArray.join(', ')
    db.query(`UPDATE products_features_values SET ${setStr} WHERE product_id = ${paramProductId} AND feature_values_id = ${paramFeatureId}`, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, { product_id, ...req.body }, 200)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.delete('/:product_id/:feature_values_id', (req, res, next) => {
  try {
    const product_id = req.params.product_id
    const feature_values_id = req.params.feature_values_id
    db.query(`DELETE FROM products_features_values WHERE product_id = ${product_id} AND feature_values_id = ${feature_values_id}`, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, undefined, 204)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
