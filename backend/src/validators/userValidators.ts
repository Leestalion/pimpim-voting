import Joi from 'joi';

const createUserSchema = Joi.object({
    username: Joi.string().required(),
});

export const validateCreateUser = (data: typeof createUserSchema) => createUserSchema.validate(data);