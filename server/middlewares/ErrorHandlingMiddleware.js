const ApiError = require('../error/ApiError')
// Всё до этой строчки - подгрузка модулей и файлов JS
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};

module.exports = errorHandler// Функция для проверки на непредвидеенные ошибки (чтобы сервер работал стабильно, а при выходе из строя можно было понять что сломалось)