const UserRouter = require ('express')
const router = new UserRouter()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const checkRole = require('../middlewares/checkRoleMiddleware')
// Всё до этой строчки - подгрузка модулей и файлов JS

router.post('/registration', userController.registration)
router.post('/login',userController.login)
router.get('/',checkRole('ADMIN'), userController.getAll)
router.get('/:id',checkRole('ADMIN'), userController.getOne)
router.get('/auth',authMiddleware,userController.check)
router.delete('/delete/:id',checkRole('ADMIN'), userController.delete)
router.put('/update/:id', checkRole('ADMIN'), userController.update)
// Всё выше - ссылки на нужные функции (собственно вот так выглядит роутинг API для дальнейшей работы с сервером)

module.exports = router // экспорт объекта UserRouter() для дальнейшей работы