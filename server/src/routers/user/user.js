const { Router } = require('express')
const UserController = require('../../controllers/user.js')

const router = Router()

router.get('/all', UserController.getAll)

router.post('/sign-up', UserController.register)

router.get('/sign-in', UserController.login)

module.exports = router
