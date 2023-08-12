const { Router } = require('express')
const ListController = require('../../controllers/list')

const router = Router()

router.get('/:idUser/all', ListController.getAll)
router.post('/:idUser/create', ListController.create)

router.get('/:idUser/:idList', ListController.getById)
module.exports = router
