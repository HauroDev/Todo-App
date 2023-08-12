const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../database/db')
const {
  validationPartialUser,
  validationUser
} = require('../utils/validations/user')
const { ResponseError } = require('../utils/errors')
const { JWT_SECRET } = require('../config')

class UserController {
  static async register (req, res) {
    const user = validationUser(req.body)

    try {
      const isExist = await User.findOne({
        where: { username: user.data.username }
      })

      if (isExist) {
        throw new ResponseError({ message: 'User already exists', status: 400 })
      }

      if (!user.success) {
        throw new ResponseError({
          message: user.error,
          status: 400
        })
      }

      const saltOrRounds = 10
      const passwordHash = await bcrypt.hash(user.data.password, saltOrRounds)

      const newUser = await User.create({
        ...req.body,
        password: passwordHash
      })

      const newUserJSON = newUser.toJSON()
      delete newUserJSON.password

      res.status(201).json(newUserJSON)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async login (req, res) {
    const user = validationPartialUser(req.body)

    try {
      const userDb = await User.findOne({
        where: { username: user.data.username }
      })

      const passwordCorrect =
        userDb === null
          ? false
          : await bcrypt.compare(user.data.password, userDb.password)

      if (!userDb || !passwordCorrect) {
        throw new ResponseError({
          message: 'Invalid user or password',
          status: 401
        })
      }

      const userJSON = userDb.toJSON()
      delete userJSON.password

      const token = jwt.sign(userJSON, JWT_SECRET)

      res.status(200).json({ token, user: userJSON })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async getAll (_req, res) {
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['password']
      }
    })

    res.json(allUsers)
  }
}

module.exports = UserController
