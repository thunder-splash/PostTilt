require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require ('./routes/index')
const errorHandler = require ('./middlewares/ErrorHandlingMiddleware')
const path = require('path')
// Всё до этой строчки - подгрузка модулей и файлов JS

const PORT = process.env.PORT || 5000 // в .env - конфиг номера порта для быстрой замены, либо используется 5000 порт

const app = express() //создаём объект app при помощи фреймворка express.js
app.use(cors()) // Cross-Origin Resource Sharing (CORS) — механизм, использующий дополнительные HTTP-заголовки, чтобы дать возможность агенту пользователя получать разрешения на доступ к выбранным ресурсам с сервера на источнике (домене)
app.use(express.json()) // Функция express.json() — это встроенная промежуточная функция в Express. Он анализирует входящие запросы с полезными данными JSON и основан на body-parser
app.use(express.static(path.resolve(__dirname, 'static'))) // Тоже функция фреймворка express, но пока нигде не используется, нужна для подгрузки статики (картинок) на сервер
app.use(fileUpload({})) // Тоже нереализованная штука, задел на будущее
app.use('/api', router) // указатель на роутер


app.use(errorHandler) // Обработка ошибок, последний Middleware

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync().then(result=>{
            console.log(result);
        })
            .catch(err=> console.log(err));
        app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()