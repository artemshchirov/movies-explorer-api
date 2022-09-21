const { STATUSE, MESSAGE } = require('../utils/constants');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode = STATUSE.INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === STATUSE.INTERNAL_SERVER_ERROR
        ? MESSAGE.INTERNAL_SERVER_ERROR
        : message,
  });
};

module.exports = { errorHandler };
