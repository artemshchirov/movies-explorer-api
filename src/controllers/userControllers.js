const bcrypt = require('bcrypt');
const { User } = require('../models/userModels');
const { jwtSign } = require('../utils/jwtSign');
const { OK, CREATED, SALT_ROUND } = require('../utils/constants');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

exports.createUser = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, SALT_ROUND);
    const newUser = await User.create({
      email,
      password: hashPassword,
      name,
    });
    res.status(CREATED).send({
      newUser: {
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError('409 Not Unique Email'));
    }
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('400 Invalid User Data'));
    }
    next(err);
  }
  return null;
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwtSign(user._id);
      res.status(OK).send({ token });
    })
    .catch(next);
};

exports.getCurrentUser = (req, res, next) => {
  const { id } = req.user;

  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('404 User Not Found');
    })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch(next);
};

exports.updateProfile = async (req, res, next) => {
  const { email, name } = req.body;
  const { id } = req.user;
  try {
    const profile = await User.findByIdAndUpdate(
      id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(OK).send({ profile });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('400 Invalid Card Data'));
    }
    next(err);
  }
  return null;
};
