const Router = require ('express')
const router = new Router()
const userRouter = require ('./userRouter')
// Всё до этой строчки - подгрузка модулей и файлов JS

router.use('/user', userRouter);
// индексация ранее разработаных роутеров в один для дальнейшего удобства в работе (пока что роутер один, но это из-за неразработанных остальных моделей БД (это нужно ещё понять, обсудить, протестить))

module.exports = router