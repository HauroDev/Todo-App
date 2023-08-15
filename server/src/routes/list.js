const { Router } = require('express')
const ListController = require('../controllers/list')

const router = Router()

router.get('/:idUser/all', ListController.getAll)
router.post('/:idUser/create', ListController.create)

router.get('/:idUser/:idList', ListController.getById)

router.put('/:idUser/:idList/update', ListController.update)
router.put('/:idUser/:idList/delete', ListController.softDelete)
router.put('/:idUser/:idList/restore', ListController.restore)

module.exports = router
