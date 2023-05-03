const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regularLink } = require('../utils/constants');
const {
  createCard,
  getCards,
  deleteCard,
  addCardLike,
  remuveCardLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).pattern(regularLink),
  }).unknown(true),
}), createCard);

cardsRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), addCardLike);

cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), remuveCardLike);

module.exports = cardsRouter;
