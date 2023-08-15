const jwt = require('jsonwebtoken')
const { User } = require('../db')
const {
  validationPartialUser,
  validationUser,
  userExists
} = require('../utils/validations/user')
const { ResponseError } = require('../utils/errors')
const { JWT_SECRET } = require('../config')
const { encript, compare } = require('../utils/decode')
const { Op } = require('sequelize')

class UserController {
  static async register (req, res) {
    const userInfo = validationUser(req.body)

    try {
      const isExist = await User.findOne({
        where: {
          [Op.or]: [
            { username: userInfo.data.username },
            { email: userInfo.data.email }
          ]
        }
      })

      if (isExist) {
        throw new ResponseError({ message: 'User already exists', status: 400 })
      }

      if (!userInfo.success) {
        const message =
          'error creating user: ' +
          userInfo.error.errors
            .map((atb) => `${atb.path} - ${atb.message} `)
            .join(', ')

        throw new ResponseError({
          message,
          status: 400
        })
      }

      const passwordHash = await encript(userInfo.data.password)

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
    const userInfo = validationPartialUser(req.query)

    try {
      const userDb = await User.findOne({
        where: { username: userInfo.data.username }
      })

      const passwordCorrect =
        userDb === null
          ? false
          : await compare(userInfo.data.password, userDb.password)

      if (!userDb || !passwordCorrect) {
        throw new ResponseError({
          message: 'Invalid username, email or password',
          status: 401
        })
      }

      const userJSON = userDb.toJSON()
      delete userJSON.password

      const token = jwt.sign(userJSON, JWT_SECRET)

      res.status(200).json({ token, userFound: userJSON })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async update (req, res) {
    const { idUser } = req.params
    const userInfo = validationPartialUser(req.body)

    try {
      if (!userInfo.success) {
        const message =
          'error updating user: ' +
          userInfo.error.errors
            .map((atb) => `${atb.path} - ${atb.message}`)
            .join(', ')

        throw new ResponseError({
          message,
          status: 403
        })
      }

      if (userInfo.data.password) {
        userInfo.data.password = await encript(userInfo.data.password)
      }

      const userFound = await userExists(idUser)

      const userUpdated = await userFound.update(userInfo.data, {
        where: { id_user: idUser }
      })

      res.json(userUpdated)
    } catch (error) {
      console.log(error.message)

      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async softDelete (req, res) {
    const { idUser } = req.params
    try {
      const userFound = await userExists(idUser)

      await userFound.destroy()

      res.status(200).json({ message: 'user soft deleted successfully' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async restore (req, res) {
    const { idUser } = req.params
    try {
      const userFound = await userExists(idUser)

      await userFound.restore()

      res.status(200).json({ message: 'user soft deleted successfully' })
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
      const userFound = await userExists(idUser)

      const userJSON = userFound.toJSON()
      delete userJSON.password

      res.json(userJSON)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }
}

module.exports = UserController
