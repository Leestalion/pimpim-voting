import Joi from 'joi';
import { Trip } from '../types';

const createTripSchema = Joi.object({
    name: Joi.string().required(),
    securityCode: Joi.string().required(),
    startDate: Joi.string()
    .isoDate()
    .required(),
    endDate: Joi.string()
    .isoDate()
    .required()
    .custom((value, helpers) => {
      const { startDate } = helpers.state.ancestors[0]; // Access `startDate` from the object being validated
      const start = new Date(startDate);
      const end = new Date(value);

      if (start >= end) {
        return helpers.error('date.startBeforeEnd'); // Custom error key
      }
      const oneDayInMs = 24 * 60 * 60 * 1000;
      if (end.getTime() - start.getTime() < oneDayInMs) {
        return helpers.error('date.minimumOneDayDifference');
      }

      return value; // Validation passes
    }),
}).messages({
  'date.startBeforeEnd': 'La date de début doit être avant la date de fin.',
  'date.minimumOneDayDifference': 'Il doit y avoir au moins un jour entre les dates de début et de fin.',
});

const editTripSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    securityCode: Joi.string().required(),
    startDate: Joi.string()
    .isoDate(),
    endDate: Joi.string()
    .isoDate()
});

export const validateCreateTrip = (data: Trip) => createTripSchema.validate(data);

export const validateEditTrip = (data: Trip) => editTripSchema.validate(data);