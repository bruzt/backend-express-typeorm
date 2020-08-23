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

            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),

    }, {
        abortEarly: false
    }),

    update: celebrate({

        [Segments.BODY]: Joi.object().keys({

            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string(),
        }).min(1),

    }, {
        abortEarly: false
    }),
}
