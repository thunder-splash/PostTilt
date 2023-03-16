const ApiError = require('../error/ApiError')
const { Brand } = require ('../models/models')

class BrandController {
    async create (req, res, next) {
        try {
            const { name } = req.body
            const brand = await Brand.create({ name })
            return res.json(brand)
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    }

    async getAll (req, res, next) {
        try {
            const brand = await Brand.findAll()
            return res.json(brand)
        } catch (e) {
            new next (ApiError.internal(e.message))
        }
    }

    async getOne (req, res, next) {
        try {
            const brand = await Brand.findAll()
            return res.json(brand)
        } catch (e) {
            new next (ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const updatedBrand = await Brand.update({name}, { where: { id } });
            if (updatedBrand[0] === 0) {
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
            const brand = await Brand.destroy({where: {id}})
            if (brand[0] === 0) {
                throw new next(ApiError.badRequest('Пользователь с такой почтой не найден'))
            }
            return res.json({message: 'Пользователь удалён успешно'})
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    }
}

module.exports = new BrandController()