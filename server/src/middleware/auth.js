const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config')

const validateToken = (req, res, next) => {
  const authorization = req.get('Authorization')
  let token = null

  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.split(' ')[1]
  }

  try {
    jwt.verify(token, JWT_SECRET)

    next()
  } catch (error) {
    console.error('Error verifying')

    res.status(401).json({ message: error.message, isSignedIn: false })
  }
}

module.exports = { validateToken }
