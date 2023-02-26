const ApiError = require('../error/ApiError')
// Всё до этой строчки - подгрузка модулей и файлов JS

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return  res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непредвиденная ошибка!"})
} // Функция для проверки на непредвидеенные ошибки (чтобы сервер работал стабильно, а при выходе из строя можно было понять что сломалось)