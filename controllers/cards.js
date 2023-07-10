const Card = require('../models/card');
const { User } = require('../models/user');
const {
  ERROR_CODE_VALIDATION, ERROR_CODE_DEFAULT, ERROR_DEFAULT_MESSAGE, ERROR_CODE_NOT_FOUND,
} = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const likes = [];
  User.findById(req.user._id)
    .then((owner) => {
      Card.create({
        name, link, owner, likes,
      })
        .then((card) => res.send(card))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка с указанным ID не найдена.' });
      }
    })
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка с указанным ID не найдена.' });
      }
    })
    .catch((err) => next(err));
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка с указанным ID не найдена.' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        if (err.valueType === 'number') {
          res.status(ERROR_CODE_VALIDATION).send({ message: 'Карточка с указанным ID не найдена.' });
        } else {
          res.status(ERROR_CODE_VALIDATION).send({ message: 'Карточка с указанным ID не найдена.' });
        }
      } else {
        next(err);
      }
    });
};

const errorHandlerCards = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  } else {
    switch (err.name) {
      case 'CastError':
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Карточка с указанным ID не найдена.' });
        break;
      case 'SyntaxError':
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Синтаксическая ошибка в запросе.' });
        break;
      case 'ValidationError':
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Данные карточки не прошли валидацию.' });
        break;
      default:
        res.status(ERROR_CODE_DEFAULT).send(ERROR_DEFAULT_MESSAGE);
        break;
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  errorHandlerCards,
};
