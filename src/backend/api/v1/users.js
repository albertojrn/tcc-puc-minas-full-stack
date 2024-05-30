const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')
const authTokenCheck = require('../../middlewares/authTokenCheck')
const ensureIsAdmin = require('../../middlewares/ensureIsAdmin')
const ensureIsTheLoggedInUserOrAdmin = require('../../middlewares/ensureIsTheLoggedInUserOrAdmin')

const router = express.Router()

router.get('/', authTokenCheck, ensureIsAdmin, (req, res, next) => {
  const limit = req.query.limit
  const offset = req.query.offset
  try {
    db.query(
      `
      SELECT * FROM users
      ${limit ? `LIMIT ${limit}` : ''}
      ${offset ? `OFFSET ${offset}` : ''};
      `,
      (err, result) => {
        if (err) return sqlErrorHandler(err, req, res, next)
        for (const user of result) {
          if (Object.prototype.hasOwnProperty.call(user, 'password')) delete user.password
        }
        delete result.password
        responseHandler(req, res, result)
      }
    )
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.get('/:id', authTokenCheck, ensureIsTheLoggedInUserOrAdmin, async (req, res, next) => {
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
        phone
        ${role ? ',role' : ''}
        ${type ? ',type' : ''}
      )
      VALUES (
        "${birth_date}",
        "${cpf}",
        "${email}",
        "${gender}",
        "${name}",
        "${passwordHash}",
        "${phone}"
        ${role ? `,"${role}"` : ''}
        ${type ? `,"${type}"` : ''}
      );`,
      (err, result) => {
        if (err) return sqlErrorHandler(err, req, res, next)
        if (!req.body.role) req.body.role = 'standard'
        if (!req.body.type) req.body.type = 'standard'
        responseHandler(req, res, { ...req.body, id: result.insertId, resourceUrl: `${req.baseUrl}/${result.insertId}` }, 201)
      }
    )
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.put('/:id', authTokenCheck, ensureIsTheLoggedInUserOrAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    const body = structuredClone(req.body ?? {})
    if (req.verifiedRole !== 'admin') {
      if (body.cpf) delete body.cpf
      if (body.role) delete body.role
      if (body.type) delete body.type
    }
    if (!id || !Object.values(body ?? {}).length || (Object.values(body ?? {}).every(val => !val))) {
      return errorHandler({ status: 400, message: 'Bad request.' }, req, res, next)
    }
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
    } = body
    let passwordHash
    if (password) {
      const salt = await bcrypt.genSalt(12)
      passwordHash = await bcrypt.hash(password, salt)
    }
    const propsArray = []
    if (birth_date) propsArray.push(`birth_date = "${birth_date}"`)
    if (cpf) propsArray.push(`cpf = "${cpf}"`)
    if (email) propsArray.push(`email = "${email}"`)
    if (gender) propsArray.push(`gender = "${gender}"`)
    if (name) propsArray.push(`name = "${name}"`)
    if (passwordHash) propsArray.push(`password = "${passwordHash}"`)
    if (phone) propsArray.push(`phone = "${phone}"`)
    if (role) propsArray.push(`role = "${role}"`)
    if (type) propsArray.push(`type = "${type}"`)
    const setStr = propsArray.join(', ')
    db.query(`UPDATE users SET ${setStr} WHERE id = ?`, id, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      if (body.password) delete body.password
      responseHandler(req, res, { id, ...body }, 200)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.delete('/:id', authTokenCheck, ensureIsAdmin, (req, res, next) => {
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
