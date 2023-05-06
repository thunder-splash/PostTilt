const sequelize = require('../db')
const {INTEGER, STRING, BOOLEAN} = require('sequelize')
// Всё до этой строчки - подгрузка модулей и файлов JS

const User = sequelize.define ('user', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: STRING, defaultValue: "Иванов Иван Иванович"},
    email: {type: STRING, unique: true, allowNull: false},
    password: {type: STRING, allowNull: false},
    role: {type: STRING, defaultValue: "USER"},
    activity: {type: BOOLEAN, defaultValue: true},
    sex: {type: BOOLEAN, allowNull: false},
}) // Описание первого объекта (собственно - модели БД (слишком долго объяснять и мне лень) Вкратце - заготовки для ORM, чтобы она просто пришла, сделала нужные запросы на создание с нужными параметрами и БД уже была готова на запись)

const Basket = sequelize.define ('basket', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true}
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true}
})

const Product = sequelize.define ('product', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: STRING, unique: true, allowNull: false},
    price: {type: INTEGER, allowNull:false},
    avg_rating: {type: INTEGER, defaultValue: 0},
    rating: {type: INTEGER, defaultValue: 0},
    img: {type: STRING, allowNull: false}
})

const Type = sequelize.define('type', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: STRING, unique: true, allowNull: false},
})

const PostType = sequelize.define('post_type', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    rate: {type: INTEGER, allowNull: false}
})

const ProductInfo = sequelize.define('product_info', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: STRING, allowNull: false},
    description: {type: STRING, allowNull: false}
})

//const TypeBrand = sequelize.define('type_brand', {
//    id: {type: INTEGER, autoIncrement: true, primaryKey: true}
//})

const PostTypeBrand = sequelize.define('post_type_brand', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true}
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Type.hasMany(Product)
Product.belongsTo(Type)

Type.hasMany(PostType)
PostType.belongsTo(Type)

PostType.hasMany(Product)
Product.belongsTo(PostType)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)

//Type.belongsToMany(Brand, {through: TypeBrand})
//Brand.belongsToMany(Type, {through: TypeBrand})

PostType.belongsToMany(Brand, {through: PostTypeBrand})
Brand.belongsToMany(PostType, {through: PostTypeBrand})

module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    Type,
    Brand,
    Rating,
    ProductInfo,
//    TypeBrand,
    PostType,
    PostTypeBrand
} // экспорт объектов для дальнейшей работы