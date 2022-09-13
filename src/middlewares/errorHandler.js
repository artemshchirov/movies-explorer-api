const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR
        ? '500 Internal Server Error'
        : message,
  });
};

module.exports = { errorHandler };
