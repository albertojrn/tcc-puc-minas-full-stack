const SQL_ERROR_DICT = require('../constants/sqlErrorDict')

const sqlErrorHandler = (err, req, res, next) => {
  const sqlError = SQL_ERROR_DICT[err.code]
  const errStatus = sqlError.status || 500
  const errMsg = err.sqlMessage || 'Internal Server Error'
  res.status(errStatus).json({
    error: {
      status: errStatus,
      message: errMsg,
    }
  })
}

module.exports = sqlErrorHandler
