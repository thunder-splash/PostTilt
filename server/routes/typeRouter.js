const TypeRouter = require ('express')
const router = new TypeRouter()
const typeController = require('../controllers/typeController')
const checkRole = require('../middlewares/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), typeController.create)
router.get('/',checkRole('ADMIN'), typeController.getAll)
router.get('/:id',checkRole('ADMIN'), typeController.getOne)
router.delete('/delete/:id',checkRole('ADMIN'), typeController.delete)
router.put('/update/:id', checkRole('ADMIN'), typeController.update)

module.exports = router