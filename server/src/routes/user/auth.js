const { Router } = require('express')
const UserController = require('../../controllers/user')

const router = Router()

router.post('/sign-up', UserController.register)
router.get('/sign-in', UserController.login)
router.get('/sign-out', UserController.logout)

module.exports = router
