const { List, Group } = require('../db')
const { ResponseError } = require('../utils/errors')
const {
  validationList,
  validationPartialList
} = require('../utils/validations/list')

class ListController {
  static async getAll (_req, res) {
    const lists = await List.findAll()
    res.status(200).json(lists)
  }

  static async getById (req, res) {
    const { idList } = req.params

    try {
      const listFound = await List.findByPk(idList)

      if (!listFound) {
        throw new ResponseError({ message: 'List not found', status: 404 })
      }

      res.status(200).json(listFound)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async create (req, res) {
    const listInfo = validationList(req.body)

    try {
      if (!listInfo.success) {
        const message = listInfo.error.errors
          .map((err) => `${err.path} ${err.message}`)
          .join('\n')

        console.log(listInfo.error)

        throw new ResponseError({ message, status: 400 })
      }

      const newList = await List.create(listInfo.data)
      res.status(201).json(newList)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async update (req, res) {
    const { idList } = req.params
    const listInfo = validationPartialList(req.body)

    try {
      const listFound = await List.findByPk(idList)

      if (!listFound) {
        throw new ResponseError({ message: 'list not found', status: 404 })
      }

      const listUpdated = await listFound.update(listInfo.data)

      res.status(200).json(listUpdated)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async softDelete (req, res) {
    const { idList } = req.params

    try {
      const listFound = await List.findByPk(idList)

      if (!listFound) {
        throw new ResponseError({ message: 'List not found', status: 404 })
      }

      await listFound.destroy()

      res.status(200).json({ message: 'soft deleted list' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async restore (req, res) {
    const { idList } = req.params

    try {
      const listFound = await List.findByPk(idList, {
        paranoid: false
      })

      if (!listFound) {
        throw new ResponseError({ message: 'List not found', status: 404 })
      }

      await listFound.restore()

      res.status(200).json({ message: 'list restored' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async changeGroup (req, res) {
    const { idList } = req.params
    const { idOrigin, idDestination } = req.body

    try {
      const originGroupFound = await Group.findByPk(idOrigin)

      if (!originGroupFound) {
        throw new ResponseError({ message: 'origin group not found' })
      }

      const destinationGroupFound = await Group.findByPk(idDestination)

      if (!destinationGroupFound) {
        throw new ResponseError({ message: 'destination group not found' })
      }

      const listFound = await List.findByPk(idList, {
        paranoid: false
      })

      await originGroupFound.removeGroup(listFound)
      await destinationGroupFound.addGroup(listFound)

      res.status(200).json({ message: 'list changed groups successfully' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }
}

module.exports = ListController
