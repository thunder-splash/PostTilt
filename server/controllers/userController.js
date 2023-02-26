const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User, Preference} = require('../models/models')
const jwt = require('jsonwebtoken')
// Всё до этой строчки - подгрузка модулей и файлов JS

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
} // Функция для генерации jwt-tokena по заданным параметрам

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный пароль или почтовый адрес!'))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким почтовым адесом уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role,  password: hashPassword})
        const pref = await Preference.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    } // API для регистрации, фактически это и всё ниже - логика сервера

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь с таким логином не найден!'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль!'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    } // API для входа с проверкой на наличие такого пользователя в БД

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    } // Вспомогательная функция для проверки на жизнеспособность JWT

    async delete (req, res, next) {
        const ToBeRemoved = req.body.email
        const user = await User.destroy({where: {email: ToBeRemoved}})
        if (!user){
            return next(ApiError.badRequest('Пользователь с такой почтой не найден'))
        }
        return res.json({message: 'Пользователь удалён успешно'})
    } // API для удаления пользователя по почте (можно сделать по любому параметру (параметрам))

    async seethemall (req, res) {
        const isee = await User.findAll()
        return res.json(isee)
    } // API для получения всех данных из БД на сервере в JSON клиента
}

module.exports = new UserController()