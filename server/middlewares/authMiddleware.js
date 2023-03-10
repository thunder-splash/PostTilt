const jwt = require('jsonwebtoken')
// Всё до этой строчки - подгрузка модулей и файлов JS

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer klasdlkjalskdjaskld
        if (!token) {
            return res.status(401).json({message: 'Пользователь не авторизован!'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.employer = decoded
        next()
    } catch (e) {
        res.status(401).json({message: 'Пользователь не авторизован!'})
    }
} // Проверка пользователя на жизнеспособность его jwt-tokena, фактически - проверка подписи