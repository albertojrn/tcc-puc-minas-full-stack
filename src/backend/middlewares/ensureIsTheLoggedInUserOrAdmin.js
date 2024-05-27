const errorHandler = require('./errorHandler')

function ensureIsTheLoggedInUserOrAdmin(req, res, next) {
  try {
    const reqUserId = req.params.id ?? req.params.user_id ?? req.body.user_id
    const verifiedUser = req.verifiedUser
    const verifiedRole = req.verifiedRole
    if (!verifiedUser || !verifiedRole) return errorHandler({ status: 401, message: 'Unauthorized' }, req, res, next)
    const isTheLoggedInUserOrAdmin = verifiedUser === Number(reqUserId) || verifiedRole === 'admin'
    if (!isTheLoggedInUserOrAdmin) return errorHandler({ status: 401, message: 'Unauthorized' }, req, res, next)
    next()
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
}

module.exports = ensureIsTheLoggedInUserOrAdmin
