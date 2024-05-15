const responseHandler = (req, res, result, status) => {
  const resStatus = status || 200
  res.status(resStatus).send(result)
}

module.exports = responseHandler
