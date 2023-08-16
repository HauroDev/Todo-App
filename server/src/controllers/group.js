const { Group } = require('../db')
const { ResponseError } = require('../utils/errors')
const {
  validationGroup,
  validationPartialGroup
} = require('../utils/validations/group')

class GroupController {
  static async getAll (req, res) {
    const { idUser } = req.query

    const Options = {
      where: idUser ? { id_user: idUser } : undefined
    }

    const groups = await Group.findAll(Options)

    res.status(200).json(groups)
  }

  static async getById (req, res) {
    const { idGroup } = req.params
    try {
      const groupFound = await Group.findByPk(idGroup)

      if (!groupFound) {
        throw new ResponseError({ message: 'Group not found', status: 404 })
      }

      res.status(200).json(groupFound)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async create (req, res) {
    const groupInfo = validationGroup(req.body)

    try {
      if (!groupInfo.success) {
        const message = groupInfo.error.errors
          .map((err) => `${err.path} ${err.message}`)
          .join('\n')

        throw new ResponseError({ message, status: 400 })
      }

      const newGroup = await Group.create(groupInfo.data)

      res.status(200).json(newGroup)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async softDelete (req, res) {
    const { idGroup } = req.params
    try {
      const groupFound = await Group.findByPk(idGroup)

      if (!groupFound) {
        throw new ResponseError({ message: 'Group not found', status: 404 })
      }

      await groupFound.destroy()

      res.status(200).json({ message: 'group soft deleted successfully' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async restore (req, res) {
    const { idGroup } = req.params
    try {
      const groupFound = await Group.findByPk(idGroup, {
        paranoid: false
      })

      if (!groupFound) {
        throw new ResponseError({ message: 'Group not found', status: 404 })
      }

      await groupFound.restore()

      res.status(200).json({ message: 'group restored successfully' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async update (req, res) {
    const { idGroup } = req.params
    const groupInfo = validationPartialGroup(req.body)

    try {
      const groupFound = await Group.findByPk(idGroup, {
        paranoid: false
      })

      if (!groupFound) {
        throw new ResponseError({ message: 'Group not found', status: 404 })
      }

      const groupUpdate = await groupFound.update(groupInfo)

      res.status(200).json(groupUpdate)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }
}

module.exports = GroupController
