const { Router } = require('express')

const authRouter = require('./routes/user/auth')
const usersRouter = require('./routes/user/index')
const tasksRouter = require('./routes/task/index')

const { validateToken } = require('./middleware/auth')

const routes = Router()

routes.use('/', authRouter)

routes.use(validateToken)

routes.use('/user', usersRouter)
routes.use('/task', tasksRouter)

module.exports = routes
