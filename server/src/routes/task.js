const { Router } = require('express')
const TaskController = require('../controllers/task')

const router = Router()

router.post('/:idUser/:idList/create', TaskController.create)

router.get('/:idUser/:idList/all', TaskController.getAll)
router.get('/:idUser/:idList/:idTask', TaskController.getById)

router.put('/:idUser/:idList/:idTask/update', TaskController.update)
router.put('/:idUser/:idList/:idTask/delete', TaskController.softDelete)
router.put('/:idUser/:idList/:idTask/restore', TaskController.restore)

module.exports = router
