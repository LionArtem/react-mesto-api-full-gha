const sigRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regularAvatar } = require('../utils/constants');

const {
  createUsers,
  login,
} = require('../controllers/users');

sigRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regularAvatar),
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
}), createUsers);

sigRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = sigRouter;
