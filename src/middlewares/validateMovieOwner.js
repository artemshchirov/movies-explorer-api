const { Movie } = require('../models/movieModels');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

// eslint-disable-next-line consistent-return
exports.validateMovieOwner = async (req, res, next) => {
  const { id } = req.user;
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId).orFail(() => {
      throw new NotFoundError('404 Movie Not Found');
    });
    if (id !== movie.owner.toString()) {
      throw new ForbiddenError('403 Authorized But Forbidden');
    }
  } catch (err) {
    return next(err);
  }
  next();
};
