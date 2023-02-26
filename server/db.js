const {Sequelize} = require ('sequelize')
const {process_params} = require("express/lib/router")

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
)
// Здесь все строчки - описание работы с бд, её диалекта, местонахождения, имени, пароля и порта. Вся инфа хранится опять же в конфигурационном файле, для большего удобства