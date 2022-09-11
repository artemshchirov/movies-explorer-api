const { celebrate, Joi } = require('celebrate');
const routes = require('express').Router();
const auth = require('../middlewares/auth');
const { userRoutes } = require('./userRoutes');
const { movieRoutes } = require('./movieRoutes');
const { login, createUser } = require('../controllers/userControllers');
const NotFoundError = require('../errors/NotFoundError');

routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().trim(true).email().required(),
      password: Joi.string().trim(true).min(2).required(),
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
      password: Joi.string().trim(true).min(2).required(),
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