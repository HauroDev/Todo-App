const { Router } = require('express')
const GroupController = require('../controllers/group')

const router = Router()

router.post('/create', GroupController.create)

router.get('/all', GroupController.getAll)
router.get('/:idGroup', GroupController.getById)

router.put('/update/:idGroup', GroupController.update)
router.put('/restore/:idGroup', GroupController.restore)
router.put('/delete/:idGroup', GroupController.softDelete)

module.exports = router
