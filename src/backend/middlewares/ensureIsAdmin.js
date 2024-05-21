function ensureIsAdmin(req, res, next) {
  const token = req.headers.authorization
  if (!token) return res.status(401).send()
  const [, user] = token.split(' ')
  if (user === 'admin') return next()
  return res.status(401).send()
}

export default ensureIsAdmin
