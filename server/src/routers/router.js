const { Router } = require('express')

const usersRouter = require('./user')
const listsRouter = require('./list')

const routes = Router()

routes.use('/user', usersRouter)
routes.use('/list', listsRouter)

module.exports = routes
