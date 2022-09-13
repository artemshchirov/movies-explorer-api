const movieRouter = require('express').Router();
const {
  validateNewMovieData,
  validateObjId,
} = require('../middlewares/validations');
const {
  getCurrentUserMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movieControllers');

movieRouter.get('/', getCurrentUserMovies);
movieRouter.post('/', validateNewMovieData, createMovie);
movieRouter.delete('/:movieId', validateObjId, deleteMovieById);

module.exports = { movieRouter };
