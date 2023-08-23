const jwt = require('jsonwebtoken')
const { User } = require('../db')
const {
  validationPartialUser,
  validationUser
} = require('../utils/validations/user')

const { ResponseError } = require('../utils/errors')
const { JWT_SECRET } = require('../config')
const { encript, compare } = require('../utils/decode')
const { Op } = require('sequelize')

class UserController {
  static async register(req, res) {
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
        const message = userInfo.error.errors
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

      const token = jwt.sign(newUserJSON, JWT_SECRET)

      res.status(200).json({ dataUser: newUserJSON, token, isSignedIn: true })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async login(req, res) {
    const userInfo = validationPartialUser(req.query)

    try {
      if (!userInfo.success) {
        const message = userInfo.error.errors
          .map((err) => `${err.path} ${err.message}`)
          .join('\n')

        throw new ResponseError({ message, status: 400 })
      }

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

      res.status(200).json({ dataUser: userJSON, token, isSignedIn: true })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static logout(_req, res) {
    res.status(200).json({ message: 'Logged out', isSignedIn: false })
  }

  static async update(req, res) {
    const { idUser } = req.params
    const userInfo = validationPartialUser(req.body)

    try {
      if (!userInfo.success) {
        const message =
          'error: ' +
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

      const userFound = await User.findByPk(idUser)

      if (!userFound) {
        throw new ResponseError({ message: 'User not found', status: 404 })
      }

      const userUpdated = await userFound.update(userInfo.data)

      res.status(200).json(userUpdated)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async softDelete(req, res) {
    const { idUser } = req.params

    try {
      const userFound = await User.findByPk(idUser)

      if (!userFound) {
        throw new ResponseError({ message: 'User not found', status: 404 })
      }

      await userFound.destroy()

      res.status(200).json({ message: 'user soft deleted successfully' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async restore(req, res) {
    const { idUser } = req.params
    try {
      const userFound = await User.findByPk(idUser, { paranoid: false })

      if (!userFound) {
        throw new ResponseError({ message: 'User not found', status: 404 })
      }

      await userFound.restore()

      res.status(200).json({ message: 'user soft deleted successfully' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async getAll(_req, res) {
    const users = await User.findAll({
      attributes: {
        exclude: ['password']
      }
    })

    res.status(200).json(users)
  }

  static async getById(req, res) {
    const { idUser } = req.params

    try {
      const userFound = await User.findByPk(idUser, {
        attributes: { exclude: ['password'] }
      })

      if (!userFound) {
        throw new ResponseError({ message: 'User not found', status: 404 })
      }

      res.status(200).json(userFound)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }
}

module.exports = UserController
