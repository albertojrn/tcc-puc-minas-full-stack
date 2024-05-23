const errorHandler = require('./errorHandler')

function ensureIsAdmin(req, res, next) {
  try {
    const verifiedRole = req.verifiedRole
    if (!verifiedRole) return errorHandler({ status: 401, message: 'Unauthorized' }, req, res, next)
    const isAdmin = verifiedRole === 'admin'
    if (!isAdmin) return errorHandler({ status: 401, message: 'Unauthorized' }, req, res, next)
    next()
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
}

module.exports = ensureIsAdmin
