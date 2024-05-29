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
    db.query('SELECT * FROM feature_values', (err, result) => {
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
    db.query('SELECT * FROM feature_values WHERE id = ?', id, (err, result) => {
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
    const feature_id = req.body.feature_id

    db.query('INSERT INTO feature_values (name, feature_id) VALUES (?,?)', [name, feature_id], (err, result) => {
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
    const feature_id = req.body.feature_id
    if (!id || (name === undefined && feature_id === undefined)) {
      return errorHandler({ status: 400, message: 'Bad request.' }, req, res, next)
    }
    const propsArray = []
    if (name) propsArray.push(`name = '${name}'`)
    if (feature_id) propsArray.push(`feature_id = ${feature_id}`)
    const setStr = propsArray.join(', ')
    db.query(`UPDATE feature_values SET ${setStr} WHERE id = ?`, id, (err) => {
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
    db.query('DELETE FROM feature_values WHERE id= ?', id, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, undefined, 204)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
