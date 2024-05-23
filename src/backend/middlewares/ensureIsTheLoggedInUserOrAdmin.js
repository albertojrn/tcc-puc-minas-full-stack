const errorHandler = require('./errorHandler')

function ensureIsTheLoggedInUserOrAdmin(req, res, next) {
  try {
    const verifiedUser = req.verifiedUser
    const verifiedRole = req.verifiedRole
    if (!verifiedUser || !verifiedRole) return errorHandler({ status: 401, message: 'Unauthorized' }, req, res, next)
    const isTheLoggedInUserOrAdmin = verifiedUser === Number(req.params.id) || verifiedRole === 'admin'
    if (!isTheLoggedInUserOrAdmin) return errorHandler({ status: 401, message: 'Unauthorized' }, req, res, next)
    next()
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
}

module.exports = ensureIsTheLoggedInUserOrAdmin
