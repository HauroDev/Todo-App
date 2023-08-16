const { Router } = require('express')
const ListController = require('../controllers/list')

const router = Router()

router.post('/create', ListController.create)

router.get('/all', ListController.getAll)
router.get('/:idList', ListController.getById)

router.put('/update/:idList', ListController.update)
router.put('/delete/:idList', ListController.softDelete)
router.put('/restore/:idList', ListController.restore)

// router.put('/change-group/:idList', ListController.changeGroup)

module.exports = router
