const jwt = require('jsonwebtoken')
const errorHandler = require('./errorHandler')

const authTokenCheck = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]
    if (!token) {
      return errorHandler({ status: 401, message: 'Access denied.' }, req, res, next)
    }
    const secret = process.env.REACT_APP_AUTH_SECRET
    const user = jwt.verify(token, secret) // Throws an error if token is invalid
    req.verifiedUser = user?.id
    req.verifiedRole = user?.role
    next()
  }
  catch (err) {
    errorHandler({ status: 498, message: 'Token inválido.' }, req, res, next)
  }
}

module.exports = authTokenCheck
