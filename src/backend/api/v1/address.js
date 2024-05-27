const express = require('express')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')
const ensureIsAdmin = require('../../middlewares/ensureIsAdmin')
const authTokenCheck = require('../../middlewares/authTokenCheck')
const ensureIsTheLoggedInUserOrAdmin = require('../../middlewares/ensureIsTheLoggedInUserOrAdmin')

const router = express.Router()

router.get('/', authTokenCheck, ensureIsAdmin, (req, res, next) => {
  try {
    db.query('SELECT * FROM users_address', (err, result) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, result)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.get('/:user_id', authTokenCheck, ensureIsTheLoggedInUserOrAdmin, (req, res, next) => {
  try {
    const user_id = req.params.user_id
    db.query(
      `SELECT * FROM users_address WHERE user_id = ${user_id}`,
      (err, result) => {
        if (err) return sqlErrorHandler(err, req, res, next)
        responseHandler(req, res, result)
      }
    )
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.post('/', authTokenCheck, ensureIsTheLoggedInUserOrAdmin, (req, res, next) => {
  try {
    const {
      address_1,
      address_1_num,
      address_2,
      city,
      state,
      user_id,
      zip_code,
    } = req.body
    if (
      [
        address_1,
        address_1_num,
        address_2,
        city,
        state,
        user_id,
        zip_code,
      ].some(item => item === undefined || item === null)
    ) {
      return errorHandler({ status: 400, message: 'Bad Request' }, req, res, next)
    }
    db.query(
      `INSERT INTO users_address (
        address_1,
        address_1_num,
        address_2,
        city,
        state,
        user_id,
        zip_code
      )
      VALUES (
        "${address_1}",
        "${address_1_num}",
        "${address_2}",
        "${city}",
        "${state}",
        ${user_id},
        "${zip_code}"
      );`,
      (err, result) => {
        if (err) return sqlErrorHandler(err, req, res, next)
        responseHandler(req, res, { ...req.body, id: result.insertId, resourceUrl: `${req.baseUrl}/${result.insertId}` }, 201)
      }
    )
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.put('/:id', authTokenCheck, ensureIsTheLoggedInUserOrAdmin, (req, res, next) => {
  try {
    const id = req.params.id
    const address_1 = req.body.address_1
    const address_1_num = req.body.address_1_num
    const address_2 = req.body.address_2
    const city = req.body.city
    const state = req.body.state
    const user_id = Number(req.body.user_id)
    const zip_code = req.body.zip_code
    if (!id || !Object.values(req.body ?? {}).length || (Object.values(req.body ?? {}).every(val => !val))) {
      return errorHandler({ status: 400, message: 'Bad request.' }, req, res, next)
    }
    const propsArray = []
    if (address_1) propsArray.push(`address_1 = ${address_1}`)
    if (address_1_num) propsArray.push(`address_1_num = ${address_1_num}`)
    if (address_2) propsArray.push(`address_2 = ${address_2}`)
    if (city) propsArray.push(`city = ${city}`)
    if (state) propsArray.push(`state = ${state}`)
    if (user_id) propsArray.push(`user_id = ${user_id}`)
    if (zip_code) propsArray.push(`zip_code = ${zip_code}`)
    const setStr = propsArray.join(', ')
    db.query(`UPDATE users_address SET ${setStr} WHERE id = ${id}`, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, req.body, 200)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

router.delete('/:id', authTokenCheck, ensureIsTheLoggedInUserOrAdmin, (req, res, next) => {
  try {
    const id = req.params.id
    db.query(`DELETE FROM users_address WHERE id = ${id}`, (err) => {
      if (err) return sqlErrorHandler(err, req, res, next)
      responseHandler(req, res, undefined, 204)
    })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
