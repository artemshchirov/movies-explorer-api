const { validateUserData } = require('../middlewares/validations');
const userRouter = require('express').Router();

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/userControllers');

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', validateUserData, updateProfile);

module.exports = { userRouter };
