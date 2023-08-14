const { Router } = require('express')
const LC = require('../controllers/list')

const router = Router()

router.get('/:idUser/all', LC.getAll)
router.post('/:idUser/create', LC.create)

router.put('/:idUser/:idList/delete', LC.softDelete)
router.put('/:idUser/:idList/restore', LC.restore)
router.patch('/:idUser/:idList/update', LC.update)

router.get('/:idUser/:idList', LC.getById)

module.exports = router
