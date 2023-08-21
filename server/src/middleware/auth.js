const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config')

const accessValid = (req, res, next) => {
  const { token } = req.cookies

  try {
    jwt.verify(token, JWT_SECRET)

    next()
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

module.exports = { accessValid }
