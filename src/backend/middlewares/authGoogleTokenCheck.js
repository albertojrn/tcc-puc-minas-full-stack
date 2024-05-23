const { OAuth2Client } = require('google-auth-library')
const errorHandler = require('./errorHandler')

const client = new OAuth2Client()

const authGoogleTokenCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]
    if (!token) {
      return errorHandler({ status: 401, message: 'Access denied.' }, req, res, next)
    }
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
    })
    const payload = ticket.getPayload()
    const email = payload.email
    const google_id = payload.sub
    const name = payload.name
    req.verifiedGoogleUser = {
      email,
      google_id,
      name,
    }
    next()
  }
  catch (err) {
    errorHandler({ status: 498, message: 'Token inválido.' }, req, res, next)
  }
}

module.exports = authGoogleTokenCheck
