const { Router } = require('express')
const UserController = require('../controllers/user.js')

const router = Router()

router.get('/all', UserController.getAll)
router.get('/sign-in', UserController.login)
router.post('/sign-up', UserController.register)

router.get('/:idUser', UserController.getById)
router.patch('/:idUser/update', UserController.update)

module.exports = router
