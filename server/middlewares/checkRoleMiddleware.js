const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError")
// Всё до этой строчки - подгрузка модулей и файлов JS

module.exports = function (role){
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer klasdlkjalskdjaskld
            if (!token) {
                throw new next(ApiError.unauthorized('Пользователь не авторизован!'))
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.role !== role){
                throw new next(ApiError.forbidden('Нет прав доступа!'))
            }
            req.user = decoded
            next()
        } catch (e) {
            new next(ApiError.unauthorized('Пользователь не авторизован!'))
        }
    }
}