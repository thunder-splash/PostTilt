const ProductRouter = require ('express')
const router = new ProductRouter()
const typeController = require('../controllers/productController')
const checkRole = require('../middlewares/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), typeController.create)
router.get('/',checkRole('ADMIN'), typeController.getAll)
router.get('/:id',checkRole('ADMIN'), typeController.getOne)
router.delete('/delete/:id',checkRole('ADMIN'), typeController.delete)
router.put('/update/:id', checkRole('ADMIN'), typeController.update)

module.exports = router