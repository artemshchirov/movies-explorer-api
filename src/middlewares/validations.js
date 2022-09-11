const { Joi, celebrate } = require('celebrate');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().trim(true).email().messages({
      'any.required': 'The "email" field must be filled',
    }),
    password: Joi.string().required().trim(true).min(2).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'any.required': 'The "name" field must be filled',
    }),
    name: Joi.string().required().trim(true).min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'any.required': 'The "name" field must be filled',
    }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().trim(true).email().messages({
      'string.required': 'The "email" field must be filled',
    }),
    password: Joi.string().required().trim(true).min(2).messages({
      'string.min': 'The minimum length of the "password" field is 2',
      'any.required': 'The "password" field must be filled',
    }),
  }),
});

module.exports = {
  validateUserBody,
  validateAuthentication,
};
