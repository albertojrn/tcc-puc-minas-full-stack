const errorHandler = require('./errorHandler')

function ensureIsTheLoggedInUser(req, res, next) {
  try {
    const verifiedUser = req.verifiedUser
    if (!verifiedUser) return errorHandler({ status: 401, message: 'Unauthorized' }, req, res, next)
    const isTheLoggedInUser = verifiedUser === req.params.id
    if (!isTheLoggedInUser) return errorHandler({ status: 401, message: 'Unauthorized' }, req, res, next)
    next()
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
}

module.exports = ensureIsTheLoggedInUser
