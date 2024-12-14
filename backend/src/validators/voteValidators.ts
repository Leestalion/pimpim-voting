import Joi from 'joi';

const createVoteSchema = Joi.object({
    day: Joi.string().required(),
    tripId: Joi.string().required(),
    userId: Joi.string().required(),
});

export const validateCreateVote = (data: typeof createVoteSchema) => createVoteSchema.validate(data);