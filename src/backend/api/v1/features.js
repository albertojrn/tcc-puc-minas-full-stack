const express = require('express')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')

const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    db.query('SELECT * FROM features', (err, result) => {
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
    db.query('SELECT * FROM features WHERE id = ?', id, (err, result) => {
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
    db.query(`UPDATE features SET ${setStr} WHERE id = ?`, id, (err) => {
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
