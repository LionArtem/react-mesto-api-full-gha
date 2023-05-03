const Card = require('../models/card');

const IncorrectErr = require('../errors/incorrect-err');
const NotFoundError = require('../errors/not-found-err');
const NoAccessErr = require('../errors/no-access-err');

const createCard = (req, res, next) => {
  const id = req.user._id;
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: id,
  })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectErr('Не корректные данные');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find().populate(['owner', 'likes'])
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  const idUser = req.user._id;
  Card.findById(id)
    .then((cardFind) => {
      if (!cardFind) {
        const err = new NotFoundError('карточка с таким id не найдена');
        next(err);
        return;
      }
      const idOwner = cardFind.owner.toString();
      if (idOwner === idUser) {
        cardFind.deleteOne()
          .then((card) => {
            res.send(card);
          }).catch((err) => {
            next(err);
          });
      } else {
        const err = new NoAccessErr('нельзя удалить чужую карточку');
        next(err);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new NotFoundError('Не корректные данные');
        next(error);
      } else {
        next(err);
      }
    });
};

const addCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const id = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).populate(['owner'])
    .then((card) => {
      try {
        if (card) {
          res.send(card);
          return;
        }
        throw new NotFoundError('карточка с таким id не найдена');
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new IncorrectErr('не корректные данные');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const remuveCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const id = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: id } }, // убрать _id из массива
    { new: true },
  ).populate(['owner'])
    .then((card) => {
      try {
        if (card) {
          res.send(card);
          return;
        }
        throw new NotFoundError('карточка с таким id не найдена');
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new IncorrectErr('Карточки с такий id не найденo');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  addCardLike,
  remuveCardLike,
};
