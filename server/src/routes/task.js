const { Router } = require('express')
const TaskController = require('../controllers/task')

const router = Router()

router.post('/create', TaskController.create)

router.get('/all', TaskController.getAll)
router.get('/:idTask', TaskController.getById)

router.put('/update/:idTask', TaskController.update)
router.put('/delete/:idTask', TaskController.softDelete)
router.put('/restore/:idTask', TaskController.restore)
// router.put('/change-list/:idTask', TaskController.changeList)

module.exports = router
