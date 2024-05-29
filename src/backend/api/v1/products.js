const express = require('express')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')
const ensureIsAdmin = require('../../middlewares/ensureIsAdmin')
const authTokenCheck = require('../../middlewares/authTokenCheck')

const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    const limit = req.query.limit
    const offset = req.query.offset
    const orderby = req.query.orderby
    const orderdirection = req.query.orderdirection
    const onlyinfo = req.query.onlyinfo
    const featurevalues = req.query.featurevalues
    const count = req.query.count
    const searchquery = req.query.searchquery

    let whereQuery = 'WHERE '
    const whereParts = []
    if (featurevalues) {
      let fv = featurevalues
      if (!Array.isArray(fv)) fv = [fv]
      whereParts.push(
        `
          products.id IN
          (
          SELECT product_id from products_features_values
          WHERE
          (
          ${fv.map(val => (`product_id IN (SELECT product_id from products_features_values WHERE feature_values_id = ${val})`)).join(' AND ')}
          )
          OR
          (
          ${fv.map(val => (`product_id IN (SELECT product_id from products_variations pv WHERE pv.primary_color_id = ${val} OR pv.secondary_color_id = ${val} OR pv.size_id = ${val})`)).join(' AND ')}
          )
          GROUP BY product_id
          )
        `
      )
    }
    if (searchquery && typeof searchquery === 'string') {
      whereParts.push(`products.title LIKE '%${searchquery}%'`)
    }
    whereQuery += whereParts.join(' AND ')
    if (whereQuery === 'WHERE ') whereQuery = ''
    console.log({searchquery, whereParts, whereQuery})

    const query = `
      ${count === 'true' ? `
      SELECT COUNT(products.id) AS totalProducts FROM products ${whereQuery};` : ''}
      SELECT
      *,
      ${onlyinfo === 'true' ? '' : `
      (
      SELECT JSON_ARRAYAGG(pf.feature_values_id)
      FROM products_features_values pf
      WHERE products.id = pf.product_id
      )
      AS selectedFeatures,
      (
      SELECT JSON_ARRAYAGG(JSON_OBJECT(
      'size', pv.size_id,
      'quantity', pv.quantity,
      'price', pv.price,
      'primaryColor', pv.primary_color_id,
      'secondaryColor', pv.secondary_color_id
      ))
      FROM products_variations pv
      WHERE products.id = pv.product_id
      )
      AS variations,`}
      ${orderby === 'orders' ? `
      (
      SELECT SUM(quantity)
      FROM orders_items oi
      WHERE products.id = oi.product_id
      )
      AS orders,` : ''}
      (
      SELECT JSON_ARRAYAGG(pImg.name)
      FROM products_images pImg
      WHERE products.id = pImg.product_id
      )
      AS images
      FROM products
      ${whereQuery}
      GROUP BY products.id
      ${orderby ? `ORDER BY ${orderby}${orderdirection ? ` ${orderdirection}` : ''}` : ''}
      ${limit ? `LIMIT ${limit}` : ''}
      ${offset ? `OFFSET ${offset}` : ''};
    `

    db.query(query, (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      let modifiedResult = result
      if (count === 'true') {
        modifiedResult = result[1]
        if (modifiedResult[0]) {
          modifiedResult[0].count = result[0][0].totalProducts
        }
      }
      if (Array.isArray(modifiedResult)) {
        for (const item of modifiedResult) {
          if (item.selectedFeatures) item.selectedFeatures = JSON.parse(item.selectedFeatures)
          if (item.variations) item.variations = JSON.parse(item.variations)
          if (item.images) item.images = JSON.parse(item.images)
        }
      }
      responseHandler(req, res, modifiedResult)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    const id = req.params.id
    const onlyinfo = req.query.onlyinfo

    const query = `
      SELECT
      *,
      ${onlyinfo === 'true' ? '' : `
      (
      SELECT JSON_ARRAYAGG(pf.feature_values_id)
      FROM products_features_values pf
      WHERE ${id} = pf.product_id
      )
      AS selectedFeatures,
      (
      SELECT JSON_ARRAYAGG(JSON_OBJECT(
      'size', pv.size_id,
      'quantity', pv.quantity,
      'price', pv.price,
      'primaryColor', pv.primary_color_id,
      'secondaryColor', pv.secondary_color_id
      ))
      FROM products_variations pv
      WHERE ${id} = pv.product_id
      )
      AS variations,`}
      (
      SELECT JSON_ARRAYAGG(pImg.name)
      FROM products_images pImg
      WHERE ${id} = pImg.product_id
      )
      AS images
      FROM products
      WHERE products.id = ${id};
    `
    db.query(query, (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      if (Array.isArray(result)) {
        for (const item of result) {
          if (item.selectedFeatures) item.selectedFeatures = JSON.parse(item.selectedFeatures)
          if (item.variations) item.variations = JSON.parse(item.variations)
          if (item.images) item.images = JSON.parse(item.images)
        }
      }
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.post('/', authTokenCheck, ensureIsAdmin, (req, res, next) => {
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
      INSERT INTO products (title, description, depth, sku, width, height) VALUES ("${title}","${description}",${depth},${sku ? `"${sku}"` : null},${width},${height});
      SELECT LAST_INSERT_ID() INTO @productId;
      ${variations?.length ? `
        INSERT INTO products_variations (product_id, size_id, quantity, price, primary_color_id, secondary_color_id) 
        VALUES ${variations.map(variation => `(@productId, ${variation.size}, ${variation.quantity}, ${variation.price}, ${variation.primaryColor}, ${variation.secondaryColor || null})`).join(', ')}
      ;` : ''}
      ${selectedFeatures?.length ? `
        INSERT INTO products_features_values (product_id, feature_values_id) 
        VALUES ${selectedFeatures.map(id => `(@productId, ${id})`).join(', ')}
      ;` : ''}
      ${images?.length ? `
        INSERT INTO products_images (product_id, name) 
        VALUES ${images.map(imgName => `(@productId, "${imgName}")`).join(', ')}
      ;` : ''}
    `

    db.query(
      query,
      (err, result) => {
        if (err) return sqlErrorHandler(err, req, res, next)
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
      title,
      description,
      depth,
      sku,
      width,
      height,
      variations,
      selectedFeatures,
      images,
    } = req.body
    if (!id) {
      return errorHandler({ status: 400, message: 'Bad request. Missing rpduct id.' }, req, res, next)
    }
    const productPropsToChange = []
    if (title) productPropsToChange.push(`title = '${title}'`)
    if (description) productPropsToChange.push(`description = '${description}'`)
    if (depth) productPropsToChange.push(`depth = ${depth}`)
    if (sku !== undefined && sku !== null) productPropsToChange.push(`sku = ${sku ? `'${sku}'` : null}`)
    if (width) productPropsToChange.push(`width = ${width}`)
    if (height) productPropsToChange.push(`height = ${height}`)
    const setProductStr = productPropsToChange.join(', ')
    const query = `
      UPDATE products SET ${setProductStr} WHERE id = ${id};
      ${variations?.length ? `
        INSERT INTO products_variations (product_id, size_id, quantity, price, primary_color_id, secondary_color_id) 
        VALUES ${variations.map(variation => `(${id}, ${variation.size}, ${variation.quantity}, ${variation.price}, ${variation.primaryColor}, ${variation.secondaryColor || null})`).join(', ')}
      ;` : ''}
      ${selectedFeatures?.length ? `
        INSERT INTO products_features_values (product_id, feature_values_id) 
        VALUES ${selectedFeatures.map(featureId => `(${id}, ${featureId})`).join(', ')}
      ;` : ''}
      ${images?.length ? `
        INSERT INTO products_images (product_id, name) 
        VALUES ${images.map(imgName => `(${id}, "${imgName}")`).join(', ')}
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
