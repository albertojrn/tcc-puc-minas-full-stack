const express = require('express')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')
const authTokenCheck = require('../../middlewares/authTokenCheck')
const ensureIsTheLoggedInUserOrAdmin = require('../../middlewares/ensureIsTheLoggedInUserOrAdmin')
const ensureIsAdmin = require('../../middlewares/ensureIsAdmin')

const router = express.Router()

router.get('/', authTokenCheck, ensureIsAdmin, (req, res, next) => {
  try {
    const limit = req.query.limit
    const offset = req.query.offset
    const orderby = req.query.orderby
    const orderdirection = req.query.orderdirection
    const onlyinfo = req.query.onlyinfo

    const query = `
      SELECT
      *
      ${onlyinfo === 'true' ? '' : `,
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
      AS items`}
      FROM orders
      GROUP BY orders.id
      ${orderby ? `ORDER BY ${orderby}${orderdirection ? ` ${orderdirection}` : ''}` : ''}
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

router.get('/:id', authTokenCheck, ensureIsTheLoggedInUserOrAdmin, (req, res, next) => {
  try {
    const id = req.params.id
    const onlyinfo = req.query.onlyinfo

    const query = `
      SELECT
      *
      ${onlyinfo === 'true' ? '' : `,
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
      WHERE ${id} = oi.order_id
      )
      AS items`}
      FROM orders
      GROUP BY orders.id
      WHERE orders.id = ${id};
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

router.post('/', authTokenCheck, ensureIsTheLoggedInUserOrAdmin, (req, res, next) => {
  try {
    const user_id = req.body.user_id
    const shipping_fee = req.body.shipping_fee
    const shipping_method = req.body.shipping_method
    const shipping_days = req.body.shipping_days
    const shipping_address_id = req.body.shipping_address_id
    const payment_method = req.body.payment_method
    const discount = req.body.discount
    const total_products = req.body.total_products
    const coupon = req.body.coupon
    const installments = req.body.installments
    const items = req.body.items
    const query = `
      INSERT INTO orders (user_id, shipping_fee, shipping_method, shipping_days, shipping_address_id, payment_method, discount, total_products, coupon, installments) VALUES (${user_id},${shipping_fee},"${shipping_method}",${shipping_days},${shipping_address_id},"${payment_method}",${discount || null},${total_products},${coupon ? `"${coupon}"` : null},${installments});
      SELECT LAST_INSERT_ID() INTO @orderId;
      ${items?.length ? `
        INSERT INTO orders_items (order_id, primary_color_id, secondary_color_id, size_id, product_id, quantity, price) 
        VALUES ${items.map(item => `(@orderId, ${item.primary_color_id}, ${item.secondary_color_id || null}, ${item.size_id}, ${item.product_id}, ${item.quantity}, ${item.price})`).join(', ')}
      ;` : ''}
    `
    console.log(query)
    db.query(
      query,
      (err, result) => {
        if (err) return sqlErrorHandler(err, req, res, next)
        console.log(result)
        responseHandler(req, res, { ...req.body, id: result[0].insertId, resourceUrl: `${req.baseUrl}/${result[0].insertId}` }, 201)
      }
    )
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.put('/:id', authTokenCheck, ensureIsAdmin, (req, res, next) => {
  try {
    const id = req.params.id
    const {
      user_id,
      status,
      shipping_fee,
      shipping_address_id,
      payment_method,
      discount,
      total_products,
      coupon,
      installments,
      shipping_method,
      shipping_days,
      items,
    } = req.body
    if (!id) {
      return errorHandler({ status: 400, message: 'Bad request.' }, req, res, next)
    }
    const propsToChange = []
    if (user_id) propsToChange.push(`user_id = ${user_id}`)
    if (status) propsToChange.push(`status = "${status}"`)
    if (shipping_fee) propsToChange.push(`shipping_fee = ${shipping_fee}`)
    if (shipping_address_id) propsToChange.push(`shipping_address_id = ${shipping_address_id}`)
    if (payment_method) propsToChange.push(`payment_method = "${payment_method}"`)
    if (discount || discount === 0) propsToChange.push(`discount = ${discount}`)
    if (total_products) propsToChange.push(`total_products = ${total_products}`)
    if (coupon) propsToChange.push(`coupon = ${coupon ? `"${coupon}"` : null}`)
    if (installments) propsToChange.push(`installments = ${installments}`)
    if (shipping_method) propsToChange.push(`shipping_method = "${shipping_method}"`)
    if (shipping_days) propsToChange.push(`shipping_days = ${shipping_days}`)
    const setUpdateStr = propsToChange.join(', ')
    const query = `
      UPDATE orders SET ${setUpdateStr} WHERE id = ${id};
      ${items?.length ? `
        INSERT INTO orders_items (order_id, primary_color_id, secondary_color_id, size_id, product_id, quantity, price) 
        VALUES ${items.map(item => `(${id}, ${item.primary_color_id}, ${item.secondary_color_id || null}, ${item.size}, ${item.product_id}, ${item.quantity}, ${item.price})`).join(', ')}
      ;` : ''}
    `
    db.query(query, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, { id, ...req.body }, 200)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.delete('/:id', authTokenCheck, ensureIsAdmin, (req, res, next) => {
  try {
    const id = req.params.id
    db.query('DELETE FROM orders WHERE id= ?', id, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, undefined, 204)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
