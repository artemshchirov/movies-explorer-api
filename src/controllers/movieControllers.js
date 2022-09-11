const { Movie } = require('../models/movieModels');
const { OK, CREATED } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');

// TODO: getCurrentUserMovies
exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(OK).send(movies);
  } catch (err) {
    next(err);
  }
};

exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  try {
    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    });
    res.status(CREATED).send(newMovie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('400 Invalid Movie Data'));
    } else {
      next(err);
    }
  }
};

exports.deleteMovieById = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findByIdAndRemove(movieId).orFail(() => {
      throw new BadRequestError('400 Movie Not Found');
    });
    res.status(OK).send(movie);
  } catch (err) {
    next(err);
  }
};
