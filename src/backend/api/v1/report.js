const express = require('express')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')
const authTokenCheck = require('../../middlewares/authTokenCheck')
const ensureIsAdmin = require('../../middlewares/ensureIsAdmin')

const router = express.Router()

router.get('/', authTokenCheck, ensureIsAdmin, (req, res, next) => {
  try {
    const limit = req.query.limit
    const offset = req.query.offset
    const orderby = req.query.orderby
    const orderdirection = req.query.orderdirection
    const from = req.query.from
    const to = req.query.to

    const query = `
      SELECT
      *,
      (
      SELECT JSON_ARRAYAGG(JSON_OBJECT(
      'order_id', oi.order_id,
      'primary_color_id', oi.primary_color_id,
      'secondary_color_id', oi.secondary_color_id,
      'size_id', oi.size_id,
      'product_id', oi.product_id,
      'quantity', oi.quantity,
      'price', oi.price
      ))
      FROM orders_items oi
      WHERE orders.id = oi.order_id
      )
      AS items
      FROM orders
      ${(from && to) && `WHERE orders.date BETWEEN '${from} 00:00:00' AND '${to} 23:59:59'`}
      GROUP BY orders.id
      ${orderby ? `ORDER BY ${orderby}${orderdirection ? ` ${orderdirection}` : ''}` : 'ORDER BY orders.date'}
      ${limit ? `LIMIT ${limit}` : ''}
      ${offset ? `OFFSET ${offset}` : ''};
    `
    db.query(query, (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      if (Array.isArray(result)) {
        for (const item of result) {
          if (item.items) item.items = JSON.parse(item.items)
        }
      }
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
