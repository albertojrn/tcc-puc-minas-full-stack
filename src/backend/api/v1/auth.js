const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

router.post('/login', async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body
    if ([email, password].some(item => !item)) {
      return errorHandler({ status: 400, message: 'Bad Request' }, req, res, next)
    }

    db.query(
      `SELECT * FROM users WHERE email = "${email}";`,
      async (err, result) => {
        if (err) return sqlErrorHandler(err, req, res, next)
        const user = result?.[0]
        const userPass = user?.password
        if (!user) return errorHandler({ status: 400, message: 'Usuário não encontrado' }, req, res, next)
        if (!userPass) return errorHandler({ status: 500, message: 'Senha do usuário não configurada' }, req, res, next)
        const checkPassword = await bcrypt.compare(password, userPass)
        if (!checkPassword) return errorHandler({ status: 200, message: 'Senha incorreta.' }, req, res, next)
        const secret = process.env.REACT_APP_AUTH_SECRET
        const token = jwt.sign({ id: user.id }, secret)
        delete user.password
        responseHandler(req, res, { ...user, token }, 200)
      }
    )
  }
  catch (err) {
    console.log(err)
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
