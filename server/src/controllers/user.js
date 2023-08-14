const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../database/db')
const {
  validationPartialUser,
  validationUser,
  userExists
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

  static async update (req, res) {
    const { idUser } = req.params
    const info = validationPartialUser(req.body)

    try {
      const user = await userExists(idUser)

      const userUpdated = await user.update(info.data)

      res.json(userUpdated)
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

  static async getById (req, res) {
    const { idUser } = req.params

    try {
      const user = await userExists(idUser)

      const userJSON = user.toJSON()
      delete userJSON.password

      res.json(userJSON)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }
}

module.exports = UserController
