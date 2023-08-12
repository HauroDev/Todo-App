const { Router } = require('express')
const usersRouter = require('./user')

const routes = Router()

routes.use('/users', usersRouter)

module.exports = routes
