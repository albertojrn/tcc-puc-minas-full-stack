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
    const getvalues = req.query.getvalues
    const featurevalues = req.query.featurevalues

    let whereQuery = ''
    if (featurevalues) {
      let fv = featurevalues
      if (!Array.isArray(fv)) fv = [fv]
      whereQuery += `
        WHERE features.id IN (
        SELECT feature_id FROM feature_values fv
        WHERE fv.id IN (${featurevalues.join(', ')})
        GROUP BY feature_id
        )
      `
    }

    const query = `
    SELECT *
    ${getvalues === 'true' ? `
    ,(
      SELECT JSON_ARRAYAGG(JSON_OBJECT(
      'id', fv.id,
      'name', fv.name,
      'feature_id', fv.feature_id
      ))
      FROM feature_values fv
      WHERE features.id = fv.feature_id
      ${featurevalues ? ` AND fv.id IN (${Array.isArray(featurevalues) ? featurevalues.join(', ') : featurevalues})` : ''}
    )
    AS featureValues
    ` : ''}
    FROM features
    ${whereQuery}
    ;
    `

    db.query(query, (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      if (Array.isArray(result)) {
        for (const item of result) {
          if (item.featureValues) item.featureValues = JSON.parse(item.featureValues)
        }
      }
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
    db.query('SELECT * FROM features WHERE id = ?', id, (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.post('/', authTokenCheck, ensureIsAdmin, (req, res, next) => {
  try {
    const name = req.body.name
    const is_multiple = req.body.is_multiple

    db.query('INSERT INTO features (name, is_multiple) VALUES (?,?)', [name, is_multiple], (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, { ...req.body, id: result.insertId, resourceUrl: `${req.baseUrl}/${result.insertId}` }, 201)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.put('/:id', authTokenCheck, ensureIsAdmin, (req, res, next) => {
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
    db.query(`UPDATE features SET ${setStr} WHERE id = ?`, id, (err) => {
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
    db.query('DELETE FROM features WHERE id= ?', id, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, undefined, 204)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
