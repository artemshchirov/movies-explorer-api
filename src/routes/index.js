const routes = require('express').Router();
const { userRouter } = require('./userRouter');
const { movieRouter } = require('./movieRouter');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/userControllers');
const {
  validateUserBody,
  validateAuthentication,
} = require('../middlewares/validations');
const NotFoundError = require('../errors/NotFoundError');

routes.post('/signup', validateUserBody, createUser);
routes.post('/signin', validateAuthentication, login);
routes.use(auth);
routes.use('/users', userRouter);
routes.use('/movies', movieRouter);

routes.use('/', (req, res, next) =>
  next(new NotFoundError('404 Not Found Error'))
);

module.exports = { routes };
