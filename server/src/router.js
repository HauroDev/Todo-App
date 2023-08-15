const { Router } = require('express')

const usersRouter = require('./routes/user')
const listsRouter = require('./routes/list')
const tasksRouter = require('./routes/task')

const routes = Router()

routes.use('/user', usersRouter)
routes.use('/list', listsRouter)
routes.use('/task', tasksRouter)

module.exports = routes
