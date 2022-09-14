const { Movie } = require('../models/movieModels');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

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
    next(err);
  }
  next();

  return null;
};
