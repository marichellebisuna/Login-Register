const Joi = require('@hapi/joi');

const authSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

module.exports = { authSchema };
