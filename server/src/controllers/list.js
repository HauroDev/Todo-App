const { User } = require('../database/db')
const { ResponseError } = require('../utils/errors')
const { validationList } = require('../utils/validations/list')

class ListController {
  static async getAll (req, res) {
    const { idUser } = req.params

    try {
      const userFound = await User.findByPk(idUser)

      if (!userFound) {
        throw new ResponseError({ message: 'User not found', status: 404 })
      }

      const lists = await userFound.getLists()

      if (!lists.length) {
        throw new ResponseError({ message: "User hasn't lists", status: 403 })
      }

      res.status(200).json(lists)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async getById (req, res) {
    const { idUser, idList } = req.params

    try {
      const userFound = await User.findByPk(idUser)

      if (!userFound) {
        throw new ResponseError({ message: 'User not found', status: 404 })
      }

      const list = await userFound.getLists({ where: { id_list: idList } })

      if (!list) {
        throw new ResponseError({ message: 'List not found', status: 404 })
      }

      res.status(200).json(list[0])
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async create (req, res) {
    const { idUser } = req.params
    const list = validationList(req.body)

    try {
      const userFound = await User.findByPk(idUser)

      if (!userFound) {
        throw new ResponseError({ message: 'User not found', status: 404 })
      }

      const newList = await userFound.createList(list.data)

      res.status(200).json(newList)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }
}

module.exports = ListController
