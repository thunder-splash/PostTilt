const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User} = require('../models/models')
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
        try {
            const { email, password, role } = req.body
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
            if (!emailRegex.test(email) || !passwordRegex.test(password)) {
                return next(ApiError.badRequest('Некорректный формат почты или пароля!'));
            }
            const candidate = await User.findOne({ where: { email } })
            if (candidate) {
                throw new next(ApiError.badRequest('Пользователь с таким почтовым адесом уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, password: hashPassword, role})
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    } // API для регистрации, фактически это и всё ниже - логика сервера

    async login(req, res, next) {
        try{
            const {email, password} = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw new next(ApiError.internal('Пользователь с таким логином не найден!'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                throw new next(ApiError.internal('Указан неверный пароль!'))
            }
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    } // API для входа с проверкой на наличие такого пользователя в БД

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({token})
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
   } // Вспомогательная функция для проверки на жизнеспособность JWT

    async delete (req, res, next) {
        try {
            const { id } = req.params
            const user = await User.destroy({ where: { id } })
            if (user[0] === 0){
                throw new next(ApiError.badRequest('Пользователь с такой почтой не найден'))
            }
            return res.json({ message: 'Пользователь удалён успешно' })
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    } // API для удаления пользователя по почте (можно сделать по любому параметру (параметрам))

    async getAll (req, res, next) {
        try{
            const all = await User.findAll()
            return res.json(all)
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    } // API для получения всех данных о пользователях из БД на сервере в JSON клиента

    async getOne (req, res, next) {
        try{
            const { id } = req.params
            const ref = await User.findOne({ where: { id: { id }} })
            return res.json(ref)
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const updatedUser = await User.update({ name }, { where: { id } });
            if (updatedUser[0] === 0) {
                return new next(ApiError.notFound(`Пользователь с id = ${id} не найден`));
            }
            res.json('Параметры пользователя заменены успешно');
        } catch (e) {
            new next(ApiError.internal(e.message));
        }
    }
}

module.exports = new UserController()