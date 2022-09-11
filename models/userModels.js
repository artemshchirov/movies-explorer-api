const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
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
    minlength: 2,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
  next
) {
  return this.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError('401 Invalid Email or Password 1');
    })
    .then((user) =>
      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('401 Invalid Email or Password 2');
          }

          return user;
        })
        .catch(next)
    );
};

exports.User = mongoose.model('user', userSchema);
