const { List } = require('../database/db')
const { ResponseError } = require('../utils/errors')
const { validationList, validationPartialList } = require('../utils/validations/list')
const { userExists } = require('../utils/validations/user')

class ListController {
  static async getAll (req, res) {
    const { idUser } = req.params

    try {
      const userFound = await userExists(idUser)

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
      const userFound = await userExists(idUser)

      const [list] = await userFound.getLists({ where: { id_list: idList } })

      if (!list) {
        throw new ResponseError({ message: 'List not found', status: 404 })
      }

      res.status(200).json(list)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async create (req, res) {
    const { idUser } = req.params
    const list = validationList(req.body)

    try {
      const userFound = await userExists(idUser)

      const newList = await userFound.createList(list.data)

      res.status(201).json(newList)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async update (req, res) {
    const { idList, idUser } = req.params
    const info = validationPartialList(req.body)

    try {
      const userFound = await userExists(idUser)

      const [list] = await userFound.getLists({ where: { id_list: idList } })

      if (!list) {
        throw new ResponseError({ message: 'list not found', status: 404 })
      }

      const listUpdated = await list.update(info.data, {
        where: { id_list: idList }
      })

      res.status(200).json(listUpdated)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async softDelete (req, res) {
    const { idUser, idList } = req.params

    try {
      const userFound = await userExists(idUser)

      const [list] = await userFound.getLists({ where: { id_list: idList } })

      if (!list) {
        throw new ResponseError({ message: 'List not found', status: 404 })
      }

      await list.destroy()

      res.status(200).json({ message: 'soft deleted list' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async restore (req, res) {
    const { idUser, idList } = req.params

    try {
      await userExists(idUser)

      await List.restore({ where: { id_list: idList } })

      res.status(200).json({ message: 'list restored' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }
}

module.exports = ListController
