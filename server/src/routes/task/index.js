const { Router } = require('express')
const TaskController = require('../../controllers/task')
const deletingRoute = require('./delete')

const router = Router()

router.use('/delete', deletingRoute)

router.post('/create', TaskController.create)
router.get('/all', TaskController.getAll)

router.get('/:idTask', TaskController.getById)

router.put('/update/:idTask', TaskController.update)
router.put('/restore/:idTask', TaskController.restore)

module.exports = router
