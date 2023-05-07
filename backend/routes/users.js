const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regularAvatar } = require('../utils/constants');

const {
  getUsers,
  getUsersMe,
  patchUsersInfo,
  patchUsersAvatar,
  getUsersId,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUsersMe);

usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getUsersId);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), patchUsersInfo);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regularAvatar),
  }),
}), patchUsersAvatar);

module.exports = usersRouter;
