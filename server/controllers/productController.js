const ApiError = require('../error/ApiError')
const { Product} = require ('../models/models')

class ProductController {
    async create (req, res, next) {
        try {
            const { name } = req.body
            const product = await Product.create({ name })
            return res.json(product)
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    }

    async getAll (req, res, next) {
        try {
            const product = await Product.findAll()
            return res.json(product)
        } catch (e) {
            new next (ApiError.internal(e.message))
        }
    }

    async getOne (req, res, next) {
        try {
            const product = await Product.findAll()
            return res.json(product)
        } catch (e) {
            new next (ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const updatedProduct = await Product.update({name}, { where: { id } });
            if (updatedProduct[0] === 0) {
                return new next(ApiError.notFound(`Пользователь с id = ${id} не найден`));
            }
            res.json('Параметры пользователя заменены успешно');
        } catch (e) {
            new next(ApiError.internal(e.message));
        }
    }

    async delete (req, res, next) {
        try {
            const { id } = req.params
            const product = await Product.destroy({where: {id}})
            if (product[0] === 0) {
                throw new next(ApiError.badRequest('Пользователь с такой почтой не найден'))
            }
            return res.json({message: 'Пользователь удалён успешно'})
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ProductController()