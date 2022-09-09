const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 2,
    unique: true,
    validate: {
      validator(text) {
        return validator.isEmail(text);
      },
      message: 'Invalid Email Format',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Аноним',
  },
});

exports.User = mongoose.model('user', userSchema);
