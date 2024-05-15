const errorHandler = (err, req, res, next) => {
  const errStatus = err.status || err.statusCode || 500
  const errMsg = err.message || 'Internal Server Error'
  res.status(errStatus).json({
    error: {
      status: errStatus,
      message: errMsg,
    }
  })
}

module.exports = errorHandler
