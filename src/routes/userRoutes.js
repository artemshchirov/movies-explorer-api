const { celebrate, Joi } = require('celebrate');
const userRoutes = require('express').Router();

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/userControllers');

userRoutes.get('/me', getCurrentUser);

userRoutes.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().trim(true).email().required(),
      name: Joi.string().trim(true).min(2).max(30).required(),
    }),
  }),
  updateProfile
);

module.exports = { userRoutes };
