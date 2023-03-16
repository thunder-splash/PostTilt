const ApiError = require('../error/ApiError')
const { Type } = require ('../models/models')

class TypeController {
    async create (req, res, next) {
        try {
            const { name } = req.body
            const type = await Type.create({ name })
            return res.json(type)
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    }

    async getAll (req, res, next) {
        try {
            const type = await Type.findAll()
            return res.json(type)
        } catch (e) {
            new next (ApiError.internal(e.message))
        }
    }

    async getOne (req, res, next) {
        try {
            const type = await Type.findAll()
            return res.json(type)
        } catch (e) {
            new next (ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const updatedType = await Type.update({name}, { where: { id } });
            if (updatedType[0] === 0) {
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
            const type = await Type.destroy({where: {id}})
            if (type[0] === 0) {
                throw new next(ApiError.badRequest('Пользователь с такой почтой не найден'))
            }
            return res.json({message: 'Пользователь удалён успешно'})
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    }
}

module.exports = new TypeController()