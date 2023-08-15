const { Router } = require('express')
const GroupController = require('../controllers/group')

const router = Router()

router.post('/:idUser/create', GroupController.create)

router.get('/:idUser/all', GroupController.getAll)
router.get('/:idUser/:idGroup', GroupController.getById)

router.put('/:idUser/:idGroup/update', GroupController.update)
router.put('/:idUser/:idGroup/restore', GroupController.restore)
router.put('/:idUser/:idGroup/delete', GroupController.softDelete)

module.exports = router
