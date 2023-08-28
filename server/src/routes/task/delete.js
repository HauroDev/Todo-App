const { Router } = require('express')
const TaskController = require('../../controllers/task')

const router = Router()

router.put('/hard/:idTask', TaskController.hardDelete)
router.put('/:idTask', TaskController.softDelete)

module.exports = router
