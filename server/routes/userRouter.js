const UserRouter = require ('express')
const router = new UserRouter()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const checkRole = require('../middlewares/checkRoleMiddleware') // middleware должен использоваться для проверки пользователя на роль, пока что реализовано частично
// Всё до этой строчки - подгрузка модулей и файлов JS

router.post('/registration', userController.registration)
router.post('/destroy', userController.delete)
router.post('/login',userController.login)
router.get('/',userController.seethemall)
router.get('/auth',authMiddleware,userController.check) // Всё выше - ссылки на нужные функции (собственно вот так выглядит роутинг API для дальнейшей работы с сервером)

module.exports = router // экспорт объекта UserRouter() для дальнейшей работы