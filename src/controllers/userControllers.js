const bcrypt = require('bcrypt');
const { User } = require('../models/userModels');
const { jwtSign } = require('../utils/jwtSign');
const { OK, CREATED, SALT_ROUND } = require('../utils/constants');

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
      return next(new ConflictError('409: Conflict: Not Unique Email'));
    }
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('400: Invalid User Data'));
    }
    next(err);
  }
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
