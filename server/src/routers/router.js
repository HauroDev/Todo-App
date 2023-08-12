const { Router } = require('express')

const usersRouter = require('./user/user')
const listsRouter = require('./user/list')

const routes = Router()

routes.use('/user', usersRouter)
routes.use('/list', listsRouter)

module.exports = routes
