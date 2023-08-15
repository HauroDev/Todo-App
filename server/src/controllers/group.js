const { ResponseError } = require('../utils/errors')
const { validationGroup, validationPartialGroup } = require('../utils/validations/group')
const { userExists } = require('../utils/validations/user')

class GroupController {
  static async getAll (req, res) {
    const { idUser } = req.params
    try {
      const userFound = await userExists(idUser)

      const groups = await userFound.getGroups()

      if (!groups.length) {
        throw new ResponseError({ message: "user hasn't groups", status: 400 })
      }
      res.status(200).json(groups)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async create (req, res) {
    const { idUser } = req.params
    const groupInfo = validationGroup(req.body)

    try {
      const userFound = await userExists(idUser)

      const newGroup = await userFound.createGroup(groupInfo.data)

      res.status(200).json(newGroup)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async getById (req, res) {
    const { idUser, idGroup } = req.params
    try {
      const userFound = await userExists(idUser)

      const [groupFound] = await userFound.getGroups({
        where: { id_group: idGroup }
      })

      if (!groupFound) {
        throw new ResponseError({ message: 'Group not found', status: 404 })
      }

      res.status(200).json(groupFound)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async softDelete (req, res) {
    const { idUser, idGroup } = req.params
    try {
      const userFound = await userExists(idUser)

      const [groupFound] = await userFound.getGroups({
        where: { id_group: idGroup }
      })

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
    const { idUser, idGroup } = req.params
    try {
      const userFound = await userExists(idUser)

      const [groupFound] = await userFound.getGroups({
        where: { id_group: idGroup },
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
    const { idUser, idGroup } = req.params
    const groupInfo = validationPartialGroup(req.body)

    try {
      const userFound = await userExists(idUser)

      const [groupFound] = await userFound.getGroups({
        where: { id_group: idGroup },
        paranoid: false
      })

      if (!groupFound) {
        throw new ResponseError({ message: 'Group not found', status: 404 })
      }

      const groupUpdate = await groupFound.update(groupInfo, {
        where: { id_group: idGroup }
      })

      res.status(200).json(groupUpdate)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }
}

module.exports = GroupController
