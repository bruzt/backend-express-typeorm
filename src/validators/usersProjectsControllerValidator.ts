import { celebrate, Joi, Segments } from 'celebrate';

export default {

    store: celebrate({

        [Segments.PARAMS]: Joi.object().keys({

            userId: Joi.number().required(),
            projectId: Joi.number().required(),
           
        }),

    }, {
        abortEarly: false
    }),

}
