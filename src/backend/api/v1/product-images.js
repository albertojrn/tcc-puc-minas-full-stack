const express = require('express')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')

const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    db.query('SELECT * FROM products_images', (err, result) => {
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
    db.query(`SELECT * FROM products_images WHERE product_id = ${product_id};`, (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.get('/:product_id/:name', (req, res, next) => {
  try {
    const product_id = req.params.product_id
    const name = req.params.name
    db.query(`SELECT * FROM products_images WHERE product_id = ${product_id} AND name = ${name};`, (err, result) => {
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
    const name = req.body.name

    db.query('INSERT INTO products_images (product_id, name) VALUES (?,?)', [product_id, name], (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, { ...req.body, resourceUrl: `${req.baseUrl}/${product_id}/${name}` }, 201)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.put('/:product_id/:name', (req, res, next) => {
  try {
    const paramProductId = req.params.product_id
    const paramName = req.params.name
    const product_id = req.body.product_id
    const name = req.body.name
    if (!paramProductId || !paramName) {
      return errorHandler({ status: 400, message: 'Bad request.' }, req, res, next)
    }
    const propsArray = []
    if (name) propsArray.push(`name = '${name}'`)
    if (product_id) propsArray.push(`product_id = ${product_id}`)
    const setStr = propsArray.join(', ')
    db.query(`UPDATE products_images SET ${setStr} WHERE product_id = ${paramProductId} AND name = ${paramName}`, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, { product_id, ...req.body }, 200)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.delete('/:product_id/:name', (req, res, next) => {
  try {
    const product_id = req.params.product_id
    const name = req.params.name
    db.query(`DELETE FROM products_images WHERE product_id = ${product_id} AND name = ${name}`, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, undefined, 204)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
