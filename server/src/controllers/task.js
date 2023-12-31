const { Op } = require('sequelize')
const { List, Task } = require('../db')
const { ResponseError } = require('../utils/errors')
const {
  validationTask,
  validationPartialTask
} = require('../utils/validations/task')

class TaskController {
  static async getAll(req, res) {
    const { idUser, deleted, paranoid } = req.query

    const Options = {
      where: {},
      attributes: {
        exclude: ['description', 'steps']
      },
      order: [['createdAt', 'ASC']]
    }
    if (idUser) Options.where.id_user = idUser
    if (deleted) {
      Options.where.deletedAt = { [Op.not]: null }
      Options.paranoid = !deleted
    }
    if (paranoid) Options.paranoid = false

    const tasks = await Task.findAll(Options)

    res.status(200).json(tasks)
  }

  static async getById(req, res) {
    const { idTask } = req.params
    try {
      const taskFound = await Task.findByPk(idTask)

      if (!taskFound) {
        throw new ResponseError({ message: 'Task not found', status: 404 })
      }

      res.status(200).json(taskFound)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async create(req, res) {
    const taskInfo = validationTask(req.body)

    try {
      if (!taskInfo.success) {
        const message = taskInfo.error.errors
          .map((atb) => `${atb.path} ${atb.message}`)
          .join('\n')

        throw new ResponseError({
          message,
          status: 400
        })
      }

      const newTask = await Task.create(taskInfo.data)

      res.status(200).json(newTask)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async update(req, res) {
    const { idTask } = req.params
    const taskInfo = validationPartialTask(req.body)

    try {
      const taskFound = await Task.findByPk(idTask, { paranoid: false })

      if (!taskFound) {
        throw new ResponseError({ message: 'Task not found', status: 404 })
      }

      const taskUpdated = await taskFound.update(taskInfo.data, {
        paranoid: false
      })

      res.status(200).json(taskUpdated)
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async softDelete(req, res) {
    const { idTask } = req.params

    try {
      const taskFound = await Task.findByPk(idTask)

      if (!taskFound) {
        throw new ResponseError({ message: 'Task not found', status: 404 })
      }

      await taskFound.destroy()

      res.status(200).json({ message: 'task soft deleted successfully' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }
  
  static async hardDelete(req, res) {
    const { idTask } = req.params

    try {
      const taskFound = await Task.findByPk(idTask, { paranoid: false })

      if (!taskFound) {
        throw new ResponseError({ message: 'Task not found', status: 404 })
      }

      await taskFound.destroy({ force: true })

      res.status(200).json({ message: 'task hard deleted successfully' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async restore(req, res) {
    const { idTask } = req.params

    try {
      const taskFound = await Task.findByPk(idTask, { paranoid: false })

      if (!taskFound) {
        throw new ResponseError({ message: 'Task not found', status: 404 })
      }

      await taskFound.restore()

      res.status(200).json({ message: 'task restored successfully' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  static async changeList(req, res) {
    const { idTask } = req.params

    const { idOrigin, idDestination } = req.query

    try {
      const originListFound = await List.findByPk(idOrigin)

      if (!originListFound) {
        throw new ResponseError({ message: ' lists not found', status: 404 })
      }

      const destinationListFound = await List.findByPk(idDestination)

      if (!destinationListFound) {
        throw new ResponseError({ message: ' lists not found', status: 404 })
      }

      const [taskFound] = await originListFound.getTasks({
        where: { id_task: idTask },
        paranoid: false
      })

      if (!taskFound) {
        throw new ResponseError({ message: 'task not found', status: 404 })
      }

      await originListFound.removeTask(taskFound)
      await destinationListFound.addTask(taskFound)

      res.status(200).json({ message: 'task was changed list successfully' })
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }
}

module.exports = TaskController
