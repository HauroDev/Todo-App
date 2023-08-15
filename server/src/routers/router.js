const { Router } = require('express')

const usersRouter = require('./user')
const listsRouter = require('./list')
const tasksRouter = require('./task')

const routes = Router()

routes.use('/user', usersRouter)
routes.use('/list', listsRouter)
routes.use('/task', tasksRouter)

module.exports = routes
