const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

exports.jwtVerify = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return false;
  }
};
