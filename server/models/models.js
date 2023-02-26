const sequelize = require('../db')
const {INTEGER, STRING} = require('sequelize')
// Всё до этой строчки - подгрузка модулей и файлов JS

const User = sequelize.define ('user', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: STRING, defaultValue: "Иванов Иван Иванович"},
    email: {type: STRING, unique: true},
    password: {type: STRING, allowNull: false},
    role: {type: STRING, defaultValue: "USER"},
}) // Описание первого объекта (собственно - модели БД (слишком долго объяснять и мне лень) Вкратце - заготовки для ORM, чтобы она просто пришла, сделала нужные запросы на создание с нужными параметрами и БД уже была готова на запись)

module.exports = {
 User
} // экспорт объекта для дальнейшей работы