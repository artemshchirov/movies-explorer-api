const { jwtVerify } = require('../utils/jwtVerify');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('401 Unauthorized 1'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwtVerify(token);
  } catch (err) {
    next(new UnauthorizedError('401 Unauthorized 2'));
  }

  req.user = payload;

  next();
};
