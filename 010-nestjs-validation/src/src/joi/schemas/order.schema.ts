import * as Joi from 'joi';

export const orderSchema = Joi.object().keys({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  age: Joi.number().min(18).required(),
  address: Joi.string().min(2).required(),
});
