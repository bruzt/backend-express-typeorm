import { celebrate, Joi, Segments } from 'celebrate';

export default {

    show: celebrate({

        [Segments.PARAMS]: Joi.object().keys({

            id: Joi.number().required()
        }),

    }, {
        abortEarly: false
    }),

    store: celebrate({

        [Segments.BODY]: Joi.object().keys({

            title: Joi.string().required(),
            description: Joi.string().required(),
            status: Joi.string(),
        }),

    }, {
        abortEarly: false
    }),
}