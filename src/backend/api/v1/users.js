const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')
const authTokenCheck = require('../../middlewares/authTokenCheck')

const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    db.query('SELECT * FROM users', (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.get('/:id', authTokenCheck, (req, res, next) => {
  try {
    const id = req.params.id
    db.query('SELECT * FROM users WHERE id = ?', id, (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      for (const user of result) {
        if (user.password) delete user.password
      }
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {
      birth_date,
      cpf,
      email,
      gender,
      name,
      password,
      phone,
      role,
      type
    } = req.body
    if (
      [
        birth_date,
        cpf,
        email,
        gender,
        name,
        password,
        phone,
        role,
        type
      ].some(item => !item)
    ) {
      return errorHandler({ status: 400, message: 'Bad Request' }, req, res, next)
    }
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    db.query(
      `INSERT INTO users (
        birth_date,
        cpf,
        email,
        gender,
        name,
        password,
        phone,
        role,
        type
      )
      VALUES (
        "${birth_date}",
        "${cpf}",
        "${email}",
        "${gender}",
        "${name}",
        "${passwordHash}",
        "${phone}",
        "${role}",
        "${type}"
      );`,
      (err, result) => {
        if (err) return sqlErrorHandler(err, req, res, next)
        responseHandler(req, res, { id: result.insertId, resourceUrl: `${req.baseUrl}/${result.insertId}` }, 201)
      }
    )
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
    db.query(`UPDATE users SET ${setStr} WHERE id = ?`, id, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, { id, ...req.body }, 200)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.delete('/:id', (req, res, next) => {
  try {
    const id = req.params.id
    db.query('DELETE FROM users WHERE id= ?', id, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, undefined, 204)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
