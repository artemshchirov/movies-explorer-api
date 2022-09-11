const routes = require('express').Router();
const auth = require('../src/middlewares/auth');
const { userRoutes } = require('./userRoutes');
const { movieRoutes } = require('./movieRoutes');
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('./userControllers');
const NotFoundError = require('../errors/NotFoundError');

routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().trim(true).email().required(),
      password: Joi.string().trim(true).required(),
      name: Joi.string().trim(true).min(2).max(30).required(),
    }),
  }),
  createUser
);

routes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().trim(true).email().required(),
      password: Joi.string().trim(true).required(),
    }),
  }),
  login
);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);

routes.use('/', (req, res, next) => {
  const err = new NotFoundError('404 Not Found Error');
  next(err);
});

module.exports = { routes };
