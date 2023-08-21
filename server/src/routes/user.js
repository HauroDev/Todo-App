const { Router } = require('express')
const UserController = require('../controllers/user.js')

const router = Router()

router.get('/all', UserController.getAll)
router.get('/:idUser', UserController.getById)

router.put('/update/:idUser', UserController.update)
router.put('/delete/:idUser', UserController.softDelete)
router.put('/restore/:idUser', UserController.restore)

module.exports = router
