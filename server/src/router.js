const { Router } = require('express')

const authRouter = require('./routes/auth')
const usersRouter = require('./routes/user')
const listsRouter = require('./routes/list')
const tasksRouter = require('./routes/task')
const groupsRouter = require('./routes/group')
const { validateToken } = require('./middleware/auth')

const routes = Router()

routes.use('/', authRouter)
routes.use(validateToken)

routes.use('/user', usersRouter)
routes.use('/list', listsRouter)
routes.use('/task', tasksRouter)
routes.use('/group', groupsRouter)

module.exports = routes
