const express = require('express')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')
const ensureIsTheLoggedInUser = require('../../middlewares/ensureIsTheLoggedInUser')
const ensureIsAdmin = require('../../middlewares/ensureIsAdmin')
const authTokenCheck = require('../../middlewares/authTokenCheck')

const router = express.Router()

router.get('/', authTokenCheck, ensureIsAdmin, (req, res, next) => {
  try {
    db.query(`SELECT user_id, product_id, primary_color_id, size_id, quantity,
    CASE secondary_color_id WHEN -1 THEN NULL ELSE secondary_color_id END AS secondary_color_id
    FROM users_cart_products`, (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.get('/:user_id', authTokenCheck, ensureIsTheLoggedInUser, (req, res, next) => {
  try {
    const user_id = req.params.user_id
    db.query(
      `SELECT user_id, product_id, primary_color_id, size_id, quantity,
    CASE secondary_color_id
    WHEN -1 THEN NULL
    ELSE secondary_color_id
    END AS secondary_color_id
    FROM users_cart_products WHERE user_id = ${user_id}`,
      (err, result) => {
        if (err) return sqlErrorHandler(err, req, res, next)
        responseHandler(req, res, result)
      }
    )
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.post('/', authTokenCheck, ensureIsTheLoggedInUser, (req, res, next) => {
  try {
    const {
      primary_color_id,
      product_id,
      quantity,
      secondary_color_id,
      size_id,
      user_id,
    } = req.body
    if (
      [
        primary_color_id,
        product_id,
        quantity,
        size_id,
        user_id,
      ].some(item => item === undefined || item === null)
    ) {
      return errorHandler({ status: 400, message: 'Bad Request' }, req, res, next)
    }
    db.query(
      `INSERT INTO users_cart_products (
        primary_color_id,
        product_id,
        quantity,
        secondary_color_id,
        size_id,
        user_id
      )
      VALUES (
        ${primary_color_id},
        ${product_id},
        ${quantity},
        ${secondary_color_id ?? -1},
        ${size_id},
        ${user_id}
      );`,
      (err) => {
        if (err) return sqlErrorHandler(err, req, res, next)
        responseHandler(req, res, { ...req.body, resourceUrl: `${req.baseUrl}/${user_id}` }, 201)
      }
    )
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.put('/:user_id/:product_id/:primary_color_id/:secondary_color_id/:size_id', authTokenCheck, ensureIsTheLoggedInUser, (req, res, next) => {
  try {
    const user_id = Number(req.params.user_id)
    const req_primary_color_id = Number(req.params.primary_color_id)
    const req_secondary_color_id = !isNaN(Number(req.params.secondary_color_id)) ? Number(req.params.secondary_color_id) : -1
    const req_size_id = Number(req.params.size_id)
    const req_product_id = Number(req.params.product_id)
    if (!user_id || !Object.values(req.body ?? {}).length || (Object.values(req.body ?? {}).every(val => !val))) {
      return errorHandler({ status: 400, message: 'Bad request.' }, req, res, next)
    }
    const {
      primary_color_id,
      product_id,
      quantity,
      secondary_color_id,
      size_id,
    } = req.body
    if (!req_primary_color_id || !req_product_id || !req_secondary_color_id || !req_size_id) {
      return errorHandler({ status: 400, message: 'Bad request.' }, req, res, next)
    }
    const propsArray = []
    if (primary_color_id) propsArray.push(`primary_color_id = ${primary_color_id}`)
    if (product_id) propsArray.push(`product_id = ${product_id}`)
    if (quantity) propsArray.push(`quantity = ${quantity}`)
    if (secondary_color_id) propsArray.push(`secondary_color_id = ${secondary_color_id}`)
    if (size_id) propsArray.push(`size_id = ${size_id}`)
    const setStr = propsArray.join(', ')
    db.query(`UPDATE users_cart_products SET ${setStr} WHERE user_id = ${user_id} AND product_id = ${req_product_id} AND primary_color_id = ${req_primary_color_id} AND secondary_color_id = ${req_secondary_color_id} AND size_id = ${req_size_id}`, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, req.body, 200)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.delete('/:user_id', authTokenCheck, ensureIsTheLoggedInUser, (req, res, next) => {
  try {
    const user_id = Number(req.params.user_id)
    db.query(`DELETE FROM users_cart_products WHERE user_id = ${user_id}`, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, undefined, 204)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.delete('/:user_id/:product_id/:primary_color_id/:secondary_color_id/:size_id', authTokenCheck, ensureIsTheLoggedInUser, (req, res, next) => {
  try {
    const user_id = Number(req.params.user_id)
    const req_primary_color_id = Number(req.params.primary_color_id)
    const req_secondary_color_id = !isNaN(Number(req.params.secondary_color_id)) ? Number(req.params.secondary_color_id) : -1
    const req_size_id = Number(req.params.size_id)
    const req_product_id = Number(req.params.product_id)
    db.query(`DELETE FROM users_cart_products WHERE user_id = ${user_id} AND product_id = ${req_product_id} AND primary_color_id = ${req_primary_color_id} AND secondary_color_id = ${req_secondary_color_id} AND size_id = ${req_size_id}`, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, undefined, 204)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
