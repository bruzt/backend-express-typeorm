import { Joi, Segments, celebrate } from 'celebrate';

export default {

    store: celebrate({
        
        [Segments.PARAMS]: Joi.object().keys({
            userId: Joi.number().required()
        }),

        [Segments.BODY]: Joi.object().keys({
            street: Joi.string().required(),
            number: Joi.string().required(),
            neighborhood: Joi.string().required(),
            city: Joi.string().required(),
            uf: Joi.string().required(),
            zipcode: Joi.string().required(),
        }),
    }, {
        abortEarly: false
    }),
}