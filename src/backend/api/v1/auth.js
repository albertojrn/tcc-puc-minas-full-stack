const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')
const authGoogleTokenCheck = require('../../middlewares/authGoogleTokenCheck')
const authTokenCheck = require('../../middlewares/authTokenCheck')

const router = express.Router()

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
        const token = jwt.sign({ id: user.id, role: user.role }, secret)
        delete user.password
        responseHandler(req, res, { ...user, token }, 200)
      }
    )
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.post('/login-google', authGoogleTokenCheck, async (req, res, next) => {
  try {
    const { google_id, email, name } = req.verifiedGoogleUser
    const user = {
      id: '',
      name,
      birth_date: '',
      cpf: '',
      email,
      gender: '',
      phone: '',
      role: '',
      type: 'third',
      third_id: google_id
    }
    const secret = process.env.REACT_APP_AUTH_SECRET
    if (!user.third_id || !user.email) {
      return errorHandler({ status: 400, message: 'Bad Request' }, req, res, next)
    }

    db.query(
      `SELECT * FROM users WHERE third_id = "${user.third_id}" AND email = "${user.email}";`,
      async (err1, res1) => {
        if (err1) return sqlErrorHandler(err1, req, res, next)
        if (!res1?.[0]) {
          db.query(
            `INSERT INTO users (
              third_id,
              email,
              name,
              type
            )
            VALUES (
              "${user.third_id}",
              "${user.email}",
              "${user.name}",
              "${user.type}"
            );`,
            (err2) => {
              if (err2) return sqlErrorHandler(err2, req, res, next)
              db.query(
                `SELECT * FROM users WHERE third_id = "${user.third_id}" AND email = "${user.email}";`,
                (err3, res3) => {
                  if (err3) return sqlErrorHandler(err3, req, res, next)
                  const fetchedUser = res3[0]
                  const token = jwt.sign({ id: fetchedUser.id, role: fetchedUser.role }, secret)
                  delete fetchedUser.password
                  responseHandler(req, res, { ...fetchedUser, token }, 200)
                }
              )
            }
          )
        }
        else {
          const fetchedUser = res1[0]
          const token = jwt.sign({ id: fetchedUser.id, role: fetchedUser.role }, secret)
          delete fetchedUser.password
          responseHandler(req, res, { ...fetchedUser, token }, 200)
        }
      }
    )
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.get('/validate', authTokenCheck, async (req, res, next) => {
  try {
    const verifiedId = req.verifiedUser
    if (!verifiedId) {
      return errorHandler({ status: 400, message: 'Bad Request' }, req, res, next)
    }

    db.query(
      `SELECT * FROM users WHERE id = "${verifiedId}";`,
      async (err, result) => {
        if (err) return sqlErrorHandler(err, req, res, next)
        const user = result?.[0]
        if (!user?.id) return errorHandler({ status: 400, message: 'Usuário não encontrado' }, req, res, next)
        delete user.password
        responseHandler(req, res, { ...user }, 200)
      }
    )
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
