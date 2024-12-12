import Joi from 'joi';
import { Trip } from '../types';

const createTripSchema = Joi.object({
    name: Joi.string().required(),
    securityCode: Joi.string().required(),
});

export const validateCreateTrip = (data: Trip) => createTripSchema.validate(data);