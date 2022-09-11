const movieRouter = require('express').Router();
const {
  validateNewMovieData,
  validateObjId,
} = require('../middlewares/validations');
const {
  getMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movieControllers');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateNewMovieData, createMovie);
movieRouter.delete('/:movieId', validateObjId, deleteMovieById);

module.exports = { movieRouter };
