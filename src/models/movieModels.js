const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: [true, 'The country field must be filled'],
  },
  director: {
    type: String,
    required: [true, 'The director field must be filled'],
  },
  duration: {
    type: Number,
    required: [true, 'The duration field must be filled'],
  },
  year: {
    type: String,
    required: [true, 'The year field must be filled'],
  },
  description: {
    type: String,
    required: [true, 'The description field must be filled'],
  },
  image: {
    type: String,
    required: [true, 'The image field must be filled'],
    validate: {
      validator(text) {
        return validator.isURL(text);
      },
      message: 'Invalid image URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'The trailerLink field must be filled'],
    validate: {
      validator(text) {
        return validator.isURL(text);
      },
      message: 'Invalid trailerLink URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'The thumbnail field must be filled'],
    validate: {
      validator(text) {
        return validator.isURL(text);
      },
      message: 'Invalid thumbnail URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'The owner field must be filled'],
    ref: 'user',
  },
  movieId: {
    //TODO: выяснить необходимый type
    type: String,
    required: [true, 'The movieId field must be filled'],
  },
  nameRU: {
    type: String,
    required: [true, 'The nameRU field must be filled'],
  },
  nameEN: {
    type: String,
    required: [true, 'The nameEN field must be filled'],
  },
});