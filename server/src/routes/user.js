const { Router } = require('express')
const UserController = require('../controllers/user.js')

const router = Router()

router.get('/all', UserController.getAll)
router.get('/sign-in', UserController.login)
router.post('/sign-up', UserController.register)

router.get('/:idUser', UserController.getById)
router.put('/:idUser/update', UserController.update)

router.put('/:idUser/delete', UserController.softDelete)
router.put('/:idUser/restore', UserController.restore)

module.exports = router
