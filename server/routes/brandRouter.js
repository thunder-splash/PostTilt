const BrandRouter = require ('express')
const router = new BrandRouter()
const brandController = require('../controllers/brandController')
const checkRole = require('../middlewares/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), brandController.create)
router.get('/',checkRole('ADMIN'), brandController.getAll)
router.get('/:id',checkRole('ADMIN'), brandController.getOne)
router.delete('/delete/:id',checkRole('ADMIN'), brandController.delete)
router.put('/update/:id', checkRole('ADMIN'), brandController.update)

module.exports = router