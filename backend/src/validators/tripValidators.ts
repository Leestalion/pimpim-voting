import Joi from 'joi';
import { Trip } from '../types';

const createTripSchema = Joi.object({
    name: Joi.string().required(),
    securityCode: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
});

const editTripSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    securityCode: Joi.string().required(),
});

export const validateCreateTrip = (data: Trip) => createTripSchema.validate(data);

export const validateEditTrip = (data: Trip) => editTripSchema.validate(data);