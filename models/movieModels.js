const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(text) {
        return validator.isURL(text);
      },
      message: 'Invalid Image URL',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(text) {
        return validator.isURL(text);
      },
      message: 'Invalid Trailer URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(text) {
        return validator.isURL(text);
      },
      message: 'Invalid Thumbnail URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: { //TODO: выяснить необходимый type
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
