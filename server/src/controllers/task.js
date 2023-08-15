const { ResponseError } = require('../utils/errors')
const {
  validationTask,
  validationPartialTask
} = require('../utils/validations/task')
const { userExists } = require('../utils/validations/user')

class TaskController {
  static async getAll (req, res) {
    const { idUser, idList } = req.params
    try {
      const userFound = await userExists(idUser)

      const [listFound] = await userFound.getLists({
        where: { id_list: idList }
      })

      if (!listFound) {
        throw new ResponseError({ message: 'List not found', status: 404 })
      }

      const tasks = await listFound.getTasks()

      res.status(200).json(tasks)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async getById (req, res) {
    const { idUser, idList, idTask } = req.params
    try {
      const userFound = await userExists(idUser)

      const [listFound] = await userFound.getLists({
        where: { id_list: idList }
      })

      if (!listFound) {
        throw new ResponseError({ message: 'List not found', status: 404 })
      }

      const [taskFound] = await listFound.getTasks({
        where: { id_task: idTask }
      })

      res.status(200).json(taskFound)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async create (req, res) {
    const { idUser, idList } = req.params
    const taskInfo = validationTask(req.body)

    try {
      const userFound = await userExists(idUser)

      const [listFound] = await userFound.getLists({
        where: { id_list: idList }
      })

      if (!taskInfo.success) {
        const message =
          'error creating user: ' +
          taskInfo.error.errors
            .map((atb) => `${atb.path} - ${atb.message} `)
            .join(', ')

        throw new ResponseError({
          message,
          status: 400
        })
      }

      const newTask = await listFound.createTask(taskInfo.data)

      res.status(200).json(newTask)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async update (req, res) {
    const { idUser, idList, idTask } = req.params
    const taskInfo = validationPartialTask(req.body)
    try {
      const userFound = await userExists(idUser)

      const [listFound] = await userFound.getLists({
        where: { id_list: idList }
      })

      if (!listFound) {
        throw new ResponseError({ message: 'List not found', status: 404 })
      }

      const [taskFound] = await listFound.getTasks({
        where: { id_task: idTask },
        paranoid: false
      })

      if (!taskFound) {
        throw new ResponseError({ message: 'Task not found', status: 404 })
      }

      const taskUpdated = await taskFound.update(taskInfo.data)

      res.status(200).json(taskUpdated)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async softDelete (req, res) {
    const { idUser, idList, idTask } = req.params

    try {
      const userFound = await userExists(idUser)

      const [listFound] = await userFound.getLists({
        where: { id_list: idList }
      })

      if (!listFound) {
        throw new ResponseError({ message: 'List not found', status: 404 })
      }

      const [taskFound] = await listFound.getTasks({
        where: { id_task: idTask }
      })

      if (!taskFound) {
        throw new ResponseError({ message: 'Task not found', status: 404 })
      }

      await taskFound.destroy()

      res.status(200).json({ message: 'task soft deleted successfully' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async restore (req, res) {
    const { idUser, idList, idTask } = req.params

    try {
      const userFound = await userExists(idUser)

      const [listFound] = await userFound.getLists({
        where: { id_list: idList }
      })

      if (!listFound) {
        throw new ResponseError({ message: 'List not found', status: 404 })
      }

      const [taskFound] = await listFound.getTasks({
        where: { id_task: idTask },
        paranoid: false
      })

      if (!taskFound) {
        throw new ResponseError({ message: 'Task not found', status: 404 })
      }

      await taskFound.restore()

      res.status(200).json({ message: 'task restored successfully' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }
}

module.exports = TaskController
